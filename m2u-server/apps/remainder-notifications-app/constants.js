export const EMAIL_CONTENTS = {
  CUSTOMER_TEST_REMAINDER: (text) => ({
    template: 'customer-test-remainder',
    subject: text || 'Customer test remainder - Mobilab2u',
  }),
  APPOINTMENT_REMAINDER: {
    template: 'appointment-remainder',
    subject: 'Appointment Remainder - Mobilab2u',
  },
  APPOINTMENT_REMAINDER_ADMIN: {
    template: 'admin-remainder-for-missed-appointments',
    subject:
      'Reminder: Doctor Confirmation Pending for Approved Appointment - Mobilab2u',
  },
}

export const QUEUEING_OPTIONS = {
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP',
}
