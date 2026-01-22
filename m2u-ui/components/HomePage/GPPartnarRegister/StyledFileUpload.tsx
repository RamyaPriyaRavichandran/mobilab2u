'use client'

import { ErrorMessage } from 'formik'

interface StyledFileUploadProps {
  label: string
  name: string
  setFieldValue: (field: string, value: any) => void
  required?: boolean
}

export default function StyledFileUpload({ label, name, setFieldValue, required = true }: StyledFileUploadProps) {
  return (
    <div className="flex-1">
      <label className="text-gray-700 font-medium mb-2 block text-sm md:text-base">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label className="flex items-center justify-between w-full cursor-pointer border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 hover:bg-gray-100 transition">
        <span className="text-gray-500 text-sm">Choose file...</span>
        <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-md">Browse</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFieldValue(name, file)
            }
          }}
          className="hidden"
        />
      </label>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  )
}
