'use client'

import { useRef, useEffect, useState } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import TextInput from '../common/Input/TextInput'
import NumberInput from '../common/Input/NumberInput'
import SelectInput from '../common/Input/SelectInput'
import TextAreaInput from '../common/Input/TextAreaInput'
import UploadInput from '../common/Input/UploadInput'
import { useOnClickOutside } from 'usehooks-ts'
import { motion } from 'framer-motion'
import DashLoader from '../common/DashLoader'
import type { PlanFormFieldInterface, PlanFormInterface, PlanRegisterInterface } from './PlansInterface'
import { packageSchema } from './PackageSchema'
import { usePopup } from '@/lib/contexts/PopupContext'
import useSWRMutation from 'swr/mutation'
import { GET_PLANS, PLAN_CREATION } from '@/lib/endpoints'
import { mutater } from '@/lib/fetchers'
import { packageServiceType, type } from '@/utils/constents'

export default function PackageForm({ showPlanForm: { planData = {} }, setShowPlanForm, mutate }: PlanFormInterface) {
  const { showSuccess, showError } = usePopup()
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, () => setShowPlanForm({ popup: false, planData: {} }))

  const { trigger: createPlanCreation, isMutating: postMutating } = useSWRMutation(
    PLAN_CREATION,
    mutater<any, { message: string }>('POST', true),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setShowPlanForm({ popup: false, planData: {} })
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  const { trigger: updatePackageCreation, isMutating: putMutating } = useSWRMutation(
    `${GET_PLANS}/${planData._id}`,
    mutater<any, { message: string }>('PUT', true),
    {
      onSuccess: ({ data: { message = '' } = {} }) => {
        showSuccess(message)
        setShowPlanForm({ popup: false, planData: {} })
        mutate()
      },
      onError: ({ response: { data: { message = '' } = {} } }) => {
        showError(message)
      },
      throwOnError: false,
    }
  )

  function submitForm(values: any) {
    const formData = new FormData()
    formData.append('data', JSON.stringify(values))
    formData.append('document', values.document)
    formData.append('image', values.image)
    planData._id ? updatePackageCreation(formData) : createPlanCreation(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center px-4 py-4 sm:p-6 z-50">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-[900px] max-h-[calc(100vh-2rem)] sm:max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200 bg-white">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">Create a Package</h2>
        </div>

        <div className="overflow-y-auto flex-1 px-4 py-4 sm:px-6 sm:py-6">
          <Formik
            initialValues={{
              name: planData.name || '',
              description: planData.description || '',
              type: planData.type || '',
              serviceType: planData.serviceType || '',
              members: planData.members || 0,
              price: planData.price || '',
              offerPrice: planData.offerPrice || '',
              labShare: planData.labShare || '',
              hspShare: planData.hspShare || '',
              gpShare: planData.gpShare || '',
              duration: planData.duration || '',
              fastingHour: planData.fastingHour || '',
              customerShare: planData.customerShare || '',
              mobilabShare: planData.mobilabShare || '',
              testCount: planData.testCount || '',
              image: planData.image || '',
              document: planData.document || '',
            }}
            enableReinitialize
            validationSchema={packageSchema}
            onSubmit={(values: PlanRegisterInterface, { setSubmitting }) => {
              submitForm(values)
              setSubmitting(false)
            }}
          >
            {({ values }) => (
              <PlanFormFields
                putMutating={putMutating}
                postMutating={postMutating}
                setShowPlanForm={setShowPlanForm}
                values={values}
              />
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  )
}

function PlanFormFields({ setShowPlanForm, postMutating, putMutating, values }: PlanFormFieldInterface) {
  const { setFieldValue } = useFormikContext()

  const [shareError, setShareError] = useState<string>('')

  useEffect(() => {
    const price = Number.parseFloat(values.price) || 0
    const offerPrice = Number.parseFloat(values.offerPrice) || 0
    const baseAmount = offerPrice > 0 ? offerPrice : price

    if (baseAmount > 0) {
      if (values.serviceType === 'TEST') {
        const hspShare = Number.parseFloat(values.hspShare) || 0
        const labShare = Number.parseFloat(values.labShare) || 0
        const gpShare = Number.parseFloat(values.gpShare) || 0
        const customerShare = Number.parseFloat(values.customerShare) || 0

        const totalManualShares = hspShare + labShare + gpShare + customerShare

        if (totalManualShares > baseAmount) {
          setShareError(
            `Total shares (RM ${totalManualShares.toFixed(2)}) cannot exceed the base amount (RM ${baseAmount.toFixed(2)})`
          )
          setFieldValue('mobilabShare', '0.00')
        } else {
          setShareError('')
          const mobilabShare = (baseAmount - totalManualShares).toFixed(2)
          setFieldValue('mobilabShare', mobilabShare)
        }
      } else if (values.serviceType === 'APPOINTMENT') {
        const gpShare = Number.parseFloat(values.gpShare) || 0
        const customerShare = Number.parseFloat(values.customerShare) || 0

        const totalManualShares = gpShare + customerShare

        if (totalManualShares > baseAmount) {
          setShareError(
            `Total shares (RM ${totalManualShares.toFixed(2)}) cannot exceed the base amount (RM ${baseAmount.toFixed(2)})`
          )
          setFieldValue('mobilabShare', '0.00')
        } else {
          setShareError('')
          const mobilabShare = (baseAmount - totalManualShares).toFixed(2)
          setFieldValue('mobilabShare', mobilabShare)
        }
      }
    }
  }, [
    values.price,
    values.offerPrice,
    values.serviceType,
    values.hspShare,
    values.labShare,
    values.gpShare,
    values.customerShare,
    setFieldValue,
  ])

  return (
    <Form className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <TextInput name="name" label="Plan Name" placeholder="Enter Plan name" />
        <SelectInput label="Service Type" name="serviceType" options={packageServiceType} />

        {values.serviceType === 'TEST' && (
          <>
            <SelectInput label="Type" name="type" options={type} />
            {values.type === 'FAMILY' && (
              <NumberInput name="members" label="Members" placeholder="Enter Members" regex={/^[1-9]\d{0,8}$/} />
            )}
            <TextInput name="duration" label="Test Duration" placeholder="Hours" />
            <TextInput name="fastingHour" label="Fasting Hour" placeholder="Hours" />
            <TextInput name="testCount" label="Test Count" placeholder="Count" />
          </>
        )}

        <NumberInput name="price" label="Price" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />
        <NumberInput name="offerPrice" label="Offer Price" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />

        {values.serviceType === 'TEST' ? (
          <>
            <NumberInput name="hspShare" label="HSP Share" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />
            <NumberInput name="labShare" label="Lab Share" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />
          </>
        ) : null}
        <NumberInput name="gpShare" label="GP Share" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />
        {['APPOINTMENT', 'TEST'].includes(values.serviceType) && (
          <>
            <NumberInput name="customerShare" label="Customer Share" placeholder="RM" regex={/^\d*\.?\d{0,2}$/} />
            <NumberInput
              name="mobilabShare"
              label="Mobilab Share (Auto)"
              placeholder="RM"
              regex={/^\d*\.?\d{0,2}$/}
              disabled
            />
          </>
        )}
        <UploadInput name="document" label="Document" />
        <UploadInput name="image" label="Logo" />
        <TextAreaInput rootStyle="md:col-span-2" name="description" label="Description (Special Instruction)" />
      </div>

      {shareError && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-md text-xs sm:text-sm">
          {shareError}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-gray-200">
        <button
          type="button"
          className="bg-white text-brand-400 border border-brand-400 px-4 py-2.5 sm:py-2 rounded-md w-full sm:w-auto hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
          onClick={() => setShowPlanForm({ popup: false, planData: {} })}
        >
          Close
        </button>
        <button
          disabled={postMutating || putMutating || !!shareError}
          type="submit"
          className="bg-green-400 text-white px-4 py-2.5 sm:py-2 rounded-md w-full sm:w-auto hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
        >
          {postMutating || putMutating ? <DashLoader color="white" /> : 'Save Package'}
        </button>
      </div>
    </Form>
  )
}
