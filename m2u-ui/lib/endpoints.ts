export const ROOT_URL = '/api/v1'

export const TEST_ENDPOINT = 'https://jsonplaceholder.typicode.com/users'
export const HEALTH_CHECK = `${ROOT_URL}/health/check`
export const REGISTER_SP = `${ROOT_URL}/user/register`
export const OTP = `${ROOT_URL}/user/send-otp-email`
export const CONTACT_US_FORM = `${ROOT_URL}/contact`
export const GET_CONTACT_US_FORM = `${ROOT_URL}/contact`
export const LOGIN = `${ROOT_URL}/user/login`
export const FORGOT_PASSWORD = `${ROOT_URL}/user/forgot-password`
export const CHANGE_PASSWORD = `${ROOT_URL}/user/change-password`
export const RESET_PASSWORD = `${ROOT_URL}/user/reset-password`
export const LOGOUT = `${ROOT_URL}/user/logout`
export const REFRESH = `${ROOT_URL}/user/refresh`
export const GET_SERVICE_PROVIDERS = `${ROOT_URL}/service-provider/all`
export const GET_GP_PARTNERS = `${ROOT_URL}/service-provider/all-gp-partners`
export const GET_USER_PERMS = `${ROOT_URL}/user/perms`
export const GET_SERVICE_PROVIDER = `${ROOT_URL}/service-provider/user-data`
export const SERVICE_PROVIDER_FEES = `${ROOT_URL}/payment/service-provider-fees`
export const REVIEW_SERVICE_PROVIDER = `${ROOT_URL}/service-provider/review`
export const HSP_REVIEW_MAIN = `${ROOT_URL}/service-provider/review-hsp-or-gp`
export const LAB_CREATION = `${ROOT_URL}/lab`
export const GET_LABS = `${ROOT_URL}/lab`
export const DELETE_LAB = `${ROOT_URL}/lab`
export const REGISTER_C = `${ROOT_URL}/user/customer-register`
export const DELETE_PLANS = `${ROOT_URL}/packages`
export const GET_PLANS = `${ROOT_URL}/packages`
export const GET_WALLET = `${ROOT_URL}/wallet/user-wallet`
export const GET_WALLET_WITHDRAWALS = `${ROOT_URL}/wallet/user-wallet-redeem/all`
export const GET_ALL_WALLET_WITHDRAWALS = `${ROOT_URL}/wallet/redeem/all`
export const GET_PURCHASED_MEDICINES = `${ROOT_URL}/appointment/get-purchased-medicines`

export const REVIEW_WALLET_REDEEM = `${ROOT_URL}/wallet/redeem-review`
export const PLAN_CREATION = `${ROOT_URL}/packages`
export const GET_CUSTOMER = `${ROOT_URL}/customer/all`
export const GET_CUSTOMER_PURCHASED_TESTS = `${ROOT_URL}/customer/customer-purchased-tests`
export const GET_CUSTOMER_PLANS = `${ROOT_URL}/packages/customer-packages`
export const GET_HSP_USER_DATA = `${ROOT_URL}/service-provider/user-data`
export const GET_CUSTOMER_USER_DATA = `${ROOT_URL}/customer/user-data`
export const GET_HSP_PLAN_DETAIL = `${ROOT_URL}/service-provider/kit-fees-detail`
export const GET_FOLLOWUP_APPOINTMENT_AVAILABILITY = `${ROOT_URL}/appointment/get-followup-appointment-availability-by-appointment-id`
export const PAY_CUSTOMER_TEST_FEES = `${ROOT_URL}/payment/customer-test-fees`
export const GET_ALL_CUSTOMER_TESTS = `${ROOT_URL}/lab-test/sp-customer-tests`
export const GET_SINGLE_CUSTOMER_TEST = `${ROOT_URL}/lab-test/user-tests`
export const GET_CUSTOMER_TEST = `${ROOT_URL}/lab-test/customer-test`
export const REVIEW_CUSTOMER_TEST = `${ROOT_URL}/lab-test/review`
export const LOCAL_LABS = `${ROOT_URL}/lab/local-labs`
export const GET_LAB_CUSTOMER_TESTS = `${ROOT_URL}/lab-test/lab-customer-tests`
export const REPAY_CUSTOMER_TEST_FEES = `${ROOT_URL}/payment/repay-customer-test-fees`
export const UPLOAD_REPORTS_FOR_CUSTOMER_TEST = `${ROOT_URL}/lab-test/upload-test-reports`

export const ADD_DOCTOR_TIME_SLOT = `${ROOT_URL}/appointment/add-time-slot`
export const DOCTOR_CONFIRMATION = `${ROOT_URL}/appointment/confirm-appointment`
export const GET_DOCTOR_TIME_SLOTS = `${ROOT_URL}/appointment/get-doctor-time-slot`
export const GET_DOCTORS_TIME_SLOTS = `${ROOT_URL}/appointment/get-doctors-time-slot`

export const BOOK_APPOINTMENT = `${ROOT_URL}/payment/book-consultation-appointment`

export const GET_AVAILABLE_TIME_SLOTS = `${ROOT_URL}/appointment/get-available-time-slots`

export const PAY_DOCTOR_CONSULTATION_FEES = `${ROOT_URL}/payment/book-doctor-appointment`

export const GET_CONSULTATION_BOOKINGS = `${ROOT_URL}/appointment/get-customer-appointments-by-doctor-availability`

export const APPROVE_APPOINTMENT_BOOKINGS = `${ROOT_URL}/appointment/review-appointment`

export const GET_CUSTOMER_APPOINTMENTS = `${ROOT_URL}/appointment/appointment-by-customer-id`

export const GET_ALL_CUSTOMER_APPOINTMENTS = `${ROOT_URL}/appointment/all-appointments`

export const ADD_APPOINTMENT_MEDICINE = `${ROOT_URL}/appointment/add-appointment-prescription`

export const APPOINTMENT_RE_ALLOCATION = `${ROOT_URL}/appointment/time-slot-re-allocation-by-admin`

export const ADD_APPOINTMENT_REFERRAL = `${ROOT_URL}/appointment/add-appointment-referral`

export const ADD_APPOINTMENT_TEST = `${ROOT_URL}/appointment/add-appointment-test`

export const MARK_AS_CONSULTATION_COMPLETED = `${ROOT_URL}/appointment/mark-consultation-done`

export const GET_CUSTOMER_APPOINTMENT = `${ROOT_URL}/appointment/get-customer-appointment`

export const GET_CUSTOMER_APPOINTMENT_DOCTOR_DETAIL_ADMIN = `${ROOT_URL}/appointment/get-doctors-by-availability-slot-data`

export const GET_CUSTOMER_APPOINTMENT_BY_DOCTOR_AVAILABILITY = `${ROOT_URL}/appointment/get-appointment-approved-doctor-availability-by-appointment-id`

export const POST_CUSTOMER_RESCHEDULE_APPOINTMENT = `${ROOT_URL}/appointment/time-slot-re-allocation-by-customer`

export const GET_APPOINTMENT_PRESCRIPTION = `${ROOT_URL}/appointment/get-appointment-prescription`

export const UPDATE_MEDICINE_PRICE = `${ROOT_URL}/appointment/update-medicine-price`

export const CREATE_CUSTOM_PACKAGE = `${ROOT_URL}/appointment/create-custom-package`

export const APPROVE_DOCTOR_PRESCRIPTION = `${ROOT_URL}/appointment/review-appointment-consultation`

export const BUY_MEDICINE = `${ROOT_URL}/payment/buy-medicine`

export const GET_CUSTOMER_PURCHASED_PACKAGES = `${ROOT_URL}/lab-test/test-by-customer-id`
export const GET_CUSTOMER_PURCHASED_APPOINTMENTS = `${ROOT_URL}/appointment/completed-appointment-by-customer-id`
export const GET_ADMIN_TEST_PACKAGES = `${ROOT_URL}/packages/test-packages`

export const BOOK_FOLLOWUP_DOCTOR_APPOINTMENT = `${ROOT_URL}/payment/book-followup-doctor-followup-appointment`
export const BOOK_RANDOM_DOCTOR_FOLLOWUP_APPOINTMENT = `${ROOT_URL}/payment/book-random-doctor-followup-appointment`

export const VERIFY_USER_FOR_WALLET_REDEEM = `${ROOT_URL}/wallet/verify-user`

export const REDEEM_WALLET = `${ROOT_URL}/wallet/redeem`
export const REDEEM_DECLINE_WALLET = `${ROOT_URL}/wallet/redeem`
export const PAY_FOLLOWUP_CUSTOMER_TEST_FEES = `${ROOT_URL}/payment/customer-followup-test-fees`

export const ORDER_COUNTS = `${ROOT_URL}/wallet/order-counts`

export const CANCEL_APPOINTMENT = `${ROOT_URL}/appointment/appointment-cancellation`

export const LAB_TEST_COUNTS = `${ROOT_URL}/lab-test/lab-test-counts`

export const GET_APPOINTMENT_BY_REDIRECTION_ID = `${ROOT_URL}/appointment/get-appointment-by-redirection-id`

export const GET_USER_WALLET_HISTORY = `${ROOT_URL}/wallet/user-wallet-history`
export const GET_USER_WALLET_DETAILS = `${ROOT_URL}/wallet/user-wallet-details`

export const GET_FINISHED_APPOINTMENT_COUNT = `${ROOT_URL}/appointment/finished-counts`

export const GET_FINISHED_LAB_TEST_COUNT = `${ROOT_URL}/lab-test/finished-counts`

export const ADMIN_UPDATE_SP_PROFILE = `${ROOT_URL}/service-provider/admin-update-hsp-gp-profile`
export const PHONE_OTP = `${ROOT_URL}/user/send-otp-phone`
export const CUSTOMER_UPDATE_PROFILE = `${ROOT_URL}/customer/update-profile`
export const UPDATE_SP_PROFILE = `${ROOT_URL}/service-provider/user-update-profile`

export const REFERRAL_USER = `${ROOT_URL}/user/referral`
export const GET_CUSTOMER_ADDRESS = `${ROOT_URL}/customer/customer-address`
export const SAMPLE_RE_COLLECTION_APPROVAL = `${ROOT_URL}/lab-test/sample-recollection-approval`
export const TEST_RESCHEDULE = `${ROOT_URL}/lab-test/reschedule`
export const TEST_CANCELLATION = `${ROOT_URL}/lab-test/cancellation`
export const USER_DETAIL = `${ROOT_URL}/user/detail`
