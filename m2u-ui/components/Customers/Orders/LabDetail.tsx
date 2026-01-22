import { LabDetail } from './CustomerTestDetailsInterface'
import { state } from '@/utils/constents'
import { city } from '@/utils/constents/constantsCity'
import { findFromOptions } from '@/utils'
import { BuildingLibraryIcon, BuildingOffice2Icon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import TextCointainer from '@/components/common/TextContainer'

export default function Lab({ lab }: { lab: LabDetail }) {
  return (
    <section>
      <h2 className="font-semibold text-lg underline mt-4">Lab details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-2 ">
        <TextCointainer Icon={BuildingOffice2Icon} label="Lab Name" value={lab?.name} />
        <TextCointainer Icon={BuildingLibraryIcon} label="Lab Organisation" value={lab?.organization} />
        <TextCointainer Icon={PhoneIcon} label="Lab Phone" value={lab?.phone} />
        <TextCointainer Icon={MapPinIcon} label="Lab Address" value={lab?.address} />
        <TextCointainer Icon={MapPinIcon} label="Lab State" value={lab?.state} />
        <TextCointainer Icon={MapPinIcon} label="Lab City" value={lab?.city} />
        <TextCointainer Icon={PhoneIcon} label="Lab Postcode" value={lab?.postCode} />
        <TextCointainer Icon={PhoneIcon} label="Recollection Reason" value={lab?.sampleRecollectionReason} />
      </div>
    </section>
  )
}
