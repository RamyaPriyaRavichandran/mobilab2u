'use client'

import TextAreaInput from '@/components/common/Input/TextAreaInput'
import type { PersonalCustomerInterface } from '../AuthenticationInterface'
import { gender, idProof } from '@/utils/constents'
import TextInput from '@/components/common/Input/TextInput'
import NumberInput from '@/components/common/Input/NumberInput'
import LittleLoader from '@/components/common/LittleLoader'
import SelectInput from '@/components/common/Input/SelectInput'
import PasswordInput from '@/components/common/Input/PasswordInput'
import MyAutocomplete from '../MyAutoComplete'

export default function PersonalInformation({
  EmailVerification,
  isMutating,
  values,
  otp,
  email,
  setFieldValue,
}: PersonalCustomerInterface) {
  const NRIC_ondition = values?.idProof === 'NRIC_NUMBER' || values?.idProof === ''
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8 mb-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <TextInput label="Name" name="name" id="name" type="text" />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <SelectInput label="Gender" name="gender" options={gender} />
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <TextInput label="Date of Birth" name="dateOfBirth" id="dateOfBirth" type="date" />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <TextInput label="Email address" name="email" id="email" type="email" />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <button
            type="button"
            disabled={isMutating}
            onClick={() => EmailVerification()}
            className={`w-full px-4 py-1.5 font-semibold text-white rounded-md mt-0 lg:mt-7 disabled:bg-gray-300 bg-brand-600 ${
              values.email === '' ? 'bg-gray-300' : 'bg-brand-600'
            }`}
          >
            {isMutating ? (
              <LittleLoader />
            ) : values.email === '' ? (
              'Verify'
            ) : values.email === email ? (
              'Resend'
            ) : (
              'Verify'
            )}
          </button>
        </div>
        {otp ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <TextInput label="Email Verification Code" name="emailCode" type="text" inputstyle="mt-1" />
          </div>
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-2"></div>
        )}

        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <SelectInput label="ID Proof" name="idProof" options={idProof} />
        </div>
        {NRIC_ondition && (
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <NumberInput label="NRIC Number" name="nricNumber" id="nricNumber" />
          </div>
        )}
        {values?.idProof === 'PASSPORT_NUMBER' && (
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <TextInput label="Passport Number" name="passportNumber" type="text" />
          </div>
        )}
        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <NumberInput label="Phone Number" name="phone" id="phone" regex={/^\d*$/} />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-6 mt-1">
          <MyAutocomplete setFieldValue={setFieldValue} />
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <TextInput label="State" name="state" />
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <TextInput label="City" name="city" />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <NumberInput label="Post Code" name="postCode" id="postCode" regex={/^\d{0,5}$/} />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-6">
          <TextAreaInput label="Address" name="address" />
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-3">
          <PasswordInput label="Password" name="password" id="password" />
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-3">
          <PasswordInput label="Confirm Password" name="confirmPassword" id="confirmPassword" />
        </div>
      </section>
    </>
  )
}
