'use client'

import { Formik, Form } from 'formik'
import TextInput from '../common/Input/TextInput'
import useSWRMutation from 'swr/mutation'
import { mutater } from '@/lib/fetchers'
import { REFERRAL_USER } from '@/lib/endpoints'
import { usePopup } from '@/lib/contexts/PopupContext'
import SelectInput from '../common/Input/SelectInput'
import { referType } from '@/utils/constents'
import DashLoader from '../common/DashLoader'

export default function ReferralForm() {
  const { showSuccess, showError } = usePopup()
  const initialValues = {
    name: '',
    email: '',
    referralRole: '',
  }

  const { trigger: submitReferralForm, isMutating: isSubmitting } = useSWRMutation(
    REFERRAL_USER,
    mutater<any, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <div className="flex justify-center p-6">
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 max-w-[650px] w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Referral Form</h2>
        <p className="text-gray-600 text-center text-sm mt-2">Help us grow by referring someone you admire</p>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            submitReferralForm(values)
          }}
        >
          <Form className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-1">
              <SelectInput name="userRole" label="Who you want to refer?" options={referType} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              <TextInput name="name" label="Name" placeholder="Enter Name" />
              <TextInput name="email" label="Email" placeholder="Enter Email" type="email" />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-8 py-3 font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              >
                {isSubmitting ? <DashLoader color="white" /> : 'Submit'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
