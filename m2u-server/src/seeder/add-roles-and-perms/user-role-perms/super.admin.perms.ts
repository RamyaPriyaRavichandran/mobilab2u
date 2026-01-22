import { ACTIONS, ROLES, SUBJECTS } from '../../../lib/permissions'

export const superAdminPerms = {
  roleId: ROLES.SUPER_ADMIN,
  perms: [
    {
      subject: SUBJECTS.ServiceProvider,
      actions: [ACTIONS.VIEW, ACTIONS.UPDATE, ACTIONS.REVIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Package,
      actions: [
        ACTIONS.VIEW,
        ACTIONS.VIEW_ALL,
        ACTIONS.CREATE,
        ACTIONS.UPDATE,
        ACTIONS.DELETE,
      ],
    },
    {
      subject: SUBJECTS.AppointmentAvailability,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Lab,
      actions: [
        ACTIONS.VIEW,
        ACTIONS.VIEW_ALL,
        ACTIONS.DELETE,
        ACTIONS.CREATE,
        ACTIONS.UPDATE,
      ],
    },
    {
      subject: SUBJECTS.User,
      actions: [ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Customer,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Appointment,
      actions: [
        ACTIONS.REVIEW,
        ACTIONS.VIEW_ALL,
        ACTIONS.VIEW,
        ACTIONS.APPROVE,
        ACTIONS.CANCELLATION,
        ACTIONS.TIME_SLOT_RE_ALLOCATION_ADMIN,
      ],
    },
    {
      subject: SUBJECTS.AppointmentPrescription,
      actions: [
        ACTIONS.APPROVE,
        ACTIONS.UPDATE,
        ACTIONS.VIEW_ALL,
        ACTIONS.VIEW,
      ],
    },
    {
      subject: SUBJECTS.Wallet,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.REVIEW],
    },
    {
      subject: SUBJECTS.Medicine,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Test,
      actions: [
        ACTIONS.ADMIN_VIEW,
        ACTIONS.VIEW,
        ACTIONS.CANCELLATION,
        ACTIONS.SAMPLE_RECOLLECTION_APPROVAL,
        ACTIONS.RESCHEDULE,
      ],
    },
  ],
}
