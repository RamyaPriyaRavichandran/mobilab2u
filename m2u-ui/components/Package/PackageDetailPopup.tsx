import React, { useRef } from 'react'
import TextCointainer from '../common/TextContainer'
import { BeakerIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { findFromOptions } from '@/utils'
import { motion } from 'framer-motion'
import { serviceType, type } from '@/utils/constents'
import { BanknotesIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { useOnClickOutside } from 'usehooks-ts'

export default function PackageDetailPopup({ onClose, showPackageDetail }: any) {
  const plan = showPackageDetail.detail

  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8 overflow-hidden">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[650px] bg-gray-50 rounded-lg shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto p-6"
      >
        <h2 className="text-center text-lg font-semibold underline">Package Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mt-4">
          <TextCointainer Icon={ClipboardDocumentListIcon} label="Package Name" value={plan.name} />
          {plan.hspShare && (
            <TextCointainer
              Icon={ClipboardDocumentListIcon}
              label="Package Type"
              value={findFromOptions(type, plan.type)}
            />
          )}
          {plan.type === 'FAMILY' && (
            <TextCointainer Icon={UserGroupIcon} label="Package Members" value={plan.members} />
          )}
          <TextCointainer
            Icon={BeakerIcon}
            label="Package Service Type"
            value={findFromOptions(serviceType, plan.serviceType)}
          />
          <TextCointainer Icon={BanknotesIcon} label="Package Price" value={plan.price} />
          <TextCointainer Icon={BanknotesIcon} label="Offer Price" value={plan.offerPrice} />
          {plan.hspShare && (
            <>
              <TextCointainer Icon={BeakerIcon} label="Duration" value={plan.duration} />
              <TextCointainer Icon={BeakerIcon} label="Fasting Hours" value={plan.fastingHour} />
              <TextCointainer Icon={BanknotesIcon} label="HSP Share" value={plan.hspShare} />
              <TextCointainer Icon={BanknotesIcon} label="Lab Share" value={plan.labShare} />
            </>
          )}
          {plan.gpShare && <TextCointainer Icon={BanknotesIcon} label="GP Share" value={plan.gpShare} />}
          <TextCointainer Icon={BanknotesIcon} label="Customer Share" value={plan.customerShare} />
          <TextCointainer Icon={BanknotesIcon} label="MobiLab Share" value={plan.mobilabShare} />
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <TextCointainer label="Description :" value={plan.description} />
          </div>
        </div>
        <div className="mt-3">
          <h2 className="text-sm font-semibold">Attachments</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
            {plan.document && (
              <div className="flex space-x-1">
                <ClipboardDocumentListIcon className="h-5 w-5 text-brand-400 mr-2" />
                <a href={plan.document?.s3URL} target="_blank">
                  Document
                </a>
              </div>
            )}

            <div>
              <div className="flex space-x-1">
                <ClipboardDocumentListIcon className="h-5 w-5 text-brand-400 mr-2" />
                <a href={plan.image?.s3URL} target="_blank">
                  Logo
                </a>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm transition duration-300"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  )
}
