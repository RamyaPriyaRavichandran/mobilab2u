import CanCheck from '@/components/common/CanCheck'
import CustomerPurchasedTests from '@/components/Customers/PurchasedPackages'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function index() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Lab}>
      <CustomerPurchasedTests />
    </CanCheck>
  )
}
