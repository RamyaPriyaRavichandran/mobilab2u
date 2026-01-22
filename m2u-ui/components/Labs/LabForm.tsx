'use client'

import { type Dispatch, type SetStateAction, useRef } from 'react'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'
import TextInput from '../common/Input/TextInput'
import PasswordInput from '../common/Input/PasswordInput'
import NumberInput from '../common/Input/NumberInput'
import SelectInput from '../common/Input/SelectInput'
import { state } from '@/utils/constents'
import city from '@/utils/constents/stateCity.json'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { GET_LABS, LAB_CREATION } from '@/lib/endpoints'
import { fetcher, mutater } from '@/lib/fetchers'
import useSWR from 'swr'
import { labregisterSchema } from './labRegisterSchema'
import { useOnClickOutside } from 'usehooks-ts'
import DashLoader from '../common/DashLoader'
import MyAutocomplete from '../Authentication/MyAutoComplete'

export interface LabFormInterface {
  showLabForm: {
    popup: boolean
    labData: any
  }
  setShowLabForm: Dispatch<
    SetStateAction<{
      popup: boolean
      labData: object
    }>
  >
  mutate: () => void
}

export interface LabRegisterInterface {
  _id?: string
  name: string
  email: string
  phone: string
  postCode: string
  address: string
  state: string
  city: string
  organization: string
  password: string
  confirmPassword?: unknown | string
}

// Default values to ensure consistency
const getDefaultValues = (labData?: any): LabRegisterInterface => ({
  name: labData?.name || '',
  email: labData?.email || '',
  phone: labData?.phone || '',
  organization: labData?.organization || '',
  address: labData?.address || '',
  state: labData?.state || '',
  city: labData?.city || '',
  postCode: labData?.postCode || '',
  password: '',
  confirmPassword: '',
})

export default function LabForm({ showLabForm, setShowLabForm, mutate }: LabFormInterface) {
  console.log('showLabForm.labData._id', showLabForm.labData._id)
  const path = `${GET_LABS}/${showLabForm.labData._id}`
  const { data: getIndividualLab, isLoading } = useSWR(
    showLabForm.labData._id ? path : null, // Only fetch if ID exists
    fetcher<any>(),
    {}
  )

  const { showSuccess, showError } = usePopup()

  const { trigger: LabCreation, isMutating } = useSWRMutation(
    LAB_CREATION,
    mutater<LabRegisterInterface, { message: string }>('POST'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        mutate()
        setShowLabForm({ popup: false, labData: {} })
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger: updateLabCreation, isMutating: updateMutating } = useSWRMutation(
    path,
    mutater<LabRegisterInterface, { message: string }>('PUT'),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        mutate()
        setShowLabForm({ popup: false, labData: {} })
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const onClose = () => {
    setShowLabForm({ popup: false, labData: {} })
  }

  const modelRef = useRef(null)

  // Determine if this is an edit operation
  const isEditMode = Boolean(showLabForm.labData._id)

  // Get initial values - ensure they're always defined
  const initialValues = getDefaultValues(isEditMode ? getIndividualLab : null)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8 overflow-hidden">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[650px] bg-gray-50 rounded-lg shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-6 sm:py-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {isEditMode ? 'Edit Lab' : 'Create a Lab'}
          </h2>

          {/* Show loading state for edit mode */}
          {isEditMode && isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-600">Loading lab data...</div>
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={!isEditMode ? labregisterSchema : undefined}
              onSubmit={(values: LabRegisterInterface, { setSubmitting }) => {
                const submitValues = { ...values }
                delete submitValues.confirmPassword

                if (isEditMode) {
                  console.log('updating lab')
                  updateLabCreation(submitValues)
                } else {
                  console.log('creating lab')
                  LabCreation(submitValues)
                }

                setSubmitting(false)
              }}
            >
              {({ values, setFieldValue }) => (
                <LabFormFields
                  values={values}
                  setFieldValue={setFieldValue}
                  setShowLabForm={setShowLabForm}
                  isEditMode={isEditMode}
                  isMutating={isMutating || updateMutating}
                />
              )}
            </Formik>
          )}
        </div>
      </motion.div>
    </div>
  )
}

interface FieldValueState {
  popup: boolean
  labData: object
}

interface LabFormFieldInterface {
  values: LabRegisterInterface
  setShowLabForm: Dispatch<SetStateAction<FieldValueState>>
  isEditMode: boolean
  isMutating: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

function LabFormFields({ values, setShowLabForm, isEditMode, isMutating, setFieldValue }: LabFormFieldInterface) {
  const stateValue = values?.state || ''
  const cityOptions: any = city.filter((cities: any) => cities?.[stateValue])
  const cityMain = cityOptions[0]?.[stateValue] || []

  return (
    <Form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput name="name" label="Name" placeholder="Enter name" />
        <TextInput name="email" type="email" label="Email" placeholder="Enter email" disabled={isEditMode} />
        <NumberInput name="phone" label="Phone" regex={/^\d*$/} />
        <TextInput name="organization" label="Organization" placeholder="Enter organization" />

        <div className="md:col-span-2">
          <MyAutocomplete setFieldValue={setFieldValue} />
        </div>

        <TextInput name="state" label="State" placeholder="Enter State" />
        <TextInput name="city" label="City" placeholder="Enter City" />
        <NumberInput label="Post Code" name="postCode" id="postCode" regex={/^\d{0,5}$/} />
        <TextInput name="address" label="Address" placeholder="Enter address" inputstyle="sm:col-span-2" />
        {/* Only show password fields for new labs */}
        {!isEditMode && (
          <>
            <PasswordInput name="password" label="Password" placeholder="Enter password" />
            <PasswordInput name="confirmPassword" label="Confirm Password" placeholder="Confirm password" />
          </>
        )}
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          className="bg-white text-brand-400 border border-brand-400 px-4 py-1 rounded-md mr-2"
          onClick={() => setShowLabForm({ popup: false, labData: {} })}
        >
          Close
        </button>
        <button type="submit" className="bg-brand-400 text-white px-4 py-2 rounded-md hover:bg-brand-500">
          {isMutating ? <DashLoader color="white" /> : isEditMode ? 'Update Lab' : 'Save Lab'}
        </button>
      </div>
    </Form>
  )
}
