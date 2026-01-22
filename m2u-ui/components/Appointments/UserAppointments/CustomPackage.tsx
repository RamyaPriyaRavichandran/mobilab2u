'use client'

import GreenTickSVG from '@/components/common/SVG/GreenTickSVG'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Image from 'next/image'
import { motion } from 'framer-motion'
import InstructionPopup from '@/components/Customers/CustomerPackages/InstructionPopup'

export default function CustomPackage({
  testData = {},
  onClose,
  setpurchaseFollowupTest,
  purchaseFollowupTest,
  appointmentId,
}: any) {
  const [instruction, setInstruction] = useState({ popup: false, description: '' })
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)

  // Default placeholder image when no image is available
  const placeholderImage = '/images/pack6.jpeg'
  console.log('testData', testData)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 scroll-auto">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-50 shadow-lg rounded-lg p-10 w-full max-w-2xl max-h-[95vh] overflow-y-auto"
      >
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Title and Price Section */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{testData.name || 'Package'}</h3>
          </div>
          {/* Card Layout */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: Image Section */}
            <div className="relative w-full md:w-auto">
              <Image
                width={200}
                height={200}
                src={testData.image?.s3URL || placeholderImage}
                alt={testData.name || 'Package'}
                className="h-48 w-48 object-cover rounded-xl border-2 border-gray-100"
              />
              <div className="absolute top-2 right-2 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {testData.serviceType || 'Service'}
              </div>
            </div>

            {/* Right: Package Details */}
            <div className="flex-1 w-full">
              {/* Features List */}
              <div className="bg-gray-50 min-h-[170px] max-h-[190px] overflow-y-scroll p-4 rounded-lg shadow-inner">
                <ul className="space-y-3 text-sm text-gray-700">
                  {testData.type && (
                    <li className="flex space-x-2 items-center">
                      <GreenTickSVG />
                      <p>{testData.type}</p>
                    </li>
                  )}
                  {testData.duration && (
                    <li className="flex space-x-2 items-center">
                      <GreenTickSVG />
                      <p className="font-bold">Duration :</p>
                      <p>{testData.duration}</p>
                    </li>
                  )}
                  {testData.fastingHour && (
                    <li className="flex space-x-2 items-center">
                      <GreenTickSVG />
                      <p className="font-bold">Fasting Hour :</p>
                      <p>{testData.fastingHour}</p>
                    </li>
                  )}
                  {/* View Details */}
                  {testData?.document?.s3URL && (
                    <li className="flex space-x-2 items-center">
                      <GreenTickSVG />
                      <a
                        href={testData.document.s3URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-500 font-medium underline hover:text-brand-600"
                      >
                        View Details
                      </a>
                    </li>
                  )}
                  {/* Special Instruction */}
                  {testData.description && (
                    <li className="flex space-x-2 items-center">
                      <GreenTickSVG />
                      <div
                        onClick={() => setInstruction({ popup: true, description: testData.description })}
                        className="text-brand-500 font-medium hover:cursor-pointer underline hover:text-brand-600"
                      >
                        Special Instruction
                      </div>
                    </li>
                  )}

                  {/* Home Service */}
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    <span>Available at Home</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Discount Badge */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-3">
              <p className="text-3xl font-extrabold text-brand-600">RM {testData.offerPrice || 0}</p>
              <p className="text-sm text-gray-500 line-through">RM {testData.price || 0}</p>
            </div>
            {testData.price && testData.offerPrice && (
              <div className="bg-green-500 text-white text-xs mt-2 font-bold px-3 h-[22px] py-1 rounded-full shadow-md">
                {Math.round(((testData.price - testData.offerPrice) / testData.price) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Buy Now Button */}
          <button
            onClick={() => {
              setpurchaseFollowupTest({ popup: true, appoinmentId: appointmentId })
              onClose()
            }}
            className="w-full mt-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-brand-700 hover:to-brand-600 transition-all"
          >
            Buy Now
          </button>
          <button
            onClick={() => onClose()}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 transition duration-300 text-sm"
          >
            Close
          </button>
        </div>
        <div>{instruction.popup && <InstructionPopup setInstruction={setInstruction} instruction={instruction} />}</div>
      </motion.div>
    </div>
  )
}
