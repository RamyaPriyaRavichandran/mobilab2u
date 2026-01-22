'use client'

import {
  BanknotesIcon,
  BeakerIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import type { CustomerTestDetailsInterface, Package } from './CustomerTestDetailsInterface'
import { findFromOptions, getLatestStatus, sliceDate } from '@/utils/functions'
import TextContainer from '@/components/common/TextContainer'
import { customerTestStatus, serviceType, type } from '@/utils/constents'
import { useAuth } from '@/lib/contexts/AuthContext'

// Helper function to format date with time
const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  const formattedDate = date.toISOString().slice(0, 10).split('-').reverse().join('-')
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return `${formattedDate} || ${formattedTime}`
}

export default function OrderDetail({ data }: { data: CustomerTestDetailsInterface }) {
  console.log('OrderDetail data:', data) // Debugging line to check the data being passed
  return (
    <section>
      <h2 className="font-semibold text-lg underline">Order details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-2 ">
        <PackageDetail plan={data.packages || {}} members={data.members || []} />{' '}
        <TextContainer Icon={CreditCardIcon} label="Payment Status" value={data?.payment?.paymentStatus || '-'} />
        <TextContainer
          Icon={QuestionMarkCircleIcon}
          label="Test Status"
          value={findFromOptions(customerTestStatus, getLatestStatus(data?.statusTransaction))}
        />
        <TextContainer Icon={CalendarDaysIcon} label="Test Booking Date" value={formatDateTime(data.createdAt)} />
        <TextContainer
          Icon={CalendarDaysIcon}
          label="Appoinment Date"
          value={sliceDate(data.customerAppointmentDate)}
        />
        <TextContainer Icon={ClockIcon} label="Appoinment Time" value={data.customerAppointmentTime} />
        <TextContainer Icon={MapPinIcon} label="Sample Taken Address" value={data?.customerAddress?.address} />
        <TextContainer Icon={MapPinIcon} label="Sample Taken City" value={data?.customerAddress?.city} />
        <TextContainer Icon={MapPinIcon} label="Sample Taken State" value={data?.customerAddress?.state} />
        <TextContainer Icon={MapPinIcon} label="Sample Taken Pincode" value={data?.customerAddress?.postCode} />
        <TextContainer Icon={CalendarDaysIcon} label="Approved Date" value={formatDateTime(data?.spApprovedDate)} />
        <TextContainer
          Icon={CalendarDaysIcon}
          label="Sample Submitted Date"
          value={formatDateTime(data?.sampleSubmittedDate)}
        />
        <TextContainer
          Icon={CalendarDaysIcon}
          label="Sample Collected Date"
          value={formatDateTime(data?.sampleCollectedDate)}
        />
        <TextContainer
          Icon={CalendarDaysIcon}
          label="Report Submitted Date"
          value={formatDateTime(data?.reportSubmittedDate)}
        />
      </div>
      {data.cancellationReason && (
        <div className="mt-4">
          <p className="text-red-600">
            Cancel Reason : <span className="text-black">{data.cancellationReason}</span>
          </p>
        </div>
      )}
    </section>
  )
}

function PackageDetail({ plan, members }: { plan: Package | Record<string, never>; members: any[] }) {
  const { roles } = useAuth()

  return (
    <>
      <TextContainer Icon={ClipboardDocumentListIcon} label="Package Name" value={plan.name} />
      <TextContainer Icon={ClipboardDocumentListIcon} label="Package Type" value={findFromOptions(type, plan.type)} />
      {plan.type === 'FAMILY' && (
        <TextContainer Icon={UserGroupIcon} label="Package Members" value={plan.members || 0} />
      )}
      {plan.type === 'FAMILY' && (
        <TextContainer Icon={UserGroupIcon} label="Test Booked Members" value={members?.length} />
      )}
      <TextContainer
        Icon={BeakerIcon}
        label="Package Service Type"
        value={findFromOptions(serviceType, plan.serviceType)}
      />
      {roles === 'LAB_USER' ? null : (
        <TextContainer Icon={BanknotesIcon} label="Package Price" value={plan.offerPrice} />
      )}
    </>
  )
}
