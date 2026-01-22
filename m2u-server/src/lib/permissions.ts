export enum ROLES {
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  GP_PARTNER = 'GP_PARTNER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  LAB_USER = 'LAB_USER',
  CUSTOMER = 'CUSTOMER',
}

export enum SUBJECTS {
  ServiceProvider = 'ServiceProvider',
  Profile = 'Profile',
  GPPartner = 'GPPartner',
  Payment = 'Payment',
  Appointment = 'Appointment',
  AppointmentAvailability = 'AppointmentAvailability',
  AppointmentPrescription = 'AppointmentPrescription',
  User = 'User',
  Package = 'Package',
  Lab = 'Lab',
  Customer = 'Customer',
  Medicine = 'Medicine',
  Test = 'Test',
  Wallet = 'Wallet',
  // Add other subjects here
}

export enum ACTIONS {
  VIEW = 'VIEW',
  ADMIN_VIEW = 'ADMIN_VIEW',
  BUY = 'BUY',
  DELETE = 'DELETE',
  REVIEW = 'REVIEW',
  VIEW_ALL = 'VIEW_ALL',
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  APPROVE = 'APPROVE',
  RESCHEDULE = 'RESCHEDULE',
  SAMPLE_RECOLLECTION_APPROVAL = 'SAMPLE_RECOLLECTION_APPROVAL',
  PAY_SERVICE_PROVIDER_FEE = 'PAY_SERVICE_PROVIDER_FEE',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  PAY_LAB_TEST_PAYMENT = 'PAY_LAB_TEST_PAYMENT',
  UPLOAD_TEST_REPORTS = 'UPLOAD_TEST_REPORTS',
  WITHDRAW_AMOUNT = 'WITHDRAW_AMOUNT',
  CANCELLATION = 'CANCELLATION',
  CONFIRMATION = 'CONFIRMATION',
  TIME_SLOT_RE_ALLOCATION = 'TIME_SLOT_RE_ALLOCATION',
  TIME_SLOT_RE_ALLOCATION_ADMIN = 'TIME_SLOT_RE_ALLOCATION_ADMIN',
  // Add other actions here
}
