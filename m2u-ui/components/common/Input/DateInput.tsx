import { ErrorMessage, useField } from 'formik'
import React from 'react'

export interface inputProps {
  name?: string
  disabled?: boolean
  placeholder?: string
  inputstyle?: string
  type?: string
  id?: string
  label?: string
  minStartDate?: string
  minDate?: boolean
}

export default function DateInput(props: inputProps) {
  const [field] = useField(props.name || '')
  return (
    <div>
      {props.label && (
        <label htmlFor="time" className="text-sm font-semibold">
          {props.label}
        </label>
      )}

      <input
        disabled={props.disabled}
        {...field}
        type="date"
        min={props.minDate ? props.minStartDate || new Date().toISOString().split('T')[0] : undefined}
        name={props.name || ''}
        placeholder={props.placeholder || ''}
        className={`${
          props.inputstyle || 'w-full'
        } w-full py-1.5 border-2 text-black bg-transparent rounded-md focus:outline-none focus:border-brand-700 focus:ring-0 mt-1 sm:text-sm pl-2 pr-1 h-9 border-[#e5e7eb]`}
      />
      <ErrorMessage name={props.name || ''} component="div" className="text-red-500 font-medium mt-1 text-sm " />
    </div>
  )
}
