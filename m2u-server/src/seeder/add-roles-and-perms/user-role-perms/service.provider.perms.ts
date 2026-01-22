import { ACTIONS, ROLES, SUBJECTS } from '../../../lib/permissions'

export const serviceProviderPerms = {
  roleId: ROLES.SERVICE_PROVIDER,
  perms: [
    {
      subject: SUBJECTS.ServiceProvider,
      actions: [ACTIONS.VIEW, ACTIONS.UPDATE, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.User,
      actions: [ACTIONS.VIEW, ACTIONS.PROFILE_UPDATE],
    },
    {
      subject: SUBJECTS.Test,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL, ACTIONS.REVIEW],
    },
    {
      subject: SUBJECTS.Lab,
      actions: [ACTIONS.VIEW, ACTIONS.VIEW_ALL],
    },
    {
      subject: SUBJECTS.Payment,
      actions: [
        ACTIONS.PAY_SERVICE_PROVIDER_FEE,
        ACTIONS.VIEW_ALL,
        ACTIONS.VIEW,
      ],
    },
    {
      subject: SUBJECTS.Wallet,
      actions: [ACTIONS.VIEW_ALL, ACTIONS.VIEW, ACTIONS.WITHDRAW_AMOUNT],
    },
  ],
}
