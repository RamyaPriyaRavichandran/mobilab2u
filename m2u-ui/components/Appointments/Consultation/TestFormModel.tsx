import React, { useRef } from 'react'
import { Formik, Form } from 'formik'
import TextInput from '@/components/common/Input/TextInput'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import { useOnClickOutside } from 'usehooks-ts'
import { motion } from 'framer-motion'
import useSWRMutation from 'swr/mutation'
import { mutater } from '@/lib/fetchers'
import { usePopup } from '@/lib/contexts/PopupContext'
import { ADD_APPOINTMENT_TEST } from '@/lib/endpoints'
import { useParams } from 'next/navigation'
import { FollowUpTestinterface, ReferralTestDataInterface } from '../types'
import CloseButton from '../CloseButton'
import DashLoader from '@/components/common/DashLoader'
import * as Yup from 'yup'
import { INPUT_REQUIRED } from '@/utils/constents'

export default function TestFormModal({
  onClose,
  followUpTest,
  mutate,
}: {
  onClose: () => void
  followUpTest: FollowUpTestinterface
  mutate: () => void
}) {
  const { id } = useParams()
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)
  const { showSuccess } = usePopup()
  const { trigger, isMutating } = useSWRMutation(
    `${ADD_APPOINTMENT_TEST}/${id}`,
    mutater<ReferralTestDataInterface, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } }) => {
        showSuccess(message)
        onClose()
        mutate()
      },
      throwOnError: false,
    }
  )
  const testSchema = Yup.object().shape({
    name: Yup.string().required(INPUT_REQUIRED),
    description: Yup.string().required(INPUT_REQUIRED),
  })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 scroll-auto">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-50 shadow-lg m-2 rounded-lg p-10 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">Test Form</h2>

        <div>
          <Formik
            initialValues={{
              name: followUpTest?.name || '',
              description: followUpTest?.description || '',
            }}
            validationSchema={testSchema}
            enableReinitialize
            onSubmit={(values: ReferralTestDataInterface) => {
              trigger(values)
            }}
          >
            {() => (
              <Form>
                <div className="space-y-5">
                  <TextInput name="name" label="Test Name" />
                  <TextAreaInput name="description" label="Test Description" />
                </div>

                <div className="mt-4 text-right">
                  <CloseButton onClose={onClose} />

                  {!followUpTest?.name && (
                    <button
                      type="submit"
                      disabled={!!followUpTest?.name || isMutating}
                      className="bg-white hover:bg-green-500 hover:text-white text-green-500 border-[2px] border-green-500 px-4 py-1 rounded-md h-9"
                    >
                      {isMutating ? 'Loading...' : 'Save'}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  )
}
