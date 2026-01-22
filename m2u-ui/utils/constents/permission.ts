export enum ROLES {
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  GP_PARTNER = 'GP_PARTNER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  LAB_USER = 'LAB_USER',
  CUSTOMER = 'CUSTOMER',
}

export enum SUBJECTS {
  ServiceProvider = 'ServiceProvider',
  GPPartner = 'GPPartner',
  Payment = 'Payment',
  Appointment = 'Appointment',
  AppointmentAvailability = 'AppointmentAvailability',
  AppointmentPrescription = 'AppointmentPrescription',
  User = 'User',
  Package = 'Package',
  Lab = 'Lab',
  Customer = 'Customer',
  Test = 'Test',
  Wallet = 'Wallet',
  // Add other subjects here
}

export enum ACTIONS {
  VIEW = 'VIEW',
  ADMIN_VIEW = 'ADMIN_VIEW',
  APPROVE = 'APPROVE',
  DELETE = 'DELETE',
  REVIEW = 'REVIEW',
  VIEW_ALL = 'VIEW_ALL',
  UPDATE = 'UPDATE',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  CREATE = 'CREATE',
  PAY_SERVICE_PROVIDER_FEE = 'PAY_SERVICE_PROVIDER_FEE',
  PAY_LAB_TEST_PAYMENT = 'PAY_LAB_TEST_PAYMENT',
  UPLOAD_TEST_REPORTS = 'UPLOAD_TEST_REPORTS',
  // Add other actions here
}
