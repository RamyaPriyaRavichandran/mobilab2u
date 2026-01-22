import { useAuth } from '@/lib/contexts/AuthContext'
import {
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { findFromOptions } from '@/utils'
import { gender, USER_ROLES } from '@/utils/constents'
import TextContainer from '@/components/common/TextContainer'

export default function CustomerDetail({ customer = {} }: { customer: any }) {
  const { roles } = useAuth()
  return (
    <section>
      <h2 className="font-semibold text-lg underline mt-4">Customer details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-2 ">
        <TextContainer Icon={UserCircleIcon} label="Customer Name" value={customer?.name} />

        <TextContainer Icon={UserGroupIcon} label="Gender" value={findFromOptions(gender, customer?.gender)} />

        {roles !== USER_ROLES.LAB_USER && (
          <>
            <TextContainer Icon={UserGroupIcon} label="Phone" value={customer?.phone} />
            <TextContainer Icon={EnvelopeIcon} label="Email" value={customer?.email} />
          </>
        )}
        <TextContainer Icon={IdentificationIcon} label="NRIC Number" value={customer?.nricNumber} />

        {roles === 'SUPER_ADMIN' && (
          <>
            <TextContainer Icon={MapPinIcon} label="Address" value={customer?.customerAddress?.address} />
            <TextContainer Icon={MapPinIcon} label="State" value={customer?.customerAddress?.state} />
            <TextContainer Icon={MapPinIcon} label="City" value={customer?.customerAddress?.city} />
            <TextContainer Icon={MapPinIcon} label="Postcode" value={customer?.customerAddress?.postCode} />
          </>
        )}
      </div>
    </section>
  )
}
