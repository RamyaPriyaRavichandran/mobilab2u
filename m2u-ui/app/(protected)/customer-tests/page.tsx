import CanCheck from '@/components/common/CanCheck'
import CustomerOrders from '@/components/Customers/Orders'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default async function index() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Test}>
      <CustomerOrders />
    </CanCheck>
  )
}
