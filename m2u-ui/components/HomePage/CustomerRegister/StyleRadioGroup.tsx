'use client'

import { Field, ErrorMessage } from 'formik'

interface RadioOption {
  label: string
  value: string
}

interface StyledRadioGroupProps {
  label: string
  name: string
  options: RadioOption[]
  required?: boolean
}

export default function StyledRadioGroup({ label, name, options, required = true }: StyledRadioGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center space-x-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <Field
              type="radio"
              name={name}
              value={option.value}
              className="text-red-600 focus:ring-red-600 border-gray-300"
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  )
}
