import { ACTIONS, ROLES, SUBJECTS } from '../../../lib/permissions'

export const gpPartnerPerms = {
  roleId: ROLES.GP_PARTNER,
  perms: [
    {
      subject: SUBJECTS.GPPartner,
      actions: [ACTIONS.VIEW, ACTIONS.UPDATE, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.User,
      actions: [ACTIONS.VIEW, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.Lab,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Payment,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Appointment,
      actions: [
        ACTIONS.REVIEW,
        ACTIONS.VIEW_ALL,
        ACTIONS.VIEW,
        ACTIONS.CONFIRMATION,
      ],
    },
    {
      subject: SUBJECTS.AppointmentAvailability,
      actions: [ACTIONS.CREATE, ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.AppointmentPrescription,
      actions: [ACTIONS.CREATE, ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Wallet,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.WITHDRAW_AMOUNT],
    },
  ],
}
