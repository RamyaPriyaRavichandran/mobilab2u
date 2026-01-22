import React from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PopupModalWrapper({
  children,
  onClose,
  open,
  width,
  height,
}: {
  children: React.ReactNode
  onClose: () => void
  open: boolean
  width?: string
  height?: string
}) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white overflow-hidden bg-opacity-90 p-6 m-2 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg ${width || 'max-w-lg'} `}
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition">
          <X size={20} />
        </button>
        <div className={`p-4 ${height || 'max-h-screen'}`}>{children}</div>
      </motion.div>
    </div>
  )
}
