export default function StatusBadge(status?: string) {
  const badgeOptions: Record<string, { color: string; text: string }> = {
    SERVICE_PROVIDER_APPROVED: {
      color: 'text-blue-700 bg-blue-50 ring-blue-600/20',
      text: 'Order in Progress',
    },
    DECLINED: {
      color: 'text-red-700 bg-red-50 ring-red-600/20',
      text: 'Declined',
    },
    SAMPLE_SUBMITTED_TO_LAB: {
      color: 'text-indigo-700 bg-indigo-50 ring-indigo-600/20',
      text: 'Sample Submitted to Lab',
    },
    RE_COLLECTED_SAMPLE_SUBMITTED_TO_LAB: {
      color: 'text-indigo-700 bg-indigo-50 ring-indigo-600/20',
      text: 'Re-collected Sample Submitted to Lab',
    },
    LAB_ASSIGNED: {
      color: 'text-cyan-700 bg-cyan-50 ring-cyan-600/20',
      text: 'Assigned to Lab',
    },
    SAMPLE_COLLECTED: {
      color: 'text-orange-700 bg-orange-50 ring-orange-600/20',
      text: 'Sample Collected',
    },
    NEED_SAMPLE_RE_COLLECTION: {
      color: 'text-amber-700 bg-amber-50 ring-amber-600/20',
      text: 'Need Sample Re-collection',
    },
    SAMPLE_RE_COLLECTION_APPROVED: {
      color: 'text-amber-700 bg-amber-50 ring-amber-600/20',
      text: 'Sample Re-collection Approved',
    },
    SAMPLE_RE_COLLECTED: {
      color: 'text-orange-800 bg-orange-100 ring-orange-700/20',
      text: 'Sample Re-collected',
    },
    TEST_COMPLETED: {
      color: 'text-cyan-700 bg-cyan-50 ring-cyan-600/20',
      text: 'Test Completed',
    },
    PAYMENT_PENDING: {
      color: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
      text: 'Payment Pending',
    },
    PROCESSING: {
      color: 'text-yellow-800 bg-yellow-100 ring-yellow-700/20',
      text: 'Active Order',
    },
    REVIEW: {
      color: 'text-purple-700 bg-purple-50 ring-purple-600/20',
      text: 'Review',
    },
    APPROVED: {
      color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/20',
      text: 'Approved',
    },
    PAID: {
      color: 'text-green-800 bg-green-100 ring-green-700/20',
      text: 'Paid',
    },
    PENDING: {
      color: 'text-lime-700 bg-lime-50 ring-lime-600/20',
      text: 'Pending',
    },
    DOCTOR_CONSULTATION_DONE: {
      color: 'text-fuchsia-700 bg-fuchsia-50 ring-fuchsia-600/20',
      text: 'Consultation Done',
    },
    COMPLETED: {
      color: 'text-sky-700 bg-sky-50 ring-sky-600/20',
      text: 'Completed',
    },
    CANCELLED: {
      color: 'text-red-700 bg-red-50 ring-red-600/20',
      text: 'Cancelled',
    },
    DOCTOR_CONFIRMED: {
      color: 'text-cyan-700 bg-cyan-50 ring-cyan-600/20',
      text: 'Doctor Confirmed',
    },
  }

  const CurrentStatus = badgeOptions?.[status as string]

  return (
    <div
      className={`inline-flex justify-center items-center whitespace-nowrap rounded-full min-w-[130px] text-center px-2 py-[4px] text-xs font-medium ring-1 ring-inset leading-tight ${CurrentStatus?.color}`}
    >
      {CurrentStatus?.text || 'Unknown'}
    </div>
  )
}
