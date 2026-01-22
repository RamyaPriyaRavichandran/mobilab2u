export const INPUT_OTP_ERROR = 'The code should be six digits long'
export const INPUT_EMAIL_CODE_ERROR = 'Email Verification Code is required'
export const INPUT_EMAIL_ERROR = 'Email is required'
export const INPUT_REQUIRED = 'Required'
export const INPUT_ID_REQUIRED = 'ID Proof is required'

export const CURRENT_PASSWORD_ERROR = 'Current Password is required'
export const INPUT_PASSWORD_REQUIRED = 'Password is required'
export const INPUT_ROLE_REQUIRED = 'Role is required'
export const INPUT_CONFIRM_PASSWORD_REQUIRED = 'Confirm Password is required'
export const PASSWORD_MATCH = 'Passwords must match'
export const DOB_REQUIRED = 'Date of birth is required'
export const MIN_AGE = 18
export const MIN_8_CHAR = 'Minimum 8 characters required'
export const MAX_50_CHAR = 'Maximum 50 characters allowed'
export const INPUT_MYKAD_DOCUMNET = 'MYKAD Documenr required'
export const INPUT_PASSPORTSIZEPHOTO_ERROR = 'Passport Size photo required'
export const INPUT_ESIGN_ERROR = 'E-Sign is required'
export const INPUT_RGISTER_NUMBER_ERROR = 'Register number is required'
export const INPUT_MAX_4_FILE = 'Maximum 4 Files allowed'
export const INPUT_MIN_2_FILE = 'Minimum 2 Files required'
export const INPUT_MEDICAL_QUALIFICATION = 'Medical qualification required'
export const INPUT_NRIC = 'NRIC number required'
export const INPUT_PASSPORT = 'Passport number required'
export const INPUT_PASSPORT_MIN = 'Minimum 6 digits required'
export const INPUT_PASSPORT_MAX = 'Maximum 9 digits allowed'
export const INPUT_NRIC_MIN_ERROR = 'NRIC number must be at least 12 digits'
export const INPUT_NRIC_Max_ERROR = 'NRIC number must not exceed 12 digits'
export const INPUT_STATE_ERROR = 'State is required'
export const INPUT_CITY_ERROR = 'City is required'
export const INPUT_COUNTRY_ERROR = 'Country is required'
export const INPUT_ADDRESS_ERROR = 'Address is required'
export const INPUT_POSTCODE_ERROR = 'Postcode is required'
export const INPUT_POSTCODE_MIN_ERROR = 'Postcode must be 6 digits'
export const INPUT_POSTCODE_MAX_ERROR = 'Postcode must not exceed 5 digits'
export const INPUT_PHONE_NUMBER = 'Phone number is required'
export const INPUT_PHONE_NUMBER_MAX = 'Phone number must not exceed 11 digits'
export const INPUT_PHONE_NUMBER_MIN = 'Phone number must be at least 10 digits'
export const INPUT_GENDER_ERROR = 'Gender is required'
export const INPUT_IDPROOF_ERROR = 'Id Proof required'
export const INPUT_INVALID_EMAIL_ERROR = 'Please enter a valid email address.'
export const INPUT_VERIFY_ERROR = 'Please verify your email'
export const INPUT_NAME_ERROR = 'Username is required'
export const INPUT_NAME = 'Name is required'
export const INPUT_PLAN_NAME = 'Plan name is required'
export const INPUT_MEMBERS = 'Min 2 members'
export const INPUT_ORGANIZATION_ERROR = 'Organization name is required'
export const PACKAGE_REMOVE_MESSAGE = 'Do you want to remove this package?'
export const PROTECTED_LOGIN_MESSAGE = 'You are already logged in. Do you want to log out and re-login?'
export const LOGOUT_CONFIRM_MESSAGE = 'Are you sure you want to logout?'
export const APPOINTMENT_APPROVE_MESSAGE =
  'If a follow-up appointment is available for the selected appointment credentials (date and time), the follow-up appointment will be approved. Otherwise, the selected appointment will be approved.Are you sure you want to approve this appointment?'
export const CONSULTATION_DONE = 'Are you sure you want to completed this appointment?'
export const DOCTOR_CONFIRMATION_TEXT =
  "Once you confirm, you'll be able to consult the patient.\n Are you sure you want to confirm this appointment?"
export const DOCTOR_CONSULTATION_WAITING_TEXT = 'Please wait for appointment scheduled date and time'
export const CANCEL_APPOINTMENT_TEXT = 'Are you sure you want to cancel this appointment?'
export const NOT_LOGGED_IN_ERROR = 'You are not logged in. To purchase the package, please log in.'
export const SELECT_FUTURE_DATE_AND_TIME = 'Please select future date and time'
export const SELECT_AVAILABILITY_FOR_FUTURE_DATE = 'Please add appointment availability for future date'
export const ROLE_ERROR = 'Please select role'
export const WITHDRAW_AMOUNT_ERROR = 'Please enter withdraw amount'
export const WITHDRAW_AMOUNT_ERROR_MESSAGE = 'Enter less than or equal to available amount'
export const WITHDRAW_AMOUNT_ERROR_MESSAGE_MIN = 'Minimum amount is 1'
export const OTP_ERROR = 'OTP is required'
export const DECLINE_ERROR = 'Reason is required'
export const INPUT_MINIMUM_SIX = 'Minimum 6 characters required'
export const INPUT_MAXIMUM_SIX = 'Maximum 6 characters allowed'
export const CUSTOMER_ADDRESS_REQUIRED = 'Customer address is required'
export const serviceProviderApprovalStatus = [
  {
    label: 'Approved',
    value: 'APPROVED',
  },
  {
    label: 'Declined',
    value: 'DECLINED',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Consultation Done',
    value: 'DOCTOR_CONSULTATION_DONE',
  },
]
export const Roles: Array<{ label: string; value: string }> = [
  { label: 'Be a service provider/HSP', value: 'SERVICE_PROVIDER' },
  { label: 'Be a GP partner/Doctor', value: 'GP_PARTNER' },
]

export const language = [
  { value: 'TAMIL', label: 'Tamil' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'MALAY', label: 'Malay' },
  { value: 'CHINEES', label: 'Chinese' },
]
export const userType: Array<{ label: string; value: string }> = [
  { value: 'SUPER_ADMIN', label: 'Admin' },
  { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'GP_PARTNER', label: 'GP Partner' },
  { value: 'LAB_USER', label: 'Lab User' },
]
export const referType: Array<{ label: string; value: string }> = [
  { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'GP_PARTNER', label: 'GP Partner' },
]
export const gender: Array<{ label: string; value: string }> = [
  { value: '', label: 'Select Gender' },
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
]

export const qualification: Array<{ label: string; value: string }> = [
  { value: 'PARADEMIC', label: 'Parademic' },
  { value: 'NURSES', label: 'Nurses' },
  { value: 'OTHERS', label: 'Others' },
]
export const gp_qualification: Array<{ label: string; value: string }> = [{ value: 'DOCTOR', label: 'Doctor' }]
export const idProof: Array<{ label: string; value: string }> = [
  { value: 'NRIC_NUMBER', label: 'NRIC Number' },
  { value: 'PASSPORT_NUMBER', label: 'Passport Number' },
]
export const serviceType: Array<{ label: string; value: string }> = [
  { value: 'SERVICE_PROVIDER_KIT_FEES', label: 'Service Provider Kit Fees' },
  { value: 'TEST', label: 'Test' },
  { value: 'APPOINTMENT', label: 'Appointment' },
  { value: 'APPOINTMENT_CANCELLATION', label: 'Appointment Cancellation' },
  { value: 'WALLET_REDEEM_REQUEST', label: 'Redeem requested' },
  { value: 'WALLET_REDEEM_REQUEST_DECLINE', label: 'Redeem declined' },
  { value: 'TEST_CANCELLATION', label: 'Labtest Cancellation' },
]
export const packageServiceType: Array<{ label: string; value: string }> = [
  { value: 'SERVICE_PROVIDER_KIT_FEES', label: 'Service Provider Kit Fees' },
  { value: 'TEST', label: 'Test' },
  { value: 'APPOINTMENT', label: 'Appointment' },
]
export const type: Array<{ label: string; value: string }> = [
  { label: 'Family', value: 'FAMILY' },
  { label: 'Individual', value: 'INDIVIDUAL' },
]

export enum CUSTOMER_LAB_TEST_STATUS {
  SERVICE_PROVIDER_APPROVED = 'SERVICE_PROVIDER_APPROVED',
  DECLINED = 'DECLINED',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  SAMPLE_RE_COLLECTED = 'SAMPLE_RE_COLLECTED',
  SAMPLE_SUBMITTED_TO_LAB = 'SAMPLE_SUBMITTED_TO_LAB',
  RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB = 'RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB',
  NEED_SAMPLE_RE_COLLECTION = 'NEED_SAMPLE_RE_COLLECTION',
  LAB_ASSIGNED = 'LAB_ASSIGNED',
  TEST_COMPLETED = 'TEST_COMPLETED',
  SAMPLE_RE_COLLECTION_APPROVED = 'SAMPLE_RE_COLLECTION_APPROVED',
  PROCESSING = 'PROCESSING',
}
export const customerTestStatus: Array<{ label: string; value: string }> = [
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SERVICE_PROVIDER_APPROVED', label: 'Service Provider Approved' },
  { value: 'LAB_ASSIGNED', label: 'Lab assigned' },
  { value: 'NEED_SAMPLE_RE_COLLECTION', label: 'Need sample re-collection' },
  { value: 'SAMPLE_RE_COLLECTED', label: 'Sample Re-collected' },
  { value: 'RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB', label: 'Re-collected sample submitted to lab' },
  { value: 'NEED_SAMPLE_RE_COLLECTION', label: 'Need sample re-collection' },
  { value: 'SUBMITTED_TO_LAB', label: 'Submitted to Lab' },
  { value: 'SAMPLE_COLLECTED', label: 'Sample Collected' },
  { value: 'TEST_COMPLETED', label: 'Test Completed' },
]

export const frequency: Array<{ label: string; value: string }> = [
  { label: '1-1-1', value: '1_1_1' },
  { label: '1-0-1', value: '1_0_1' },
  { label: '1-0-0', value: '1_0_0' },
  { label: '0-0-1', value: '0_0_1' },
  { label: '0-1-0', value: '0_1_0' },
  { label: '1-1-0', value: '1_1_0' },
  { label: '0-1-1', value: '0_1_1' },
]
export const beforeFood_afterFood: Array<{ label: string; value: string }> = [
  { label: 'Before Food', value: 'BF' },
  { label: 'After Food', value: 'AF' },
]

export enum BASIC_STATUS {
  APPROVED = 'APPROVED',
  PURCHASED = 'PURCHASED',
  DECLINED = 'DECLINED',
  ACTIVE = 'ACTIVE',
  DE_ACTIVE = 'DE_ACTIVE',
}
export enum CUSTOMER_TEST_STATUS {
  PROCESSING = 'PROCESSING',
  SERVICE_PROVIDER_APPROVED = 'SERVICE_PROVIDER_APPROVED',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  SAMPLE_RE_COLLECTED = 'SAMPLE_RE_COLLECTED',
  NEED_SAMPLE_RE_COLLECTION = 'NEED_SAMPLE_RE_COLLECTION',
  SAMPLE_RE_COLLECTION_APPROVED = 'SAMPLE_RE_COLLECTION_APPROVED',
  SAMPLE_SUBMITTED_TO_LAB = 'SAMPLE_SUBMITTED_TO_LAB',
  RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB = 'RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB',
  LAB_ASSIGNED = 'LAB_ASSIGNED',
  TEST_COMPLETED = 'TEST_COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum APPOINTMENT_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DOCTOR_CONFIRMED = 'DOCTOR_CONFIRMED',
  DOCTOR_CONSULTATION_DONE = 'DOCTOR_CONSULTATION_DONE',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export enum USER_ROLES {
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  GP_PARTNER = 'GP_PARTNER',
  CUSTOMER = 'CUSTOMER',
  LAB_USER = 'LAB_USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export const state: any = [
  {
    value: 'PERLIS',
    label: 'Perlis',
  },
  {
    value: 'KEDAH',
    label: 'Kedah',
  },
  {
    value: 'PERAK',
    label: 'Perak',
  },
  {
    value: 'PULAU PINANG',
    label: 'Pulau Pinang',
  },
  {
    value: 'SELANGOR',
    label: 'Selangor',
  },
  {
    value: 'NEGERI SEMBILAN',
    label: 'Negeri Sembilan',
  },
  {
    value: 'MELAKA',
    label: 'Melaka',
  },
  {
    value: 'JOHOR',
    label: 'Johor',
  },
  {
    value: 'KELANTAN',
    label: 'Kelantan',
  },
  {
    value: 'TERENGGANU',
    label: 'Terengganu',
  },
  {
    value: 'PAHANG',
    label: 'Pahang',
  },
  {
    value: 'SABAH',
    label: 'Sabah',
  },
  {
    value: 'SARAWAK',
    label: 'Sarawak',
  },
  {
    value: 'KUALA LUMPUR',
    label: 'Kuala Lumpur',
  },
]

export const newTimeSlots = (date: string) => [
  {
    key: 1,
    startTime: '07:00 AM',
    endTime: '08:00 AM',
    date: date,
  },
  {
    key: 2,
    startTime: '08:00 AM',
    endTime: '09:00 AM',
    date: date,
  },
  {
    key: 3,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    date: date,
  },
  {
    key: 4,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    date: date,
  },
  {
    key: 5,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    date: date,
  },
  {
    key: 6,
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    date: date,
  },
  {
    key: 7,
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    date: date,
  },
  {
    key: 8,
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    date: date,
  },
  {
    key: 9,
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    date: date,
  },
  {
    key: 10,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    date: date,
  },
  {
    key: 11,
    startTime: '05:00 PM',
    endTime: '06:00 PM',
    date: date,
  },
  {
    key: 12,
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    date: date,
  },
  {
    key: 13,
    startTime: '07:00 PM',
    endTime: '08:00 PM',
    date: date,
  },
  {
    key: 14,
    startTime: '08:00 PM',
    endTime: '09:00 PM',
    date: date,
  },
  {
    key: 15,
    startTime: '09:00 PM',
    endTime: '10:00 PM',
    date: date,
  },
]

export const labTestTimeSlots = [
  { label: '6:00 AM', value: '6:00 AM' },
  { label: '6:20 AM', value: '6:20 AM' },
  { label: '6:40 AM', value: '6:40 AM' },
  { label: '7:00 AM', value: '7:00 AM' },
  { label: '7:20 AM', value: '7:20 AM' },
  { label: '7:40 AM', value: '7:40 AM' },
  { label: '8:00 AM', value: '8:00 AM' },
  { label: '8:20 AM', value: '8:20 AM' },
  { label: '8:40 AM', value: '8:40 AM' },
  { label: '9:00 AM', value: '9:00 AM' },
  { label: '9:20 AM', value: '9:20 AM' },
  { label: '9:40 AM', value: '9:40 AM' },
  { label: '10:00 AM', value: '10:00 AM' },
  { label: '10:20 AM', value: '10:20 AM' },
  { label: '10:40 AM', value: '10:40 AM' },
  { label: '11:00 AM', value: '11:00 AM' },
  { label: '11:20 AM', value: '11:20 AM' },
  { label: '11:40 AM', value: '11:40 AM' },
  { label: '12:00 PM', value: '12:00 PM' },
  { label: '12:20 PM', value: '12:20 PM' },
  { label: '12:40 PM', value: '12:40 PM' },
  { label: '1:00 PM', value: '1:00 PM' },
  { label: '1:20 PM', value: '1:20 PM' },
  { label: '1:40 PM', value: '1:40 PM' },
  { label: '2:00 PM', value: '2:00 PM' },
  { label: '2:20 PM', value: '2:20 PM' },
  { label: '2:40 PM', value: '2:40 PM' },
  { label: '3:00 PM', value: '3:00 PM' },
  { label: '3:20 PM', value: '3:20 PM' },
  { label: '3:40 PM', value: '3:40 PM' },
  { label: '4:00 PM', value: '4:00 PM' },
  { label: '4:20 PM', value: '4:20 PM' },
  { label: '4:40 PM', value: '4:40 PM' },
  { label: '5:00 PM', value: '5:00 PM' },
  { label: '5:20 PM', value: '5:20 PM' },
  { label: '5:40 PM', value: '5:40 PM' },
  { label: '6:00 PM', value: '6:00 PM' },
  { label: '6:20 PM', value: '6:20 PM' },
  { label: '6:40 PM', value: '6:40 PM' },
  { label: '7:00 PM', value: '7:00 PM' },
  { label: '7:20 PM', value: '7:20 PM' },
  { label: '7:40 PM', value: '7:40 PM' },
  { label: '8:00 PM', value: '8:00 PM' },
]

export const STATUS: Record<string, string> = {
  APPROVED: 'Approved',
  PENDING: 'Pending',
  DECLINED: 'Declined',
  PAID: 'Paid',
  DOCTOR_CONSULTATION_DONE: 'Consultation done',
  COMPLETED: 'Completed',
  ACTIVE: 'Active',
  DE_ACTIVE: 'De-Active',
}
