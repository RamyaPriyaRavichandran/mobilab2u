import MultiFileUpload from '@/components/common/Input/MultiFileUpload'
import PasswordInput from '@/components/common/Input/PasswordInput'
import UploadInput from '@/components/common/Input/UploadInput'
import { userType } from '@/utils/constents'

export default function DocumentsAndPasswords({ roles }: { roles: string }) {
  return (
    <section className="md:grid md:grid-cols-4 mt-8 md:gap-6 ">
      <div className="col-span-2 py-6">
        <UploadInput label="MyKad" name="myKad" id="myKad" />
      </div>
      <div className="col-span-2 py-6">
        <UploadInput label="Passport size photo" name="passportSizePhoto" id="passportSizePhoto" />
      </div>
      {roles === 'GP_PARTNER' && (
        <div className="col-span-2 py-6">
          <UploadInput label="E-Sign" name="eSign" id="eSign" />
        </div>
      )}
      <div className="col-span-4">
        <MultiFileUpload fileLimit={4} label="Supporting Documents" name="supportingDocs" />
      </div>
      <div className="col-span-2">
        <PasswordInput label="Password" name="password" id="password" />
      </div>
      <div className="col-span-2">
        <PasswordInput label="Confirm Password" name="confirmPassword" />
      </div>
    </section>
  )
}
