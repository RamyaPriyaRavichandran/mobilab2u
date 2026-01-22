'use client'

import { useRef, useState } from 'react'
import type { DoctorAppointment, Medicine, MedicineDetail } from '../types'
import { gender, USER_ROLES } from '@/utils/constents'
import { motion } from 'framer-motion'
import { findFromOptions } from '@/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useOnClickOutside } from 'usehooks-ts'
import useSWRMutation from 'swr/mutation'
import { mutater } from '@/lib/fetchers'
import { BUY_MEDICINE } from '@/lib/endpoints'
import { getAge, sliceDate } from '@/utils/functions'
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import { useAuth } from '@/lib/contexts/AuthContext'
import DashLoader from '@/components/common/DashLoader'
import { X } from 'lucide-react'
import CloseButton from '../CloseButton'

export default function Detail({
  medicine,
  onClose,
  appointmentDetails,
  followupDate,
  isEdit = true,
}: {
  medicine: MedicineDetail
  onClose?: () => void
  appointmentDetails: DoctorAppointment
  followupDate?: string | undefined
  isEdit?: boolean
}) {
  const modelRef = useRef(null)
  const { roles } = useAuth()
  console.log('medicine', medicine)
  const { id } = useParams()
  if (onClose) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnClickOutside(modelRef, onClose)
  }
  const { trigger: buyMedicine, isMutating } = useSWRMutation(
    `${BUY_MEDICINE}/${id}`,
    mutater<{ medicineId: string }, { stripeURL: string }>('POST'),
    {
      onSuccess: ({ data: { stripeURL = '' } }) => {
        window.location.href = stripeURL
      },
      throwOnError: false,
    }
  )

  const ref = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState<boolean>(roles === USER_ROLES.GP_PARTNER && true)

  const handleExport = async () => {
    setIsExporting(true)
    if (ref.current) {
      const dataUrl = await toPng(ref.current, { cacheBust: true })
      download(dataUrl, 'medicine.png')
    }
    setIsExporting(false)
  }
  const customerAge = getAge(appointmentDetails.customer.dateOfBirth)
  return (
    <div
      className={
        !isEdit ? `fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 scroll-auto` : ''
      }
    >
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={
          !isEdit ? `bg-white shadow-lg m-2 rounded-lg p-6 md:p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto` : ''
        }
      >
        <div className="max-w-3xl mx-auto border-2 rounded-md bg-brand-50 shadow-lg" ref={ref}>
          {/* Header */}
          <div className="bg-brand-200 flex justify-around py-4 border-b-2 ">
            <div>
              <Image src="/svgs/logo-m2u.svg" alt="MobiLab2U" className="h-20 w-24" width={100} height={100} />
            </div>
            <div className="mt-4 text-sm">
              <p>
                <span className="font-semibold">Dr.</span> {appointmentDetails?.approvedDoctor?.name}
              </p>
              <p>
                <strong>Degree: </strong> {appointmentDetails?.approvedDoctor?.medicalQualification || 'MBBS'}
              </p>
              <p>
                <strong>Medical Registration Number: </strong>{' '}
                {appointmentDetails.approvedDoctor.registerNumber || '77862'}
              </p>
              <p>
                <strong>Consultation Type:</strong> Online
              </p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">{appointmentDetails?.customer?.name}</p>
                <p>
                  {customerAge} Years, {findFromOptions(gender, appointmentDetails?.customer?.gender)}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Date: </strong>
                  {sliceDate(appointmentDetails.appointmentDate)}
                </p>
                <p className="text-sm ">
                  <strong>Time: </strong>
                  {appointmentDetails.selectedTimeSlot.startTime} - {appointmentDetails.selectedTimeSlot.endTime}
                </p>
              </div>
            </div>
          </div>
          {/* Vitals (As Declared by Patient) */}
          <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-2 ">
              <span className="underline">Vitals</span>(as declared by the patient)
            </h2>
            <div className="grid grid-cols-3 gap-1.5 text-sm">
              <p>
                <strong>Weight: </strong>
                {medicine.weight}kg
              </p>

              <p>
                <strong>Height: </strong>
                {medicine.height}cm
              </p>
              <p>
                <strong>Blood Pressure: </strong>
                {medicine.bloodPressure}mm/hg
              </p>
              <p>
                <strong>Heart Rate: </strong>
                {medicine.heartRate}bpm
              </p>
              <p>
                <strong>Temperature: </strong>
                {medicine.temperature}°C
              </p>
              <p>
                <strong>SpO2: </strong>
                {medicine.spO2}%
              </p>
              <p>
                <strong>CBG: </strong>
                {medicine.cbg}mmol/l
              </p>
            </div>
          </div>

          {/* Symptoms and Diagnosis */}
          <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-2 underline">PATIENT INSTRUCTION</h2>
            <div className="gap-4 space-y-5 text-sm">
              <div>
                <p>
                  <strong>Sx / Symptoms:</strong>
                </p>
                <p>{medicine.symptoms || 'N/A'}</p>
              </div>
              <div>
                <p>
                  <strong>Dx / Diagnosis:</strong>
                </p>
                <p>{medicine.diagnosis || 'N/A'}</p>
              </div>
            </div>
            <p className="mt-4">
              <strong>Allergies:</strong> {medicine.allergies || 'N/A'}
            </p>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 underline">Medical History:</h2>
            <p>{medicine.medicalHistory || 'N/A'}</p>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 underline">Virtual Assesment:</h2>
            <p>{medicine.virtualAssessment || 'N/A'}</p>
          </div>
          {/* Medicines */}
          <div className="p-4 overflow-x-auto">
            {medicine?.medicine?.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-4 underline">Rx / Medicines:</h2>
                <table className="w-full min-w-[600px] text-sm border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-center">#</th>
                      <th className="border p-2 text-center">Medicine</th>
                      <th className="border p-2 text-center">Dosage</th>
                      <th className="border p-2 text-center">Freq</th>
                      <th className="border p-2 text-center">Route</th>
                      <th className="border p-2 text-center">BF/AF</th>
                      <th className="border p-2 text-center">Duration</th>
                      {!isExporting && <th className="border p-2 text-center">Price</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {medicine.medicine.map((med: Medicine, index: number) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{index + 1}</td>
                        <td className="border p-2 text-center">{med.name}</td>
                        <td className="border p-2 text-center">{med.dosage}</td>
                        <td className="border p-2 text-center">{med.frequency}</td>
                        <td className="border p-2 text-center">{med.route}</td>
                        <td className="border p-2 text-center">{med.beforeOrAfterFood}</td>
                        <td className="border p-2 text-center">{med.duration}</td>
                        {!isExporting && <td className="border p-2 text-center">RM {med.price}</td>}
                      </tr>
                    ))}
                    {(medicine?.deliveryCharge ?? 0) > 0 && !isExporting && (
                      <tr>
                        <td className="border p-2 text-center" colSpan={7}>
                          Delivery Charge
                        </td>
                        <td className="border p-2 text-center">RM {medicine.deliveryCharge}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="p-4">
            {!isExporting && (
              <p className="mt-1 text-sm">
                <strong>Medicine Subtotal:</strong> RM{' '}
                {Number(medicine.medicine.reduce((sum: any, med: any) => sum + med.price, 0))}
              </p>
            )}
            {(medicine?.deliveryCharge ?? 0) > 0 && !isExporting && (
              <p className="mt-2 text-sm">
                <strong>Total Amount:</strong> RM{' '}
                {Number(medicine.medicine.reduce((sum: any, med: any) => sum + med.price, 0)) +
                  Number(medicine?.deliveryCharge || 0)}
              </p>
            )}
            <p className="mt-4 text-sm">
              <strong>Advice:</strong> {medicine.advice || 'N/A'}
            </p>
            <h1 className="mt-3 font-semibold">Follow up</h1>
            <p className="mt-1 text-sm">
              <strong>Date:</strong> {sliceDate(followupDate) || 'N/A'}
            </p>
            <p className="mt-4 text-sm">
              <strong>Note to Pharmacist:</strong> Substitution allowed for the same strength and formulation of
              generic/alternate brands only.
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-gray-600">
            <p>Signed By</p>
            <p className="font-bold">Dr.{appointmentDetails.customer.name}</p>
            <p>Reg. No: {appointmentDetails.approvedDoctor.registerNumber || '77862'}</p>
            <p className="mt-4">Powered by MobiLab2u</p>
          </div>
        </div>

        {roles === USER_ROLES.CUSTOMER && (
          <div className=" pt-2 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600 px-4 py-2 rounded-md font-medium transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>

              {medicine.payment?.paymentStatus === 'PAID' ? (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 bg-gray-200 text-gray-600 border-2 border-gray-300 px-4 py-2 rounded-md font-medium cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Purchased
                </button>
              ) : (
                medicine?.medicine.length > 0 && (
                  <button
                    disabled={isMutating}
                    onClick={() => buyMedicine({ medicineId: medicine._id as string })}
                    className="flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 border-2 border-green-600 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Purchase
                    </>
                  </button>
                )
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-400 px-4 py-2 rounded-md font-medium transition-colors"
              >
                <X size={16} />
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
