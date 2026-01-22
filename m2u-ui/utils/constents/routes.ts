import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  UsersIcon,
  BeakerIcon,
  WalletIcon,
  UserCircleIcon,
  EyeDropperIcon,
  HeartIcon,
  CalendarDaysIcon,
  CursorArrowRippleIcon,
} from '@heroicons/react/24/outline'
import { ACTIONS, SUBJECTS } from './permission'
export const HOME = '/'
export const ABOUT_US = '/about-us'
export const CONTACT_US = '/contact-us'
export const PRODUCTS = '/products'
export const SERVICES = '/services'
export const LOG_OUT = '/user/logout'
export const PURCHASEABLE_PACKAGES = '/packages'

export const SP_LOGIN = '/user/login'
export const SP_REGISTER = '/user/sp/register'
export const SP_REGISTER_SUCCESS = '/user/sp/register/success'
export const FORGOT_PASS = '/user/forgot-password'

export const DASHBOARD = '/dashboard'
export const SP_LIST = '/service-provider'
export const GP_LIST = '/gp-partners'
export const TICKETS = '/tickets'
export const RESET_PASSWORD = '/reset-password'
export const LABS = '/labs'
export const REGISTRATION = '/registration'
export const CUSTOMER_DASHBOARD = '/dashboard/customer'
export const PACKAGE_DETAILS = '/customer-package'
export const PACKAGES = '/admin/packages'
export const REGISTER_COMMON = '/user/register'
export const CUSTOMER_REGISTER = '/user/customer/register'
export const CUSTOMER_TABLE = '/customer'
export const CUSTOMER_PURCHASED = '/purchased-packages'
export const PURCHASED_MEDICINES = '/purchased-medicines'
export const MY_TESTS = '/my-tests'
export const CUSTOMER_ORDERS = '/customer-tests'
export const DOCTOR_CALENDER = '/doctor-availability'
export const CONSULTATION_APPOINTMENTS = '/appointments'
export const WALLET = '/wallet'
export const WALLET_REDEEMS = '/wallet-redeems'
export const USER_PROFILE = '/user-profile'
export const SIDEBAR_LINKS = [
  {
    name: 'Registration',
    id: 1,
    path: REGISTRATION,
    icon: IdentificationIcon,
    perms: {
      subject: SUBJECTS.Package,
      action: ACTIONS.PAY_SERVICE_PROVIDER_FEE,
    },
  },
  {
    name: 'Profile',
    id: 2,
    icon: UserCircleIcon,
    path: USER_PROFILE,
    perms: {
      subject: SUBJECTS.User,
      action: ACTIONS.PROFILE_UPDATE,
    },
  },

  {
    name: 'Service Providers',
    id: 3,
    icon: BriefcaseIcon,
    path: SP_LIST,
    perms: {
      subject: SUBJECTS.ServiceProvider,
      action: ACTIONS.VIEW_ALL,
    },
  },
  {
    name: 'G.P Partners',
    id: 4,
    icon: BriefcaseIcon,
    path: GP_LIST,
    perms: {
      subject: SUBJECTS.ServiceProvider,
      action: ACTIONS.VIEW_ALL,
    },
  },
  {
    name: 'Customers',
    id: 5,
    icon: UsersIcon,
    path: CUSTOMER_TABLE,
    perms: {
      subject: SUBJECTS.Customer,
      action: ACTIONS.VIEW_ALL,
    },
  },
  {
    name: 'Labs',
    id: 6,
    icon: BeakerIcon,
    path: LABS,
    perms: {
      subject: SUBJECTS.Lab,
      action: ACTIONS.CREATE,
    },
  },
  {
    name: 'Packages',
    id: 7,
    icon: ClipboardDocumentListIcon,
    path: PACKAGE_DETAILS,
    perms: {
      subject: SUBJECTS.Payment,
      action: ACTIONS.PAY_LAB_TEST_PAYMENT,
    },
  },
  {
    name: 'Packages',
    id: 8,
    icon: ClipboardDocumentCheckIcon,
    path: PACKAGES,
    perms: {
      subject: SUBJECTS.Package,
      action: ACTIONS.CREATE,
    },
  },
  {
    name: 'Purchased Tests',
    id: 9,
    icon: BeakerIcon,
    path: CUSTOMER_PURCHASED,
    perms: {
      subject: SUBJECTS.Test,
      action: ACTIONS.ADMIN_VIEW,
    },
  },
  {
    name: 'Availablity Calender',
    id: 10,
    icon: CalendarDaysIcon,
    path: DOCTOR_CALENDER,
    perms: {
      subject: SUBJECTS.GPPartner,
      action: ACTIONS.UPDATE,
    },
  },
  {
    name: 'Appointments',
    id: 11,
    icon: HeartIcon,
    path: CONSULTATION_APPOINTMENTS,
    perms: {
      subject: SUBJECTS.Appointment,
      action: ACTIONS.VIEW_ALL,
    },
  },
  {
    name: 'Purchased Medicines',
    id: 12,
    icon: EyeDropperIcon,
    path: PURCHASED_MEDICINES,
    perms: {
      subject: SUBJECTS.AppointmentPrescription,
      action: ACTIONS.APPROVE,
    },
  },

  {
    name: 'Wallet redeems',
    id: 13,
    icon: WalletIcon,
    path: WALLET_REDEEMS,
    perms: {
      subject: SUBJECTS.Wallet,
      action: ACTIONS.REVIEW,
    },
  },
  {
    name: 'Tests',
    id: 14,
    icon: BeakerIcon,
    path: CUSTOMER_ORDERS,
    perms: {
      subject: SUBJECTS.Test,
      action: ACTIONS.VIEW_ALL,
    },
  },

  {
    name: 'Wallet',
    id: 15,
    icon: ShoppingCartIcon,
    path: WALLET,
    perms: {
      subject: SUBJECTS.User,
      action: ACTIONS.VIEW,
    },
  },
  {
    name: 'Dashboard',
    id: 16,
    icon: CursorArrowRippleIcon,
    path: REGISTRATION,
    perms: {
      subject: SUBJECTS.Payment,
      action: ACTIONS.PAY_SERVICE_PROVIDER_FEE,
    },
  },
  // {
  //   name: 'Tests to do',
  //   id: 9,
  //   icon: ClipboardDocumentListIcon,
  //   path: CUSTOMER_ORDERS,
  //   perms: {
  //     subject: SUBJECTS.Test,
  //     action: ACTIONS.UPLOAD_TEST_REPORTS,
  //   },
  // },
]

export const LOGIN_ROUTES: Record<string, string> = {
  SERVICE_PROVIDER: '/registration',
  GP_PARTNER: '/dashboard/gpdashboard',
  SUPER_ADMIN: '/dashboard',
  LAB_USER: '/dashboard',
  CUSTOMER: '/dashboard/customer',
  undefined: '/',
  null: '/',
}
