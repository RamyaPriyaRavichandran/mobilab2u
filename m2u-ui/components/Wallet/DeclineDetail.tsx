import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

export default function DeclineDetail({ showDeclineDetail, onClose }: any) {
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Decline Details</h2>

        {/* Decline Details */}
        <div>{showDeclineDetail.declineNotes}</div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className=" mt-4 w-full text-gray-500 hover:text-gray-700 text-sm transition duration-300"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  )
}
