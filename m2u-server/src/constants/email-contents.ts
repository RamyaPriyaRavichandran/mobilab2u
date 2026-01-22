export const EMAIL_CONTENTS = {
  APPOINTMENT_APPROVAL_CUSTOMER: {
    subject:
      "You've got a doctor! Your appointment is one step closer - Mobilab2u",
    template: "review-customer-appointment",
  },
  APPOINTMENT_APPROVAL_DOCTOR: {
    subject: "Thanks! You've approved the consultation - Mobilab2u",
    template: "review-appointment-doctor",
  },
  APPOINTMENT_COMPLETE_CUSTOMER: {
    subject: `Here's Your Consultation Summary from Mobile!
 - Mobilab2u`,
    template: "customer-appointment-complete",
  },
  CUSTOMER_FOLLOW_UP_APPOINTMENT_SUCCESS_DOCTOR: {
    subject: `Good news! You've Got a New Appointment Request! - Mobilab2u`,
    template: "appointment-added",
  },
  CUSTOMER_RANDOM_DOCTOR_FOLLOW_UP_SUCCESS_DOCTOR: {
    subject: `Good news! You've Got a New Appointment Request! - Mobilab2u`,
    template: "appointment-added",
  },
  APPOINTMENT_CANCELLATION_DOCTOR: {
    subject: "Appointment cancelled - Mobilab2u",
    template: "appointment-cancellation-doctor",
  },
  APPOINTMENT_CANCELLATION_CUSTOMER: {
    subject: "Appointment cancelled - Mobilab2u",
    template: "appointment-cancellation-customer",
  },
  APPOINTMENT_CONFIRMATION_CUSTOMER: (gpPartnerName: string) => ({
    subject: `Hooray! Your Chat with ${gpPartnerName} is Confirmed! - Mobilab2u`,
    template: "appointment-confirmation-customer",
  }),
  APPOINTMENT_CONFIRMATION_DOCTOR: (date: string) => ({
    subject: `All Set! Your Consultation on ${date} is Confirmed - Mobilab2u`,
    template: "appointment-confirmation-doctor",
  }),
  ADMIN_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER: {
    subject: "A friendly update on your upcoming appointment - Mobilab2u",
    template: "critical-appointment-time-slot-re-allocation-customer",
  },
  ADMIN_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR: {
    subject: "A Little Help Needed: New Appointment Assigned - Mobilab2u",
    template: "critical-appointment-time-slot-re-allocation-doctor",
  },
  CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER: {
    subject: "All Sorted! Your Appointment Has a New Time. - Mobilab2u",
    template: "appointment-time-slot-re-allocation-same-doctor-customer",
  },
  CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR: {
    subject: "Quick Update: An Appointment Time Has Changed - Mobilab2u",
    template: "appointment-time-slot-re-allocation-same-doctor",
  },
  PENDING_CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_DOCTOR: {
    subject: " Great news! A new appointment is available for you! - Mobilab2u",
    template: "re-scheduled-pending-appointment-doctor-remainder",
  },
  PENDING_CUSTOMER_APPOINTMENT_TIME_SLOT_RE_ALLOCATION_CUSTOMER: {
    subject:
      "Just a moment! We're confirming your new appointment time. - Mobilab2u",
    template: "pending-appointment-time-slot-reassigned-customer",
  },
  TEST_APPROVED_CUSTOMER: {
    subject: "Wonderful News! Your Blood Test is Approved. - Mobilab2u",
    template: "hsp-approval-customer-blood-test",
  },
  TEST_APPROVED_HSP: {
    subject: "Wonderful News! You Approved Test. - Mobilab2u",
    template: "blood-test-approval-hsp",
  },
  TEST_LAB_ASSIGNED: {
    subject: "New Test Alert! A Sample is on its Way - Mobilab2u",
    template: "hsp-assign-lab-for-customer-test",
  },
  TEST_SAMPLE_RE_COLLECTION_REQUIRED_ADMIN: (lab: String) => ({
    subject: "Urgent: Invalid Sample Flagged by " + lab,
    template: "sample-re-collection-required-admin",
  }),
  TEST_SAMPLE_RE_COLLECTION_REQUIRED_CUSTOMER: {
    subject: "Important Update: Re-collection Needed for Your Test",
    template: "sample-re-collection-required-customer",
  },
  TEST_SAMPLE_RE_COLLECTION_REQUIRED_HSP: {
    subject: "Important Update: Sample Re-collection Required",
    template: "sample-re-collection-required-hsp",
  },
  TEST_REPORT_ADDED_CUSTOMER: {
    subject: "Great news! Your test results are ready to view - Mobilab2u",
    template: "lab-report-added",
  },
  TEST_REPORT_ADDED_HSP: {
    subject: "Great news! Test report submitted successfully - Mobilab2u",
    template: "lab-report-added-hsp",
  },
  TEST_BOOK_SUCCESS_CUSTOMER: {
    subject: "Order Confirmed - Mobilab2u",
    template: "test-added-customer",
  },
  TEST_ADDED_HSP: {
    template: "test-added",
    subject: "New Test Booked! Time for approve the test. - Mobilab2u",
  },
  TEST_CANCELLATION_CUSTOMER: {
    subject: "Lab Test cancelled - Mobilab2u",
    template: "lab-test-cancellation",
  },
  TEST_CANCELLATION_HSP: {
    subject: "Lab Test cancelled - Mobilab2u",
    template: "lab-test-cancellation-hsp",
  },
  TEST_CANCELLATION_LAB: {
    subject: "Lab Test cancelled - Mobilab2u",
    template: "lab-test-cancellation-lab",
  },
  TEST_SAMPLE_RE_COLLECTION_APPROVAL_CUSTOMER: {
    subject: "A quick update about your health test sample - Mobilab2u",
    template: "sample-re-collection-approval-customer",
  },
  TEST_SAMPLE_RE_COLLECTION_APPROVAL_HSP: {
    subject: "Action Needed: Sample Re-Collection - Mobilab2u",
    template: "sample-re-collection-approval-hsp",
  },
  TEST_SAMPLE_RE_COLLECTION_APPROVAL_LAB: {
    subject: "Question about an invalid sample - Mobilab2u",
    template: "sample-re-collection-approval-lab",
  },
  TEST_TIME_CHANGED: {
    subject: "Your Blood Test Rescheduled - Mobilab2u",
    template: "blood-test-time-changed",
  },
  PAYMENT_SUCCESS: {
    subject: "Thank You For Your Payment! - Mobilab2u",
    template: "payment-success",
  },
  REVIEW_HSP_OR_GP: {
    subject: `A Quick Update About Your Mobile Account - Mobilab2u`,
    template: "review-hsp-or-gp",
  },
  VERIFY_EMAIL: {
    subject: "Just one more step to get started! Welcome! - Mobilab2u",
    template: "verify-email",
  },
  SP_REGISTER_SUCCESS: {
    subject: "We Got Your Registration! - Mobilab2u",
    template: "register-service-provider",
  },
  REGISTER_NOTIFICATION_ADMIN: {
    subject:
      "(PENDING APPROVAL) Health Service Partner Registration - Mobilab2u",
    template: "registration-email-admin",
  },
  CUSTOMER_REGISTER_SUCCESS: {
    subject: `You're In! Welcome to the Mobile Family!
 - Mobilab2u`,
    template: "customer-register",
  },
  FORGOT_PASSWORD: {
    subject: "Password Reset Request for Mobile",
    template: "forgot-password",
  },
  TEST_BOOK_SUCCESS_ADMIN: {
    subject: "Admin Notification: New Test Booked. - Mobilab2u",
    template: "test-added-admin",
  },
  TEST_APPROVAL_HSP_ADMIN_NOTIFICATION: {
    subject: "Admin Notification: Test Approved. - Mobilab2u",
    template: "hsp-approval-test-admin-notification",
  },
  HSP_ASSIGN_LAB_ADMIN: {
    subject: "Admin Notification: Lab Assigned. - Mobilab2u",
    template: "lab-assigned-admin",
  },
  HSP_SAMPLE_COLLECTED_CUSTOMER: {
    subject: "Sample Collected Successfully",
    template: "hsp-sample-collected-customer",
  },
  HSP_SAMPLE_COLLECTED_HSP: {
    subject: "Sample Collected Confirmation",
    template: "hsp-sample-collected-hsp",
  },
  HSP_SAMPLE_COLLECTED_ADMIN: {
    subject: "Sample Collected Notification",
    template: "hsp-sample-collected-admin",
  },
  SAMPLE_SUBMITTED_LAB_ADMIN: {
    subject: "Sample Submitted to Lab",
    template: "sample-submitted-lab-admin",
  },
  SAMPLE_SUBMITTED_LAB_HSP: {
    subject: "Sample Submitted to Lab",
    template: "sample-submitted-lab-hsp",
  },
  SAMPLE_SUBMITTED_LAB_CUSTOMER: {
    subject: "Sample Submitted to Lab",
    template: "sample-submitted-lab",
  },
  TEST_REPORT_ADDED_ADMIN: {
    subject: "Test Report Added",
    template: "test-report-added-admin",
  },
  SAMPLE_RE_COLLECTION_REQUIRED_LAB: {
    subject: "Sample Re-collection Required",
    template: "sample-recollection-lab",
  },
  SAMPLE_RE_COLLECTION_REQUIRED_ADMIN: {
    subject: "Sample Re-collection Required",
    template: "sample-recollection-admin",
  },
  SAMPLE_RE_COLLECTION_APPROVAL_ADMIN: {
    subject: "Sample Re-collection Approved",
    template: "sample-recollection-approval-admin",
  },
  TEST_CANCEL_ADMIN: {
    subject: "Test Cancelled",
    template: "test-cancel-admin",
  },
  APPOINTMENT_ADDED_ADMIN: {
    subject: "Admin Notification: New Appointment Booked. - Mobilab2u",
    template: "appointment-added-admin",
  },
  APPOINTMENT_ADDED_GP: {
    subject: `Good news! You've Got a New Appointment Request! - Mobilab2u`,
    template: "appointment-added",
  },
};
