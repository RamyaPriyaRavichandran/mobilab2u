import CustomerPurchasedPackageDetails from '@/components/Customers/PurchasedPackages/Detail'
import CanCheck from '@/components/common/CanCheck'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
export default function CustomerPurchasedPackagePage() {
  return (
    <CanCheck I={ACTIONS.VIEW_ALL} a={SUBJECTS.Lab}>
      <CustomerPurchasedPackageDetails />
    </CanCheck>
  )
}
