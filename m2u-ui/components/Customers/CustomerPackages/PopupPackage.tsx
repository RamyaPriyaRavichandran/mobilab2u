'use client'
import { findFromOptions } from '@/utils/functions'
import { type } from '@/utils/constents'
import { motion } from 'framer-motion'

import type { PopupPackageInterface } from '../CustomerInterface'
import DoctorBooking from './DoctorBooking'

import FamilyPackage from './FamilyPopup'

export default function PopupPackage({
  selectedPackage,
  isMutating,
  setPopup,
  payTestFees,
  payDoctorFees,
  feesMutating,
  errorMessage,
  clearError,
}: PopupPackageInterface & { errorMessage?: string; clearError?: () => void }) {
  const handleClose = () => setPopup({ popup: false, package: {} })

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      onClick={handleClose} // close when clicking backdrop
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white shadow-lg rounded-lg p-6 sm:p-10 m-2
             max-h-[90svh] overflow-y-auto ios-scroll"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedPackage?.serviceType === 'APPOINTMENT' ? (
          <DoctorBooking
            isMutating={feesMutating}
            setPopup={setPopup}
            selectedPackage={selectedPackage}
            payDoctorFees={payDoctorFees}
          />
        ) : (
          <div className="w-full max-w-2xl">
            <h3 className="text-xl font-extrabold text-center text-gray-800 mb-6 text-gradient bg-clip-text">
              {findFromOptions(type, selectedPackage?.type)}
            </h3>

            <div className="bg-brand-50 rounded-lg p-5 mb-8 shadow-md">
              {selectedPackage.type !== 'INDIVIDUAL' && (
                <div className="flex justify-between mb-4 border-b border-brand-200 pb-2">
                  <span className="font-semibold text-lg text-gray-800">Members</span>
                  <span className="text-lg text-gray-700">{selectedPackage.members}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="font-semibold text-lg text-gray-800">Price</span>
                <span className="text-lg text-gray-700">{selectedPackage.offerPrice}</span>
              </div>
            </div>

            <FamilyPackage
              isMutating={isMutating}
              payTestFees={payTestFees}
              setPopup={setPopup}
              selectedPackage={selectedPackage}
              errorMessage={errorMessage}
              clearError={clearError}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
