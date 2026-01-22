import React from 'react'
import { ErrorMessage, useField, FieldAttributes } from 'formik'

export interface SelectInputProps {
  label?: string
  name?: string
  value?: string
  className?: string
  options?: Array<{ label: string; value: string }>
  inputstyle?: string
  labelstyle?: string
  disabled?: boolean
  enableInitialSelect?: boolean
}

export default function SelectInput(props: SelectInputProps) {
  const [field, meta] = useField<FieldAttributes<any>>(props.name || '')
  const { touched, error } = meta

  return (
    <div className="relative">
      <label className={`text-sm font-semibold ${props.labelstyle || ''}`} htmlFor={props.name}>
        {props.label}
      </label>
      <select
        disabled={props.disabled}
        {...field}
        className={`${
          props.inputstyle || 'w-full'
        } py-1.5 text-black bg-transparent rounded-md mt-1 sm:text-sm pl-2 pr-1 h-9 border-2 border-[#e5e7eb]
  ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
  focus:outline-none focus:ring-0 focus:border-brand-700`}
        autoComplete="off"
        name={props.name}
        value={field.value}
      >
        <option value="" disabled={!props.enableInitialSelect} className="text-gray-500">
          Select
        </option>
        {(props.options || []).map((option, idx) => (
          <option
            key={idx}
            value={option.value}
            className="block text-black sm:text-sm rounded-md bg-gray-200 bg-opacity-100 border-0"
          >
            {option.label}
          </option>
        ))}
      </select>
      {touched && error ? (
        <ErrorMessage
          name={props.name || ''}
          component="div"
          className="text-red-500 absolute font-medium top-4.5 text-xs "
        />
      ) : null}
    </div>
  )
}
