import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import TextInput from '@/components/common/Input/TextInput'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import ReferralLetter from './ReferralLetter'
import { useOnClickOutside } from 'usehooks-ts'
import useSWRMutation from 'swr/mutation'
import { mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import { ADD_APPOINTMENT_REFERRAL } from '@/lib/endpoints'
import { useParams } from 'next/navigation'
import { ReferralFormInterface } from '../types'
import CloseButton from '../CloseButton'
import DashLoader from '@/components/common/DashLoader'
import { INPUT_REQUIRED } from '@/utils/constents'

export default function ReferralFormModal({
  onClose,
  referralFormData,
  mutate,
  doctorName,
  doctorSign,
}: {
  onClose: () => void
  doctorName: string
  mutate: () => void
  doctorSign: string
  referralFormData: ReferralFormInterface | undefined
}) {
  const referralFormSchema = Yup.object().shape({
    complaint: Yup.string().required(INPUT_REQUIRED),
    findings: Yup.string().required(INPUT_REQUIRED),
    investigation: Yup.string().required(INPUT_REQUIRED),
    management: Yup.string().required(INPUT_REQUIRED),
  })
  const { id } = useParams()
  const modelRef = useRef(null)

  useOnClickOutside(modelRef, onClose)

  const { showSuccess } = usePopup()
  const { trigger, isMutating } = useSWRMutation(
    `${ADD_APPOINTMENT_REFERRAL}/${id}`,
    mutater<ReferralFormInterface, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        onClose()
        mutate()
      },
      throwOnError: false,
    }
  )
  const [data, setData] = useState(false)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 scroll-auto">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-50 m-2 shadow-lg rounded-lg md:p-10 p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
      >
        <div>
          <Formik
            initialValues={{
              complaint: referralFormData?.complaint || '',
              findings: referralFormData?.findings || '',
              investigation: referralFormData?.investigation || '',
              management: referralFormData?.management || '',
            }}
            enableReinitialize
            validationSchema={referralFormSchema}
            onSubmit={(values: ReferralFormInterface) => {
              trigger(values)
            }}
          >
            {({ values, validateForm, setTouched }) => {
              return (
                <Form>
                  {data || referralFormData?.complaint ? (
                    <div>
                      <ReferralLetter doctorSign={doctorSign || ''} doctorName={doctorName} referalData={values} />
                      <div className="mt-4 space-x-4 text-right">
                        {!referralFormData?.doctor?._id ? (
                          <>
                            <button
                              type="button"
                              className="bg-white hover:bg-blue-500 text-md hover:text-white text-blue-500 border-[2px]  border-blue-500 px-4 py-1 rounded-md"
                              onClick={() => setData(!data)}
                            >
                              Edit Form
                            </button>
                            <button
                              disabled={!!referralFormData?.doctor?._id || isMutating}
                              className="bg-white hover:bg-green-500 hover:text-white text-green-500 border-[2px] border-green-500 px-4 py-1 rounded-md mr-2"
                              type="submit"
                            >
                              {isMutating ? 'Loading...' : 'Save'}
                            </button>
                          </>
                        ) : (
                          <CloseButton onClose={onClose} />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Referral Form</h2>
                      <div className="space-y-5">
                        <TextInput name="complaint" label="Compliant" />
                        <TextAreaInput name="findings" label="Findings" />
                        <TextInput name="investigation" label="Investigation" />
                        <TextInput name="management" label="Management" />
                      </div>
                      <div className="mt-4 text-right">
                        <CloseButton onClose={onClose} />

                        <button
                          type="button"
                          onClick={async () => {
                            const errors: any = await validateForm()
                            if (Object.keys(errors).length === 0) {
                              setData(!data)
                            } else {
                              setTouched(errors)
                            }
                          }}
                          className="bg-white hover:bg-purple-500 hover:text-white text-purple-500 border-[2px] border-purple-500 px-4 py-1 rounded-md mr-2"
                        >
                          view
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )
            }}
          </Formik>
        </div>
      </motion.div>
    </div>
  )
}
