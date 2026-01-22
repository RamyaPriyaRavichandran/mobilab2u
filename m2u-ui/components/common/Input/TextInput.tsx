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
}

export default function TextInput(props: inputProps) {
  const [field] = useField(props.name || '')
  return (
    <div className="relative">
      <label className="text-sm font-semibold" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        disabled={props.disabled}
        {...field}
        min={props.minStartDate && props.minStartDate}
        type={props.type || 'text'}
        id={props.id || props.name}
        name={props.name || ''}
        placeholder={props.placeholder || ''}
        className={`${props.inputstyle || 'w-full'}  ${
          props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        } w-full py-1.5 border-2 text-black bg-transparent rounded-md focus:outline-none focus:border-brand-700 focus:ring-0 mt-1 sm:text-sm pl-2 pr-1 h-9 border-[#e5e7eb]`}
      />
      <ErrorMessage name={props.name || ''} component="div" className="text-red-500 text-xs absolute top-4.5" />
    </div>
  )
}
