import React from 'react'

export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className="bg-white hover:bg-brand-500 hover:text-white text-brand-500 border-[2px] border-brand-500 px-4 py-1 rounded-md mr-2"
      onClick={onClose}
    >
      Close
    </button>
  )
}
