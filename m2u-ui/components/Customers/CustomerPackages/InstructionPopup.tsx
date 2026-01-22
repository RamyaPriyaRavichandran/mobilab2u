'use client'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { motion } from 'framer-motion'

export default function InstructionPopup({
  setInstruction,
  instruction,
}: {
  setInstruction: Dispatch<SetStateAction<{ popup: boolean; description: string }>>
  instruction: { popup: boolean; description: string }
}) {
  const handleClose = () => setInstruction({ popup: false, description: '' })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 scroll-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white shadow-lg m-2 max-w-[600px] rounded-lg p-4 min-h-[200px] max-h-[95vh] overflow-y-auto relative"
      >
        <div onClick={() => handleClose()} className="flex justify-end cursor-pointer">
          <p className="">X</p>
        </div>

        <h2 className="font-bold text-lg">Special Instruction</h2>
        <p className="mt-2">{instruction.description}</p>
      </motion.div>
    </div>
  )
}
