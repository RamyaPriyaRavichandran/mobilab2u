'use client'

import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import { useAuth } from '@/lib/contexts/AuthContext'
import { USER_ROLES } from '@/utils/constents'
import { X, Download } from 'lucide-react'
import CloseButton from '../CloseButton'

export default function ReferralLetter({
  onClose,
  referralData = {},
  appointmentDate,
  isEdit = true,
  doctorName,
  doctorSign,
}: any) {
  const modalRef = useRef(null)
  const { roles } = useAuth()

  const ref = useRef<HTMLDivElement>(null)
  const handleExport = async () => {
    if (ref.current) {
      const dataUrl = await toPng(ref.current, { cacheBust: true })
      download(dataUrl, 'referral.png')
    }
  }
  return (
    <div className={!isEdit ? `fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-auto` : ''}>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={!isEdit ? `bg-white shadow-xl m-4 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto` : ''}
      >
        {!isEdit && (
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
            <h2 className="text-xl font-bold text-gray-800">Referral Letter</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        )}

        <div className={!isEdit ? 'p-6' : ''}>
          <div ref={ref} className="max-w-4xl bg-white mx-auto p-6 border border-gray-300 shadow-md rounded-md">
            {/* Header with logo and clinic info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl font-bold text-blue-800">KLINIK BAKTI</h1>
                <p className="text-sm text-gray-700 mt-1">
                  A-0.19, Blok A Sri Penara, Jalan Sri Permaisuri 1,
                  <br />
                  Bandar Sri Permaisuri, 56000 Cheras, Kuala Lumpur.
                </p>
                <p className="text-sm text-gray-700 mt-1 flex items-center gap-1">
                  <span>📞 03-9174 4604 / 019-2154 604</span>
                  <span className="mx-1">•</span>
                  <span>📧 klinikbakticheras@gmail.com</span>
                </p>
              </div>
              <Image src="/svgs/logo-m2u.svg" alt="MobiLab2U" className="h-16" width={100} height={100} />
            </div>

            <hr className="border-gray-300 mb-6" />

            {/* Date */}
            <div className="mb-6 text-sm text-gray-700">
              <p className="font-medium">
                <span className="inline-block w-16">Date:</span>{' '}
                {appointmentDate?.slice(0, 10)?.split('-')?.reverse()?.join('-')}
              </p>
            </div>

            {/* Letter Title */}
            <div className="mb-6">
              <h2 className="text-center font-bold text-xl text-blue-800 border-b-2 border-blue-800 pb-2 mx-auto w-fit">
                Referral Letter
              </h2>
            </div>

            {/* Letter Body */}
            <div className="space-y-5">
              <p className="text-gray-800">Dear Dr.,</p>
              <p className="text-gray-800">Thank you for seeing this patient.</p>

              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <div className="mb-3">
                  <p className="font-semibold text-gray-800">Complaint:</p>
                  <p className="text-gray-700 mt-1">{referralData.complaint || 'N/A'}</p>
                </div>

                <div className="mb-3">
                  <p className="font-semibold text-gray-800">Findings:</p>
                  <p className="text-gray-700 mt-1">{referralData.findings || 'N/A'}</p>
                </div>

                <div className="mb-3">
                  <p className="font-semibold text-gray-800">Investigation:</p>
                  <p className="text-gray-700 mt-1">{referralData.investigation || 'N/A'}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Management:</p>
                  <p className="text-gray-700 mt-1">{referralData.management || 'N/A'}</p>
                </div>
              </div>

              <p className="text-gray-800">Thank you.</p>
            </div>

            {/* Footer with signature */}
            <div className="mt-12">
              <p className="text-gray-800">Yours Sincerely,</p>
              <div className="mt-8 mb-2">
                {doctorSign && (
                  <Image
                    height={60}
                    width={150}
                    src={doctorSign || '/placeholder.svg'}
                    alt="doctor-e-sign"
                    className="mb-1"
                  />
                )}
                <div className="border-t border-gray-400 w-40 pt-1">
                  <p className="font-medium">{doctorName || referralData?.doctor?.name}</p>
                  <p className="text-sm text-gray-700">MMC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {roles === USER_ROLES.CUSTOMER && (
              <>
                <button
                  type="button"
                  onClick={handleExport}
                  className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-700 border-2 border-gray-300 px-4 py-2 rounded-md font-medium transition-colors"
                  onClick={onClose}
                >
                  Close
                </button>
              </>
            )}
            {roles === USER_ROLES.SUPER_ADMIN && <CloseButton onClose={onClose} />}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
