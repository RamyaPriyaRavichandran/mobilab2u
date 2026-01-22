import { ErrorMessage, useField } from 'formik'
import UploadDocument from './UploadDocument'
import { downloadDocument } from './download.util'

const UploadInput = (props: any) => {
  const formProps = { ...props }
  const [, meta, helpers] = useField(props)
  const { setValue, setTouched } = helpers
  const hasError = meta.error && meta.touched
  const required = props.required
  // const bgColor = props.disabled ? "bg-gray-100" : "";

  if (props.required) {
    delete formProps.required
  }
  return (
    <div className="relative">
      <div>
        {formProps.label ? (
          <div className="flex justify-between w-full">
            <label
              htmlFor={formProps.id || formProps.name}
              className={`block text-sm font-semibold leading-5 text-gray-700 ${required ? 'required' : ''}`}
            >
              {formProps.label}
            </label>
            {formProps.link && (
              <a
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => {
                  // window.open(formProps.link);
                  downloadDocument(formProps.link)
                }}
              >
                Download
              </a>
            )}
          </div>
        ) : null}

        <UploadDocument
          {...formProps}
          onChange={setValue}
          onBlur={() => setTouched(true)}
          errorMessage={hasError ? meta.error : ''}
          disabled={formProps.disabled}
        />
      </div>
      <ErrorMessage component="div" name={formProps.name} className="text-red-500 text-xs mt-1" />
    </div>
  )
}

export default UploadInput
