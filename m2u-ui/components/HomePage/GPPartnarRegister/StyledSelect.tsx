'use client'

import { ErrorMessage, type FieldAttributes, useField } from 'formik'
import type React from 'react'
import { useState } from 'react'

interface StyledSelectProps {
  label?: string
  name: string
  options: { value: string; label: string }[]
  icon?: React.ReactNode
  className?: string
  required?: boolean
  error?: string
  enableInitialSelect?: boolean
}

export default function StyledSelect({
  label,
  name,
  options,
  icon,
  className,
  required = true,
  error,
  enableInitialSelect,
}: StyledSelectProps) {
  const [field, meta] = useField<FieldAttributes<any>>(name || '')
  const { touched, error: fieldError } = meta
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`flex-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`border-2 rounded-xl px-4 py-0.5 transition-colors ${isFocused ? 'border-brand-700' : touched && (fieldError || error) ? 'border-gray-300' : 'border-gray-300'}`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="flex items-center text-gray-500">{icon}</span>}

          <div className="relative flex-1 rounded-lg bg-white">
            <div className="flex items-center justify-between gap-2">
              <select
                {...field}
                id={name}
                className="flex-1 outline-none focus:outline-none focus:ring-0 text-gray-700 text-sm border-none focus:border-none bg-transparent appearance-none cursor-pointer"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                  setIsFocused(false)
                  field.onBlur(e)
                }}
              >
                <option value="" disabled={!enableInitialSelect} className="text-gray-500">
                  Select
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {touched && (fieldError || error) ? (
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
      ) : null}
    </div>
  )
}
