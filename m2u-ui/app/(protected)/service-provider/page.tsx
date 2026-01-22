import CanCheck from '@/components/common/CanCheck'
import ListMain from '@/components/ServiceProvider/ListMain'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'

export default async function page() {
  return (
    <CanCheck I={ACTIONS.REVIEW} a={SUBJECTS.ServiceProvider}>
      <ListMain />
    </CanCheck>
  )
}
