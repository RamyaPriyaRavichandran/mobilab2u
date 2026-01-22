'use client'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { BanknotesIcon, ClipboardDocumentListIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import StatusBadge from '@/components/common/Badges/StatusBadge'

import { motion } from 'framer-motion'

import CloseButton from '@/components/common/Buttons/CloseButton'
import { getLatestStatus } from '@/utils/functions'
import TextCointainer from '@/components/common/TextContainer'
import { INPUT_REQUIRED, labTestTimeSlots } from '@/utils/constents'
import * as Yup from 'yup'
import OrderDetail from '../Customers/Orders/OrderDetail'
import MemberTable from '../Customers/Orders/MembersTable'

const sampleRecollectionApprovalSchema = Yup.object().shape({
  customerAppointmentDate: Yup.string().required(INPUT_REQUIRED),
  customerAppointmentTime: Yup.string().required(INPUT_REQUIRED),
  testId: Yup.string().required(INPUT_REQUIRED),
})
export default function CustomerTestDetails({
  setForm,
  form: { data },
  view,
  setView,
  sampleRecollectionApproval,
  sampleRecollectionLoading,
}: {
  setView: Dispatch<SetStateAction<string>>
  view: string
  setForm: any
  form: { data: any }
  sampleRecollectionApproval: (values: {
    customerAppointmentDate: string
    customerAppointmentTime: string
    testId: string
  }) => void
  sampleRecollectionLoading: boolean
}) {
  const modalRef = useRef(null)
  const handleClickOutside = () => {
    setForm({
      popup: false,
      data: {},
    })
  }
  useOnClickOutside(modalRef, handleClickOutside)
  const approvedSPorGP = data.approvedServiceProvider?._id || data.approvedGpPartner?._id
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[90%] md:max-w-[950px] mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden max-h-[95vh] overflow-y-auto"
      >
        <div className="px-6 py-8">
          <div className="md:flex space-x-2">
            <p className="text-2xl font-bold text-left mb-4">Customer Purchased Package Details - </p>
            <div className="mt-1 md:mt-0">{StatusBadge(getLatestStatus(data.statusTransaction))}</div>
          </div>
          <OrderDetail data={data || {}} />
          <section>
            <h2 className="font-semibold text-lg underline">Splitting Share Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-2 ">
              <TextCointainer Icon={BanknotesIcon} label="Package Price" value={data?.packages?.offerPrice || '-'} />
              <TextCointainer Icon={BanknotesIcon} label="HSP Share" value={data?.packages?.hspShare || '-'} />
              <TextCointainer Icon={BanknotesIcon} label="Lab Share" value={data?.packages?.labShare || '-'} />
              <TextCointainer Icon={BanknotesIcon} label="Mobilab Share" value={data?.packages?.mobilabShare || '-'} />

              {data?.packages?.gpShare && (
                <TextCointainer Icon={BanknotesIcon} label="GP Share" value={data?.packages?.gpShare || '-'} />
              )}
              <TextCointainer
                Icon={BanknotesIcon}
                label="Customer Share"
                value={data?.packages?.customerShare || '-'}
              />
            </div>
          </section>
          <MemberTable members={data.members || []} /> {/* Reports */}
          {data.reports?.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg underline mt-4">Reports</h2>

              <div className="mt-2 grid grid-cols-3">
                {data?.reports.map((ob: { s3URL: string; originalFileName: string }, index: number) => (
                  <div key={index} className="flex cursor-pointer space-x-2">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-brand-400" />
                    <div>
                      <a href={ob.s3URL} target="_blank" key={index}>
                        {ob.originalFileName.split('.')[0]}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="flex gap-2 justify-end mt-6 mr-8">
            <CloseButton onClose={() => setForm({ popup: false, data: {} })} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
