import CanCheck from '@/components/common/CanCheck'
import Packages from '@/components/Customers/CustomerPackages'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default function page() {
  return (
    <CanCheck I={ACTIONS.PAY_LAB_TEST_PAYMENT} a={SUBJECTS.Payment}>
      <Packages />
    </CanCheck>
  )
}
