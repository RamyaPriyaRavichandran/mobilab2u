import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import useSWR from 'swr'
import { useOnClickOutside } from 'usehooks-ts'

import CloseButton from '@/components/common/Buttons/CloseButton'
import NumberInput from '@/components/common/Input/NumberInput'
import SelectInput from '@/components/common/Input/SelectInput'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import TextInput from '@/components/common/Input/TextInput'
import UploadInput from '@/components/common/Input/UploadInput'
import DashLoader from '@/components/common/DashLoader'

import { fetcher } from '@/lib/fetchers'
import { GET_ADMIN_TEST_PACKAGES } from '@/lib/endpoints'
import { INPUT_MEMBERS, INPUT_PLAN_NAME, INPUT_REQUIRED, serviceType, type } from '@/utils/constents'

const packageSchema = Yup.object().shape({
  name: Yup.string().required(INPUT_PLAN_NAME),
  description: Yup.string().required(INPUT_REQUIRED),
  type: Yup.string().required(INPUT_REQUIRED),
  serviceType: Yup.string().required(INPUT_REQUIRED),
  members: Yup.number().when('type', {
    is: 'FAMILY',
    then: () => Yup.number().required(INPUT_REQUIRED).min(2, INPUT_MEMBERS),
  }),
  price: Yup.number().required(INPUT_REQUIRED),
  offerPrice: Yup.number().required(INPUT_REQUIRED),
  labShare: Yup.number().required(INPUT_REQUIRED),
  hspShare: Yup.number().required(INPUT_REQUIRED),
  customerShare: Yup.number().required(INPUT_REQUIRED),
  mobilabShare: Yup.number().required(INPUT_REQUIRED),
})

export default function CustomPackage({ createCustomPackage, testData, onClose, isMutating }: any) {
  const modelRef = useRef(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOnClickOutside(modelRef, onClose)

  const { data: packageData = [], isLoading } = useSWR(`${GET_ADMIN_TEST_PACKAGES}`, fetcher<Array<any>>())
  if (isLoading) {
    return <DashLoader />
  }

  const customPackages = [...packageData, { label: 'Create custom package', value: 'CREATE_CUSTOM_PACKAGE' }]
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 scroll-auto">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-50 shadow-lg rounded-lg m-2 md:p-10 p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Custom Package</h2>

        <Formik
          initialValues={{
            name: testData.name || '',
            description: testData.description || '',
            packageName: testData.name || '',
            packageDescription: testData.description || '',
            selectedPackage: '',
            type: 'INDIVIDUAL',
            serviceType: 'TEST',
            members: 1,
            price: testData.price || 1,
            offerPrice: testData.offerPrice || 1,
            labShare: testData.labShare || 1,
            hspShare: testData.hspShare || 1,
            gpShare: testData.gpShare || 1,
            customerShare: testData.customerShare || 1,
            mobilabShare: testData.mobilabShare || 1,
            duration: testData.duration || '',
            fastingHour: testData.fastingHour || '',
          }}
          enableReinitialize
          // validationSchema={packageSchema}
          onSubmit={(values: any, { setSubmitting }) => {
            createCustomPackage(values)
            setSubmitting(false)
          }}
        >
          {({ values }) => {
            const inputIsAlive = values.selectedPackage === 'CREATE_CUSTOM_PACKAGE'
            return (
              <Form className="space-y-4">
                {values.selectedPackage}
                <div className="md:grid md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
                  {!testData._id && (
                    <>
                      <div className="col-span-2">
                        <TextInput name="packageName" label="Suggested Test Name" placeholder="Enter Plan name" />
                      </div>

                      <TextAreaInput rootStyle="col-span-2" name="packageDescription" label="Test Description" />

                      <div className="col-span-2">
                        <SelectInput
                          className="col-span-2"
                          label="Select Test"
                          name="selectedPackage"
                          options={customPackages}
                        />
                      </div>
                    </>
                  )}

                  {(testData._id || inputIsAlive) && (
                    <>
                      <SelectInput label="Type" name="type" options={type} />
                      <TextInput name="name" label="Plan Name" placeholder="Enter Plan name" />
                      <SelectInput label="Service Type" disabled={true} name="serviceType" options={serviceType} />
                      <NumberInput
                        name="members"
                        disabled={true}
                        label="Members"
                        placeholder="Enter Members"
                        regex={/^\d{1,1}$/}
                      />
                      <NumberInput name="duration" label="Test Duration" placeholder="Hours" />
                      <NumberInput name="fastingHour" label="Fasting Hour" placeholder="Hours" />
                      <NumberInput
                        name="price"
                        label="Price"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="offerPrice"
                        label="Offer Price"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="labShare"
                        label="Lab Share"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="hspShare"
                        label="HSP Share"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="customerShare"
                        label="Customer Share"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="gpShare"
                        label="GP Share"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <NumberInput
                        name="mobilabShare"
                        label="Mobilab Share"
                        placeholder="RM"
                        regex={/^\d{1,3}(,\d{3})*\.?\d{0,2}$|^\d*\.?\d{0,2}$/}
                      />
                      <UploadInput name="document" label="Document" />
                      <UploadInput name="image" label="Logo" />
                      <TextAreaInput rootStyle="col-span-2" name="description" label="Description" />
                    </>
                  )}
                </div>

                <div className="flex justify-end mt-12">
                  <CloseButton onClose={onClose} />
                  {!testData._id && (
                    <button
                      disabled={isMutating || !!testData._id}
                      type="submit"
                      className="bg-white hover:bg-green-500 hover:text-white text-green-500 border-[2px] border-green-500 px-3 rounded-md py-1"
                    >
                      {isMutating ? 'Loading...' : 'Save'}
                    </button>
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </motion.div>
    </div>
  )
}
