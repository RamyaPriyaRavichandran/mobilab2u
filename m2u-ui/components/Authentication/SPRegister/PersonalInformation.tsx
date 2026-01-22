'use client'

import RadioInput from '@/components/common/Input/RadioInput'

import { gender, gp_qualification, idProof, language, qualification, Roles, USER_ROLES } from '@/utils/constents'
import TextInput from '@/components/common/Input/TextInput'
import SelectInput from '@/components/common/Input/SelectInput'
import NumberInput from '@/components/common/Input/NumberInput'
import LittleLoader from '@/components/common/LittleLoader'
import MyAutocomplete from '../MyAutoComplete'
import { PersonalInformationInterface } from '../AuthenticationInterface'

export default function PersonalInformation({
  EmailVerification,
  isMutating,
  values,
  email,
  otp,
  setFieldValue,
}: PersonalInformationInterface) {
  // const stateValue = values?.state
  // const cityOptions: any = city.filter((cities: any) => cities[stateValue])
  // const cityMain = cityOptions[0]?.[stateValue]
  const NRIC_ondition = values?.idProof === 'NRIC_NUMBER' || values?.idProof === ''

  return (
    <section className="md:grid md:grid-cols-6 md:gap-6 space-y-5 md:space-y-6">
      <div className="col-span-6">
        <label htmlFor="roles" className="flex text-lg font-semibold mb-4">
          What Role Would You Like to Play in Mobilab?
        </label>
        <RadioInput name="roles" options={Roles} />
      </div>
      <div className="col-span-2">
        <TextInput label="Name" name="userName" id="userName" type="text" />
      </div>
      <div className="col-span-2">
        <SelectInput label="Gender" name="gender" options={gender} />
      </div>
      <div className="col-span-2 mt-1">
        <NumberInput label="Phone Number" name="phone" id="phone" regex={/^\d*$/} />
      </div>
      <div className="col-span-3">
        <div>
          <TextInput label="Email address" name="email" id="email" type="email" />
        </div>
      </div>
      <div className="col-span-1">
        <button
          type="button"
          disabled={isMutating}
          onClick={() => EmailVerification()}
          className={`bg-brand-600 w-full px-2 font-semibold text-white rounded-md md:mt-7 mt-3  py-1.5 disabled:bg-gray-300 ${values.email === '' && 'bg-gray-300'}`}
        >
          {isMutating ? (
            <LittleLoader />
          ) : values.email === '' ? (
            'Verify'
          ) : values.email === email && otp ? (
            'Resend'
          ) : (
            'Verify'
          )}
        </button>
      </div>
      <div className="col-span-2">
        {otp && <TextInput label="Email Verification Code" name="emailCode" type="text" inputstyle="mt-1" />}
      </div>

      {values?.roles === 'GP_PARTNER' ? (
        <div className="col-span-2">
          <SelectInput label="Medical Qualification" name="medicalQualification" options={gp_qualification} />
        </div>
      ) : (
        <div className="col-span-2">
          <SelectInput label="Medical Qualification" name="medicalQualification" options={qualification} />
        </div>
      )}

      {values?.medicalQualification === 'OTHERS' && (
        <div className="col-span-2">
          <TextInput label="Others" name="other" id="other" type="text" />
        </div>
      )}

      {values?.roles === 'GP_PARTNER' && (
        <div className="col-span-2">
          <TextInput label="Register Number" name="registerNumber" id="registerNumber" type="text" />
        </div>
      )}
      <div className="col-span-2">
        <SelectInput label="ID Proof" name="idProof" options={idProof} />
      </div>
      {NRIC_ondition && (
        <div className="col-span-2">
          <NumberInput label="NRIC Number" name="nricNumber" id="nricNumber" />
        </div>
      )}
      {values?.idProof === 'PASSPORT_NUMBER' && (
        <div className="col-span-2">
          <TextInput label="Passport Number" name="passportNumber" id="nricNumber" />
        </div>
      )}
      {values?.roles === 'GP_PARTNER' && (
        <>
          <div></div>
          <div></div>
        </>
      )}
      <div className="col-span-6">
        <MyAutocomplete setFieldValue={setFieldValue} />
      </div>
      <div className="col-span-2">
        <TextInput label="State" name="state" />
      </div>
      <div className="col-span-2">
        <TextInput label="City" name="city" />
      </div>
      <div className="col-span-2">
        <NumberInput label="Post Code" name="postCode" id="postCode" regex={/^\d{0,5}$/} />
      </div>
      <div className="col-span-3">
        <TextInput label="Address" name="address" />
      </div>
      <div className="col-span-3">
        <TextInput label="Address Two" name="address2" />
      </div>

      {values.roles === USER_ROLES.GP_PARTNER && (
        <div className="col-span-2">
          <SelectInput label="Language" name="language" options={language || []} />
        </div>
      )}
    </section>
  )
}
