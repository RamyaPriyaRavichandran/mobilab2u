'use client'

import React, { useRef } from 'react'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'
import TextInput from '../common/Input/TextInput'
import NumberInput from '../common/Input/NumberInput'
import useSWRMutation from 'swr/mutation'
import * as Yup from 'yup'
import { mutater } from '@/lib/fetchers'
import DashLoader from '../common/DashLoader'
import { usePopup } from '@/lib/contexts/PopupContext'
import { EditFormInterface, UpdateProfileData } from './ServideProviderInterface'
import { ADMIN_UPDATE_SP_PROFILE } from '@/lib/endpoints'
import MyAutocomplete from '../Authentication/MyAutoComplete'
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  state: Yup.string().required('State is required').min(2, 'State is required'),
  city: Yup.string().required('City is required').min(2, 'City is required'),
  postCode: Yup.string()
    .required('Post code is required')
    .matches(/^\d{5}$/, 'Post code must be 5 digits'),
})
export default function UpdatePopup({ setShowPopup, initialData, mutate, setForm }: EditFormInterface) {
  const modalRef = useRef(null)
  const { showSuccess, showError } = usePopup()

  const { trigger: updateProfile, isMutating } = useSWRMutation(
    ADMIN_UPDATE_SP_PROFILE,
    mutater<UpdateProfileData, { message: string }>('PUT'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        mutate()
        setShowPopup(false)
        setForm({ popup: false, mode: null, data: {} })
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Update Information</h2>

        <Formik
          initialValues={{
            name: initialData?.name || '',
            phone: initialData?.phone || '',
            city: initialData?.city || '',
            state: initialData?.state || '',
            address: initialData?.address || '',
            userId: initialData?.userId || '',
            userRole: initialData?.userRole || '',
            postCode: initialData?.postCode || '',
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            updateProfile(values)
            setSubmitting(false)
          }}
        >
          {({ values, setFieldValue }) => (
            <FormValues
              values={values}
              setFieldValue={setFieldValue}
              setShowPopup={setShowPopup}
              isMutating={isMutating}
            />
          )}
        </Formik>
      </motion.div>
    </div>
  )
}

function FormValues({ values, setShowPopup, isMutating, setFieldValue }: any) {
  // const stateValue = values?.state
  // const cityOptions: any = city.filter((cities: any) => cities[stateValue])
  // const cityMain = cityOptions[0]?.[stateValue]

  return (
    <>
      <Form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput name="name" label="Name" placeholder="Enter Name" />
          <NumberInput name="phone" label="Phone" placeholder="Enter Phone Number" />
          <div className="md:col-span-2">
            <TextInput name="address" label="Address" placeholder="Enter Address" />
          </div>
          <div className="md:col-span-2">
            <MyAutocomplete setFieldValue={setFieldValue} />
          </div>
          <TextInput label="State" name="state" placeholder="Enter State" />
          <TextInput label="City" name="city" placeholder="Enter City" />
          <NumberInput label="Post Code" name="postCode" id="postCode" regex={/^\d{0,5}$/} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <button
            type="submit"
            disabled={isMutating}
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-md w-full sm:w-auto"
          >
            {isMutating ? <DashLoader /> : 'Update'}
          </button>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </Form>
    </>
  )
}
