import { FastifyReply, FastifyRequest } from "fastify";
import { LabBody } from "../types/lab_body";
import labModel from "../models/lab.model";
import bcrypt from "bcrypt";
import errorMessage from "../constants/error-messages";
import { ACTIONS, ROLES, SUBJECTS } from "../lib/permissions";
import successMessage from "../constants/success-messages";
import { FRONTEND_URL } from "../plugins/env";
import { models } from "../constants";
import { concatString } from "mongo-aggregation-utils";

export const createLab = async (
  req: FastifyRequest<{ Body: LabBody }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Lab);

  const user = await labModel.findOne({ email: req.body.email });
  if (user) {
    return reply.conflict(errorMessage.EMAIL_ALREADY_EXISTING_USER);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const labData = {
    name: req.body.name,
    email: req.body.email,
    phone: Number(req.body.phone),
    address: req.body.address,
    city: req.body.city,
    postCode: req.body.postCode,
    state: req.body.state,
    organization: req.body.organization,
    userRole: ROLES.LAB_USER,
    password: hash,
  };
  const createdLab = await labModel.create(labData);

  const mailPayload = {
    to: req.body.email,
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      frontEndUrl: `${FRONTEND_URL}/user/login`,
    },
    subject:
      "Welcome to the Team! Your Mobilab2u Lab Account is Ready! - Mobilab2u",
    template: "create-lab",
  };
  await req.sendMail(mailPayload);

  return reply.send({
    message: successMessage.LAB_CREATE_SUCCESS,
    createdLab,
  });
};

export const updateLab = async (
  req: FastifyRequest<{ Body: LabBody; Params: { id: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.Lab);

  if (!req.params.id) {
    return reply.notFound(errorMessage.LAB_ID_NOT_FOUND);
  }

  const lab = await labModel.findById({ _id: req.params.id });
  if (!lab) {
    return reply.notFound(errorMessage.LAB_DETAIL_NOT_FOUND);
  }
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(req.body.password, salt);

  const passwordMain = req.body.password ? hash : lab.password;
  const updateLabData = {
    name: req.body.name,
    phone: req.body.phone,
    organization: req.body.organization,
    email: lab.email,
    city: req.body.city,
    state: req.body.state,
    userRole: ROLES.LAB_USER,
    address: req.body.address,
    postCode: req.body.postCode,
    password: passwordMain,
  };
  req.addDataToModel(updateLabData, lab);

  await lab.save();
  return reply.send({
    message: successMessage.LAB_UPDATE_SUCCESS,
  });
};

export const getLabs = async (req: FastifyRequest, reply: FastifyReply) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Lab);
  const lab = await labModel.find();
  return reply.send(lab);
};

export const getLocalLabs = async (
  req: FastifyRequest<{ Body: { state: string; city: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Lab);
  const CurrentUser = models[req.user.userRole];
  const serviceProvider = await CurrentUser.findById({
    _id: req.user._id,
  });
  if (!serviceProvider) {
    return reply.notFound(errorMessage.SERVICE_PROVIDER_NOT_FOUND);
  }

  const localLabs = await labModel.aggregate([
    {
      $match: {
        $or: [
          {
            postCode: serviceProvider.postCode,
          },
          { city: req.body?.city },
          { state: req.body?.state },
        ],
      },
    },
    {
      $project: {
        value: "$_id",
        label: concatString("name", "postCode", "state"),
      },
    },
  ]);
  return reply.send(localLabs);
};

export const getLab = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Lab);
  if (!req.params.id) {
    return reply.notFound(errorMessage.LAB_ID_NOT_FOUND);
  }
  const lab = await labModel.findById({ _id: req.params.id });
  return reply.send(lab);
};

export const getUserLab = async (req: FastifyRequest, reply: FastifyReply) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Lab);
  const lab = await labModel.findById({ _id: req.user._id });
  return reply.send(lab);
};

export const deleteLab = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  req.requireAccess(ACTIONS.DELETE, SUBJECTS.Lab);
  if (!req.params.id) {
    return reply.notFound(errorMessage.LAB_ID_NOT_FOUND);
  }
  const lab = await labModel.findById({ _id: req.params.id });
  if (!lab) {
    return reply.notFound(errorMessage.LAB_DETAIL_NOT_FOUND);
  }
  await labModel.findByIdAndDelete({ _id: lab._id });
  return reply.send({ message: successMessage.LAB_DELETE_SUCCESS });
};
