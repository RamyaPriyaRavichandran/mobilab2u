import { ACTIONS, ROLES, SUBJECTS } from '../../../lib/permissions'

export const customerPerms = {
  roleId: ROLES.CUSTOMER,
  perms: [
    {
      subject: SUBJECTS.User,
      actions: [ACTIONS.VIEW, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.Profile,
      actions: [ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.Package,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Customer,
      actions: [ACTIONS.VIEW, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.Test,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Payment,
      actions: [ACTIONS.PAY_LAB_TEST_PAYMENT, ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Appointment,
      actions: [
        ACTIONS.CREATE,
        ACTIONS.VIEW_ALL,
        ACTIONS.VIEW,
        ACTIONS.TIME_SLOT_RE_ALLOCATION,
      ],
    },
    {
      subject: SUBJECTS.AppointmentAvailability,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.AppointmentPrescription,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.BUY],
    },
    {
      subject: SUBJECTS.Wallet,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.WITHDRAW_AMOUNT],
    },
  ],
}
