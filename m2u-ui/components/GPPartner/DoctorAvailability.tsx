'use client'
import { usePopup } from '@/lib/contexts/PopupContext'
import { ADD_DOCTOR_TIME_SLOT, GET_DOCTOR_TIME_SLOTS } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import { newTimeSlots, SELECT_AVAILABILITY_FOR_FUTURE_DATE, SELECT_FUTURE_DATE_AND_TIME } from '@/utils/constents'
import { getNextWeekDates } from '@/utils/functions'
import React, { Dispatch, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

interface TimeSlot {
  _id?: string
  date?: string
  startTime: string
  endTime: string
  key: number
  isBooked?: boolean
}

export default function DoctorAvailabilityCalender() {
  const { showSuccess, showError } = usePopup()
  const [availability, setAvailability] = useState<TimeSlot[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data, mutate } = useSWR(GET_DOCTOR_TIME_SLOTS, fetcher<Array<TimeSlot>>(), {
    onSuccess(data) {
      setAvailability(data)
    },
  })
  const { trigger: post, isMutating: postMutating } = useSWRMutation(
    ADD_DOCTOR_TIME_SLOT,
    mutater<{ availability: TimeSlot[] }, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  function addDoctorAvailability(availability: Array<TimeSlot>) {
    const addableAvailability = availability.filter((d) => d._id === undefined)
    return post({ availability: addableAvailability })
  }

  return (
    <>
      <AvailablityCalendarComponent
        setAvailability={setAvailability}
        availability={availability}
        postMutating={postMutating}
        slotTypes={['Selected Slots', 'Not Selected Slots', 'Saved Slots', 'Booked Slots']}
        slotColorType={[
          'bg-blue-600 text-white shadow-md px-2 rounded-md',
          'bg-white text-gray-700 shadow-md px-2 rounded-md',
          'bg-blue-900 shadow-md text-white px-2 rounded-md',
          'bg-green-700 shadow-md text-white px-2 rounded-md',
        ]}
        savedDatas={data}
        submitTimeSlot={(data) => addDoctorAvailability(data)}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </>
  )
}

function AvailablityCalendarComponent({
  submitTimeSlot,
  postMutating,
  setAvailability,
  availability,
  savedDatas,
  slotTypes,
  slotColorType,
  isSubmitted,
  setIsSubmitted,
}: {
  submitTimeSlot: (values: TimeSlot[]) => void
  setAvailability: Dispatch<SetStateAction<TimeSlot[]>>
  availability: TimeSlot[]
  postMutating: boolean
  slotTypes: Array<string>
  slotColorType: Array<string>
  savedDatas: TimeSlot[] | undefined
  isSubmitted: boolean
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
}) {
  const { showError } = usePopup()

  const isTodayDate = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState<string>(isTodayDate)
  const existingDate = (date: string, startTime: string, endTime: string) => {
    const existingDate = availability.find(
      (data) => data.date === date && startTime === data.startTime && data.endTime === endTime
    )
    return existingDate
  }
  const selectSlot = (date: string, slot: { startTime: string; endTime: string; key: number; isBooked: boolean }) => {
    const existingData = existingDate(date, slot.startTime, slot.endTime)
    if (existingData?.date) {
      const otherDateDatas = availability.filter((data) => data.date !== existingData.date)
      const updatableTimeSlots = availability.filter(
        (data) =>
          data.startTime !== existingData.startTime &&
          data.endTime !== existingData.endTime &&
          data.date === existingData.date
      )
      setAvailability([...updatableTimeSlots, ...otherDateDatas])
    } else {
      const addedTimeslot = [...availability, { ...slot }]
      setAvailability(addedTimeslot)
    }
  }

  const filteredAvailabilityTimeSlots = availability.filter(
    (d: any) => d._id && d.date.slice(0, 10) === selectedDate.slice(0, 10)
  )

  const newTimeSlot = newTimeSlots(selectedDate)
  const timeSlotMain = filteredAvailabilityTimeSlots.length > 0 ? filteredAvailabilityTimeSlots : newTimeSlot

  return (
    <div className="p-8 mt-5 bg-gray-100 rounded-lg shadow-lg max-w-[900px] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Set Availability for Next Week</h2>
      <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 border-b border-gray-300">
        {getNextWeekDates().map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDate(day.currentDate)}
            className={`px-4 py-2 min-w-[105px] rounded-lg text-sm font-semibold ${
              selectedDate === day.currentDate
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="block">{day.day}</span>
            <span className="block text-xs">{day.currentDate.split('-').reverse().join('-')}</span>
          </button>
        ))}
      </div>
      <div className="md:flex md:justify-around space-y-2 md:space-y-0 my-8">
        {slotTypes.map((t, idx) => (
          <p className={`px-2 py-2 rounded-md ${slotColorType[idx]}`} key={idx}>
            {t}
          </p>
        ))}
      </div>
      {selectedDate && (
        <div>
          <div className="flex justify-between my-4">
            <h3 className="text-lg font-medium text-gray-700">
              Time Slots for {selectedDate.replaceAll('-', '/').split('/').reverse().join('/')}
            </h3>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 max-h-[200px] overflow-y-scroll gap-4 m-2">
            {timeSlotMain.map((slot: any, idx: number) => {
              const color = existingDate(selectedDate, slot.startTime, slot.endTime)
                ? slotColorType[0]
                : slot._id && !slot.isBooked
                  ? slotColorType[2]
                  : slot._id && slot.isBooked
                    ? slotColorType[3]
                    : slotColorType[1]

              return (
                <button
                  key={idx}
                  disabled={slot._id || slot?.isBooked ? true : false}
                  onClick={() => {
                    if (isTodayDate >= selectedDate) {
                      showError(SELECT_FUTURE_DATE_AND_TIME)
                    } else selectSlot(selectedDate, slot)
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${color}`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        disabled={postMutating || filteredAvailabilityTimeSlots.length > 0}
        onClick={() => {
          if (isTodayDate >= selectedDate) {
            showError(SELECT_AVAILABILITY_FOR_FUTURE_DATE)
          } else {
            submitTimeSlot(availability)
            setIsSubmitted(true)
          }
        }}
        className={`mt-6 w-full ${
          postMutating || filteredAvailabilityTimeSlots.length > 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white py-3 rounded-lg font-semibold text-sm shadow transition-colors`}
      >
        Confirm Availability
      </button>
    </div>
  )
}
