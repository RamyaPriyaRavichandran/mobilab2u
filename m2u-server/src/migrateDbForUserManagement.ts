import { exit } from "process";
import "./database";
import gpPartnerModel from "./models/gp.partner.model";
import serviceProviderModel from "./models/service.provider.model";
import adminModel from "./models/admin.model";
import userModel from "./models/user.model";
import { models } from "./constants";
import customerModel from "./models/customer.model";
import labModel from "./models/lab.model";
import paymentModel from "./models/payment.model";

async function updateIdAndLoginPassowrd() {
  const users = await userModel.find({
    roles: {
      $ne: ["SUPER_ADMIN"],
    },
  });
  const userRoleOptions: any = {
    GP_PARTNER: serviceProviderModel,
    SERVICE_PROVIDER: serviceProviderModel,
    CUSTOMER: customerModel,
    LAB_USER: labModel,
  };
  console.log("Updating user id and login password ");
  if (users.length <= 0) {
    console.log("Users not found");
  } else {
    for (const user of users) {
      if (!user) {
        console.log("User not found");
      } else {
        const currentUserModel = userRoleOptions[user.roles[0]];
        if (!currentUserModel) {
          console.log("User role model not exist for this role");
        } else {
          let CurrentUser = await currentUserModel.findOne({
            email: user.email,
          });
          const deletebleUserId = CurrentUser._id;
          CurrentUser._id = user._id;
          CurrentUser.password = user.password;
          CurrentUser.city = user.city;
          CurrentUser.state = user.state;
          CurrentUser.country = "MALAYSIA";
          CurrentUser.postCode = `${user.postCode}`;
          CurrentUser.nricNumber = `${user.nricNumber}`;
          CurrentUser.idProof = "NRIC_NUMBER";

          await currentUserModel.insertMany([CurrentUser]);
          await currentUserModel.deleteMany({ _id: deletebleUserId });
        }
      }
    }
  }
}

async function SplitingSpAndGp() {
  console.log("Spiliting gp partner user to gp partner collection");
  const gpPartnerData = await serviceProviderModel.find({
    userRole: "GP_PARTNER",
  });
  if (gpPartnerData.length <= 0) {
    console.log("G p partner data not found");
  } else {
    await gpPartnerModel.insertMany(gpPartnerData);
    console.log("Gp partner data inserted");
    await serviceProviderModel.deleteMany({ userRole: "GP_PARTNER" });
    console.log("Gp partner data removed from service provider collection");
  }
}

async function addingAdminFromAdminCollection() {
  console.log("Adding admin user from admins collections");
  const adminUsers = await userModel.find({
    roles: {
      $in: ["SUPER_ADMIN"],
    },
  });
  const modifiedAdmin = adminUsers.map((adminUser) => ({
    _id: adminUser._id,
    name: adminUser.userName,
    password: adminUser.password,
    userRole: "SUPER_ADMIN",
    email: adminUser.email,
  }));
  await adminModel.insertMany(modifiedAdmin);
  console.log("Admin user inserted to admin collections");
  await await userModel.deleteMany({
    roles: {
      $in: ["SUPER_ADMIN"],
    },
  });
  console.log("Removing admin user from users collection");
}

async function updatingPaymentCollection() {
  console.log("Collecting all payments data");
  const payments = await paymentModel.find({});

  console.log("Find all payments collections");

  for (const payment of payments) {
    console.log("Find user from old user collections using payment user id");

    const user = await userModel.findById({ _id: payment.userId });

    if (user) {
      console.log(
        "If old user exist , find the current user role matching model"
      );

      const CurrentUserModel = models[user.roles[0]];

      console.log(
        "If matching model exist, Find current user data with old user email"
      );

      const currentUser = await CurrentUserModel.findOne({ email: user.email });

      if (currentUser) {
        console.log(
          "If User data exist , update current user id and role to payment collection"
        );

        const updatedPayment = await paymentModel.findOneAndUpdate(
          { _id: payment._id },
          { userRole: user.roles[0], userId: currentUser._id },
          { new: true }
        );

        console.log("updatedPayment", updatedPayment);
      } else {
        console.log("Old user not exist");
      }
    } else {
      console.log(
        "if old user not exist then that was new user, find which role user"
      );

      const customer = await customerModel.findById({ _id: payment.userId });
      const sp = await serviceProviderModel.findById({ _id: payment.userId });
      const gp = await gpPartnerModel.findById({ _id: payment.userId });

      const currentUser = customer?._id
        ? customer
        : sp?._id
          ? sp
          : gp?._id && gp;
      if (currentUser) {
        console.log("Find the current user", currentUser);
        const updatedPayment = await paymentModel.findOneAndUpdate(
          { _id: payment._id },
          { userRole: currentUser.userRole, userId: currentUser._id },
          { new: true }
        );

        console.log("updatedPayment", updatedPayment);
      } else {
        console.log("User not found");
      }
    }
  }
}

async function migrateDbForMiltiUserManagement() {
  console.log("Db migration start");

  await updateIdAndLoginPassowrd();

  await SplitingSpAndGp();

  await addingAdminFromAdminCollection();

  await updatingPaymentCollection();
  console.log("Db migration finished");
  exit();
}

migrateDbForMiltiUserManagement();
