'use client'

import { Field, useField } from 'formik'
import type React from 'react'

export interface InputProps {
  name: string
  disabled?: boolean
  placeholder?: string
  inputstyle?: string
  type?: string
  id?: string
  label: string
  regex?: RegExp
}

export default function NumberInput(props: InputProps) {
  const [field, meta, helpers] = useField(props.name)
  const validationRegex = props.regex || /^\d*$/

  return (
    <div className="flex flex-col relative">
      <label className="font-semibold text-sm mb-1" htmlFor={props.id || props.name}>
        {props.label}
      </label>

      <Field
        type="text"
        name={props.name}
        id={props.id || props.name}
        placeholder={props.placeholder || ''}
        disabled={props.disabled}
        className={`${
          props.inputstyle || 'w-full'
        } py-1.5 border-2 rounded-md text-black bg-transparent focus:border-brand-700 focus:ring-0 outline-none mt-1 sm:text-sm pl-2 h-9 no-spinner border-[#e5e7eb] ${
          props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          if (value === '' || validationRegex.test(value)) {
            helpers.setValue(value)
          }
        }}
        value={field.value || ''}
      />

      {meta.touched && meta.error ? <div className="text-red-500 text-xs">{meta.error}</div> : null}
    </div>
  )
}
