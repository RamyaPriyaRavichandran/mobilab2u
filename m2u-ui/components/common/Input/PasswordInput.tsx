import { ErrorMessage, useField } from 'formik'
import React from 'react'
import { useState } from 'react'
import OpenEyeSVG from '../SVG/OpenEyeSVG'
import CloseEyeSVG from '../SVG/CloseEyeSVG'

export interface passwordInputProps {
  name?: string
  disabled?: boolean
  placeholder?: string
  inputstyle?: string
  type?: string
  id?: string
  label: string
}

export default function PasswordInput(props: passwordInputProps) {
  const [field] = useField(props.name || '')
  const [view, setView] = useState(false)

  return (
    <div>
      <div className="relative">
        <label className="text-sm font-semibold" htmlFor={props.label}>
          {props.label}
        </label>
        <input
          disabled={props.disabled}
          {...field}
          type={`${view ? 'text' : 'password'}`}
          name={props.name || ''}
          placeholder={props.placeholder || ''}
          className={`${
            props.inputstyle || 'w-full'
          } w-full py-1.5 border-2 text-black bg-transparent  rounded-md outline-none focus:border-2 focus:border-brand-700 mt-1 focus:ring-0 sm:text-sm pl-2 h-9 border-[#e5e7eb]`}
        />
        <div className="absolute top-[2.1rem] right-2">
          {view ? (
            <button type="button" className="text-gray-700 inline-block text-sm  " onClick={() => setView(!view)}>
              <CloseEyeSVG />
            </button>
          ) : (
            <button type="button" className="text-gray-700 inline-block text-sm " onClick={() => setView(!view)}>
              <OpenEyeSVG />
            </button>
          )}
        </div>
      </div>

      <ErrorMessage
        name={props.name || ''}
        component="div"
        className="text-red-500 absolute font-medium top-4.5 text-sm "
      />
    </div>
  )
}
