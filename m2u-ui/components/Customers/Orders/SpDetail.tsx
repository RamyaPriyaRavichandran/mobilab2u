import { ServiceProvider } from './CustomerTestDetailsInterface'
import { state } from '@/utils/constents'
import { EnvelopeIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { findFromOptions } from '@/utils'
import TextCointainer from '@/components/common/TextContainer'
import { city } from '@/utils/constents/constantsCity'

export default function SpDetail({ sp }: { sp: ServiceProvider }) {
  return (
    <section>
      <h2 className="font-semibold text-lg underline mt-4">
        {sp.userRole === 'GP_PARTNER' ? 'GP Partner' : 'Service Provider'} details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-2 ">
        <TextCointainer Icon={UserCircleIcon} label="Name" value={sp.name} />
        <TextCointainer Icon={PhoneIcon} label="Phone" value={sp.phone} />
        <TextCointainer Icon={EnvelopeIcon} label="Email" value={sp.email} />
        <TextCointainer Icon={MapPinIcon} label="Address" value={sp.address} />
        <TextCointainer Icon={MapPinIcon} label="State" value={sp.state} />
        <TextCointainer Icon={MapPinIcon} label="City" value={sp.city} />
        <TextCointainer Icon={MapPinIcon} label="Postcode" value={sp.postCode} />
      </div>
    </section>
  )
}
