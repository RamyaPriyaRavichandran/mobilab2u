import React from 'react'

import { ErrorMessage, useField } from 'formik'

export interface textAreaInputProps {
  label?: string
  placeholder?: string
  name?: string
  id?: string
  labelstyle?: string
  inputstyle?: string
  disabled?: boolean
  rows?: number
  value?: string
  border?: boolean
  rootStyle?: string
}

export default function TextAreaInput(props: textAreaInputProps): JSX.Element {
  const [field] = useField(props.name || '')

  return (
    <div className={props.rootStyle}>
      <div className="input-container relative">
        <label className="text-sm font-semibold" htmlFor={props.label}>
          {props.label}
        </label>
        <textarea
          rows={props.rows || 4}
          autoComplete="off"
          id={props.id || ''}
          disabled={props.disabled}
          {...field}
          value={props.value || field.value}
          name={props.name || ''}
          className={` ${props.inputstyle || 'w-full py-2 px-3'} ${
            props.border === undefined && 'border-2 border-gray-200 focus:border-2'
          }  py-2 border-input-normal rounded-[4px] focus:outline-none focus:border-brand-700 focus:ring-0 bg-white`}
          placeholder={props.placeholder || ''}
        />
        <ErrorMessage name={props.name || ''} component="div" className="text-xs text-red-500 max-w-[190px]" />
      </div>
    </div>
  )
}
