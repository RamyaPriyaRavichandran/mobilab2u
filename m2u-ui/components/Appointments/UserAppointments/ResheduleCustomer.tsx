'use client'

import type React from 'react'
import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { Form, Formik } from 'formik'
import { CalendarIcon, ChevronLeft, Clock, Loader2, RefreshCcw } from 'lucide-react'

import {
  GET_CUSTOMER_APPOINTMENT,
  GET_CUSTOMER_APPOINTMENT_BY_DOCTOR_AVAILABILITY,
  POST_CUSTOMER_RESCHEDULE_APPOINTMENT,
} from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'

import AppointmentDetail from '../AppointmentDetail'
import type { DoctorAppointment } from '../types'
import type { DoctorAvailability } from '@/components/Customers/CustomerPackages/interface'

export default function ResheduleCustomer() {
  const { id } = useParams()
  const router = useRouter()
  const [dateStr, setDateStr] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<DoctorAvailability | null>(null)
  const { showSuccess, showError } = usePopup()

  const { data: appointmentDetail = {} as DoctorAppointment, isLoading: isAppointmentLoading } = useSWR(
    `${GET_CUSTOMER_APPOINTMENT}/${id}`,
    fetcher<DoctorAppointment>()
  )

  const {
    data: availableSlots = {} as any,
    isLoading: isSlotsLoading,
    mutate: refreshSlots,
  } = useSWR(
    `${GET_CUSTOMER_APPOINTMENT_BY_DOCTOR_AVAILABILITY}/${id}?${dateStr ? `date=${dateStr}` : ''}`,
    fetcher<any>()
  )
  const { trigger: bookAppointment, isMutating } = useSWRMutation(
    `${POST_CUSTOMER_RESCHEDULE_APPOINTMENT}/${id}`,
    mutater<any, { appointmentId: string; doctorLanguage: string; slotId: string; message?: string }>('POST'),
    {
      onSuccess: ({ data }) => {
        showSuccess(data?.message || 'Appointment updated')
        router.back()
      },
      onError: ({ response }) => {
        showError(response?.data?.message || 'Something went wrong')
      },
      throwOnError: false,
    }
  )

  const doctorLanguage = availableSlots?.appointment?.doctorLanguage || appointmentDetail?.doctorLanguage || ''
  const selectedSlotId = selectedSlot?.slotId || ''

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => router.back()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Re-Schedule Appointment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Choose a new date and time. Your details remain the same.</p>
        </div>
      </div>

      {/* Appointment Details */}
      <section className="rounded-xl border bg-white">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-gray-700">
              {appointmentDetail?.status ? `Status: ${appointmentDetail.status}` : 'Status: —'}
            </span>
            {doctorLanguage ? (
              <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                Language: {doctorLanguage}
              </span>
            ) : null}
            {appointmentDetail?.doctorName ? (
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-gray-700">
                Doctor: {appointmentDetail.doctorName}
              </span>
            ) : null}
          </div>
        </div>
        <div className="h-px w-full bg-gray-100" />
        <div className="p-4 sm:p-6">
          <AppointmentDetail
            appointmentDetails={appointmentDetail}
            isAppointmentDone={appointmentDetail?.status === 'DONE' || appointmentDetail?.status === 'APPROVED'}
            isLoading={isAppointmentLoading}
          />
        </div>
      </section>

      {/* Date + Slots */}
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Date Picker (native) */}
        <div className="rounded-xl border bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Select date</h3>
            <button
              type="button"
              onClick={() => {
                setDateStr('')
                setSelectedSlot(null)
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Reset
            </button>
          </div>

          <div className="mt-3">
            <label htmlFor="date" className="sr-only">
              Appointment date
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                value={dateStr}
                onChange={(e) => {
                  setDateStr(e.target.value)
                  setSelectedSlot(null)
                }}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Pick a date to load available time slots.</p>
          </div>
        </div>

        {/* Slots */}
        <div className="rounded-xl border bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Available time slots</h3>
            </div>
            <button
              type="button"
              onClick={() => refreshSlots()}
              disabled={!dateStr || isSlotsLoading}
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>

          {!dateStr ? (
            <EmptyState
              icon={<CalendarIcon className="h-6 w-6 text-gray-400" />}
              title="No date selected"
              description="Choose a date to see available slots."
            />
          ) : isSlotsLoading ? (
            <SlotsSkeleton />
          ) : (
            <TimeSlotPicker
              selectedSlotId={selectedSlotId}
              availableSlots={availableSlots?.doctorAvailability || []}
              onSelect={(s) => setSelectedSlot(s)}
            />
          )}
        </div>
      </section>

      {/* Submit bar */}
      <Formik
        enableReinitialize
        initialValues={{
          appointmentId: String(id),
          slotId: selectedSlotId,
          doctorLanguage: doctorLanguage || '',
        }}
        onSubmit={async (values) => {
          await bookAppointment(values)
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          if (values.slotId !== selectedSlotId) setFieldValue('slotId', selectedSlotId)

          return (
            <Form onSubmit={handleSubmit} className="">
              <div className="rounded-xl border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <div className="hidden sm:block rounded-md border p-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  {selectedSlot ? (
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {selectedSlot.startTime} – {selectedSlot.endTime}
                      </div>
                      <div className="text-gray-500">{dateStr ? humanDate(new Date(dateStr)) : '—'}</div>
                    </div>
                  ) : (
                    <div className="text-gray-500">Select a slot to continue</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isMutating || !values.slotId}
                    className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {isMutating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

/* TimeSlotPicker: native implementation with sorting and bucketing */
function TimeSlotPicker({
  selectedSlotId,
  availableSlots,
  onSelect,
}: {
  selectedSlotId: string
  availableSlots: DoctorAvailability[]
  onSelect: (slot: DoctorAvailability) => void
}) {
  const sorted = useMemo(() => {
    return [...(availableSlots || [])].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))
  }, [availableSlots.length])

  const buckets = useMemo(() => {
    const groups: Record<string, DoctorAvailability[]> = { Morning: [], Afternoon: [], Evening: [] }
    for (const s of sorted) {
      const m = toMinutes(s.startTime)
      if (m >= 5 * 60 && m < 12 * 60) groups['Morning'].push(s)
      else if (m >= 12 * 60 && m < 17 * 60) groups['Afternoon'].push(s)
      else groups['Evening'].push(s)
    }
    return groups
  }, [sorted])

  const sections = Object.entries(buckets).filter(([, arr]) => arr.length > 0)

  if (!sorted?.length) {
    return (
      <EmptyState
        icon={<Clock className="h-6 w-6 text-gray-400" />}
        title="No slots available"
        description="Try a different date or refresh to check again."
      />
    )
  }

  return (
    <div className="space-y-6 mt-4">
      {sections.map(([label, slots]) => (
        <div key={label} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium">
              {label}
            </span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {slots.map((slot) => {
              const selected = selectedSlotId === slot.slotId
              return (
                <button
                  key={slot.slotId}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(slot)}
                  className={[
                    'inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors',
                    selected
                      ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                      : 'hover:bg-emerald-50',
                  ].join(' ')}
                >
                  <span className="w-full text-center">
                    {slot.startTime} – {slot.endTime}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mb-2">{icon}</div>
      <div className="font-medium">{title}</div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  )
}

function SlotsSkeleton() {
  return (
    <div className="space-y-6 mt-4">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-9 w-full rounded-md bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* Utils */
function toMinutes(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return 0
  const hours = Number(match[1])
  const minutes = Number(match[2])
  const isPM = match[3].toUpperCase() === 'PM'
  const h24 = (isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours) % 24
  return h24 * 60 + minutes
}

function humanDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
