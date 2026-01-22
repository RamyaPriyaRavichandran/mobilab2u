import React, { useRef, useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'
import { BASIC_STATUS, beforeFood_afterFood, INPUT_REQUIRED, USER_ROLES } from '@/utils/constents'
import TextAreaInput from '@/components/common/Input/TextAreaInput'
import TextInput from '@/components/common/Input/TextInput'
import SelectInput from '@/components/common/Input/SelectInput'
import { useParams } from 'next/navigation'
import { Medicine, MedicineDetail, PrescriptionInterface } from '../types'
import MedicineData from './Detail'
import { useAuth } from '@/lib/contexts/AuthContext'
import DateInput from '@/components/common/Input/DateInput'
import CloseButton from '../CloseButton'
import SaveButton from '../SaveButton'
import DashLoader from '@/components/common/DashLoader'
import { ROLES } from '@/utils/constents/permission'
import NumberInput from '@/components/common/Input/NumberInput'

export default function Index({
  onClose,
  prescriptionDetails: { medicine = {} as MedicineDetail, followUpAppointmentDate = '' },
  trigger,
  appointmentDetails,
  isMutating,
}: PrescriptionInterface) {
  const modelRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const { roles } = useAuth()
  const isAdminRole = roles === USER_ROLES.SUPER_ADMIN
  const prescriptionSchema = Yup.object().shape({
    symptoms: Yup.string().required(INPUT_REQUIRED),
    comorbidities: Yup.string().required(INPUT_REQUIRED),
    diagnosis: Yup.string().required(INPUT_REQUIRED),
    allergies: Yup.string().required(INPUT_REQUIRED),
    // Conditional validation for admin users
    deliveryCharge: isAdminRole
      ? Yup.number().required('Delivery charge is required for admin').min(0, 'Delivery charge must be 0 or greater')
      : Yup.number(),
    medicine: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        dosage: Yup.string(),
        frequency: Yup.string(),
        route: Yup.string(),
        beforeOrAfterFood: Yup.string(),
        duration: Yup.string(),
        // Price is required for admin when medicine is added
        price: isAdminRole
          ? Yup.number().required('Price is required for admin').min(0, 'Price must be 0 or greater')
          : Yup.number(),
      })
    ),
  })
  useOnClickOutside(modelRef, onClose)
  const [data, setData] = useState(false)
  const detail = (med?: Medicine) => {
    return {
      name: med?.name || '',
      dosage: med?.dosage || '',
      frequency: med?.frequency || '',
      route: med?.route || '',
      beforeOrAfterFood: med?.beforeOrAfterFood || '',
      duration: med?.duration || '',
      price: med?.price || '',
    }
  }
  const scrollToTop = () => {
    if (modelRef.current) {
      modelRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling
      })
    }
  }
  const isGpPartner = roles === USER_ROLES.GP_PARTNER && medicine._id
  const isAdmin = roles === USER_ROLES.SUPER_ADMIN && medicine.status === BASIC_STATUS.APPROVED
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 scroll-auto">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-50 m-2 shadow-lg rounded-lg p-6 md:p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
      >
        <Formik
          initialValues={{
            symptoms: medicine.symptoms || '',
            comorbidities: medicine.comorbidities || '',
            diagnosis: medicine.diagnosis || '',
            price: medicine.price || '',
            allergies: medicine.allergies || '',
            weight: medicine.weight || '',
            height: medicine.height || '',
            bloodPressure: medicine.bloodPressure || '',
            temperature: medicine.temperature || '',
            heartRate: medicine.heartRate || '',
            spO2: medicine.spO2 || '',
            cbg: medicine.cbg || '',
            medicalHistory: medicine.medicalHistory || '',
            virtualAssessment: medicine.virtualAssessment || '',
            deliveryCharge: medicine.deliveryCharge || 0,
            medicine: medicine.medicine?.length > 0 ? medicine?.medicine.map((med: Medicine) => detail(med)) : [],
            advice: medicine?.advice || '',
            followupDate: followUpAppointmentDate?.slice(0, 10) || '',
          }}
          enableReinitialize
          validationSchema={prescriptionSchema}
          onSubmit={(values: MedicineDetail) => {
            values.price = values.medicine.reduce((sum: any, med: any) => sum + Number(med.price), 0)
            if (medicine._id) {
              values.medicineId = medicine._id
            }
            trigger(values)
          }}
        >
          {({ values, validateForm, setTouched }) => (
            <Form>
              {isAdmin || isGpPartner || data ? (
                <div>
                  <MedicineData
                    followupDate={followUpAppointmentDate || values.followupDate || ''}
                    medicine={values}
                    appointmentDetails={appointmentDetails}
                  />
                  <div className="mt-4 space-x-2 text-right">
                    {isGpPartner || isAdmin ? (
                      <CloseButton onClose={onClose} />
                    ) : (
                      <>
                        <button
                          type="button"
                          className="bg-white hover:bg-blue-500 text-md hover:text-white text-blue-500 border-[2px]  border-blue-500 px-4 py-1 rounded-md "
                          onClick={() => setData(!data)}
                        >
                          Edit Form
                        </button>

                        <button
                          disabled={
                            roles === USER_ROLES.GP_PARTNER && medicine._id
                              ? true
                              : false ||
                                  isMutating ||
                                  (roles === USER_ROLES.SUPER_ADMIN && medicine.status === BASIC_STATUS.APPROVED)
                                ? true
                                : false
                          }
                          className="bg-white hover:bg-green-500 hover:text-white text-green-500 border-[2px] border-green-500 px-3 rounded-md py-1 "
                        >
                          {isMutating ? 'Loading...' : ` ${roles === ROLES.GP_PARTNER ? 'Save' : 'Approve'}`}
                        </button>
                        <CloseButton onClose={onClose} />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <FormFields
                  scrollToTop={scrollToTop}
                  setTouched={setTouched}
                  validateForm={validateForm}
                  values={values}
                  setData={() => setData(!data)}
                  onClose={onClose}
                />
              )}
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  )
}

function FormFields({
  onClose,
  values,
  setData,
  setTouched,
  scrollToTop,
  validateForm,
}: {
  onClose: () => void
  setTouched: any
  setData: () => void
  validateForm: () => void
  scrollToTop: () => void
  values: MedicineDetail
}) {
  const { roles } = useAuth()
  const isAdmin = roles === USER_ROLES.SUPER_ADMIN

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Prescription</h2>
      <div className="md:grid md:grid-cols-3 space-y-5 md:gap-2">
        <div className="col-span-3">
          <TextAreaInput name="symptoms" label="Symptoms" inputstyle="w-full" rows={3} disabled={isAdmin} />
        </div>

        <TextInput name="comorbidities" label="Comorbidities" inputstyle="w-full" disabled={isAdmin} />
        <TextInput name="diagnosis" label="Diagnosis" inputstyle="w-full" disabled={isAdmin} />
        <TextInput name="allergies" label="Allergies" inputstyle="w-full" disabled={isAdmin} />
        <div className="col-span-3">
          <TextAreaInput
            name="medicalHistory"
            label="Medical History"
            inputstyle="w-full"
            disabled={isAdmin}
            rows={2}
          />
        </div>
        <div className="col-span-3">
          <TextAreaInput
            name="virtualAssessment"
            label="Brief Virtual Assessment"
            inputstyle="w-full"
            rows={2}
            disabled={isAdmin}
          />
        </div>
      </div>
      {/* Vitals (As Declared by Patient) */}
      <section>
        <h3 className="text-lg font-semibold mb-2 ">
          <span className="underline">Vitals</span>(as declared by the patient)
        </h3>
        <div className="md:grid md:grid-cols-3 md:gap-2">
          <NumberInput
            name="weight"
            label="Weight"
            placeholder="kg"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d*\.?\d*$/}
          />
          <NumberInput
            name="height"
            placeholder="cm"
            label="Height"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d*$/}
          />
          <NumberInput
            name="bloodPressure"
            placeholder="mm/hg"
            label="Blood Pressure"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d*\/?\d*$/}
          />
          <NumberInput
            name="temperature"
            placeholder="°C"
            label="Temperature"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d*\.?\d*$/}
          />
          <NumberInput
            name="heartRate"
            placeholder="bpm"
            label="Heart Rate"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d*$/}
          />
          <NumberInput
            name="spO2"
            placeholder="%"
            label="SpO2 (Oxygen Saturation)"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^(100|[1-9]?\d)$/}
          />
          <NumberInput
            name="cbg"
            placeholder="mmol/l"
            label="CBG (Capillary Blood Glucose)"
            inputstyle="w-full"
            disabled={isAdmin}
            regex={/^\d{1,2}\.?\d*$/}
          />
        </div>
      </section>
      {/* Medicines Field Array */}
      <FieldArray name="medicine">
        {({ push, remove }) => (
          <div>
            {roles === USER_ROLES.SUPER_ADMIN && values.medicine.length === 0 ? null : (
              <h3 className="text-lg font-semibold mb-2 underline">Medicines</h3>
            )}

            {values.medicine.map((_: Medicine, index: number) => (
              <div key={index} className="space-y-2 border-b border-gray-300 pb-4 mb-4">
                <div className="md:grid md:grid-cols-3 md:gap-2">
                  <TextInput
                    name={`medicine[${index}].name`}
                    disabled={isAdmin}
                    label="Medicine Name"
                    inputstyle="w-full"
                  />
                  <TextInput name={`medicine[${index}].dosage`} disabled={isAdmin} label="Dosage" inputstyle="w-full" />
                  <TextInput
                    name={`medicine[${index}].frequency`}
                    disabled={isAdmin}
                    placeholder="1-0-1-0"
                    label="Frequency (M-A-E-N)"
                    inputstyle="w-full"
                  />

                  <TextInput name={`medicine[${index}].route`} label="Route" inputstyle="w-full" disabled={isAdmin} />
                  <SelectInput
                    options={beforeFood_afterFood}
                    name={`medicine[${index}].beforeOrAfterFood`}
                    label="BeforeFood/AfterFood"
                    disabled={isAdmin}
                  />
                  <TextInput
                    name={`medicine[${index}].duration`}
                    disabled={isAdmin}
                    label="Duration"
                    placeholder="days"
                    inputstyle="w-full"
                  />

                  {roles === USER_ROLES.SUPER_ADMIN && (
                    <TextInput type="number" name={`medicine[${index}].price`} label="Price" inputstyle="w-full" />
                  )}
                </div>
                {roles === USER_ROLES.GP_PARTNER && (
                  <div className="text-right">
                    <button type="button" className="text-red-500 underline text-sm" onClick={() => remove(index)}>
                      Remove Medicine
                    </button>
                  </div>
                )}
              </div>
            ))}
            {roles === USER_ROLES.GP_PARTNER && (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                onClick={() =>
                  push({
                    name: '',
                    dosage: '',
                    frequency: '',
                    route: '',
                    beforeOrAfterFood: '',
                    duration: '',
                  })
                }
              >
                Add Medicine
              </button>
            )}
          </div>
        )}
      </FieldArray>
      {values.medicine.length > 0 && roles === USER_ROLES.SUPER_ADMIN && (
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <TextInput label="Delivery Charge" type="number" name="deliveryCharge" />
          </div>
        </div>
      )}
      <TextAreaInput name="advice" label="Advice" inputstyle="w-full" disabled={isAdmin} />
      <DateInput
        minDate={true}
        name="followupDate"
        type="date"
        label="Follow up Date"
        inputstyle="w-full"
        disabled={isAdmin}
      />

      <div className="mt-4 text-right">
        <CloseButton onClose={onClose} />
        <SaveButton
          onClick={async () => {
            const errors: any = await validateForm()
            if (Object.keys(errors).length === 0) {
              setData()
            } else {
              scrollToTop()
              setTouched(errors) // Marks fields as touched, showing validation errors
            }
          }}
          name="View Prescription"
        />
      </div>
    </div>
  )
}
