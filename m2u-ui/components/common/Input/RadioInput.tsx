import { useState } from 'react'
import { useField, ErrorMessage } from 'formik'

function RadioInput(props: any) {
  const { options, ...formProps } = props

  const [error, setError] = useState()
  const [field, meta, { setValue }] = useField(props)
  const hasError = meta.error && meta.touched

  const required = formProps.required
  const isDisabled = formProps.isDisabled
  const bgColor = isDisabled ? 'bg-gray-200' : ''

  if (required) {
    // Removing html defalut required
    delete formProps.required
  }

  return (
    <div className="my-2 max-w-2xl relative">
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
      {props.label ? (
        <label
          htmlFor={props.id || props.name}
          className={`flex  text-md font-semibold   mb-2    ${props.required ? 'required' : ''}`}
        >
          {props.label}
        </label>
      ) : null}

      <div className="sm:grid space-y-4 sm:space-y-0 gap-2 grid-cols-2 mt-2 max-w-2xl">
        {options.map(({ label, value }: any) => {
          const id = `${formProps.name}-${value}`
          return (
            <div key={value} className="flex items-center">
              <input
                id={id}
                aria-label={formProps.id || formProps.name || formProps.label}
                {...field}
                type="radio"
                className={`focus:ring-brand-700 h-4 w-4 text-brand-700 border-gray-300 ${bgColor} ${hasError ? 'border-red-500' : ''}`}
                checked={value === meta.value}
                onChange={() => {
                  setValue(value, false)
                }}
                disabled={props.disabled}
              />
              <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700">
                {label}
              </label>
            </div>
          )
        })}

        <ErrorMessage className="mt-1 text-sm absolute top-5 text-red-500" component="div" name={props.name} />
      </div>
    </div>
  )
}

export default RadioInput
