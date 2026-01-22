import { ACTIONS, ROLES, SUBJECTS } from '../../../lib/permissions'

export const labPerms = {
  roleId: ROLES.LAB_USER,
  perms: [
    {
      subject: SUBJECTS.Lab,
      actions: [ACTIONS.VIEW, ACTIONS.UPDATE],
    },
    {
      subject: SUBJECTS.Test,
      actions: [
        ACTIONS.VIEW,
        ACTIONS.VIEW_ALL,
        ACTIONS.UPLOAD_TEST_REPORTS,
        ACTIONS.REVIEW,
      ],
    },
    {
      subject: SUBJECTS.User,
      actions: [ACTIONS.VIEW],
    },
    {
      subject: SUBJECTS.Wallet,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.WITHDRAW_AMOUNT],
    },
  ],
}
