import { useField, ErrorMessage } from 'formik'
import React from 'react'

const CheckboxInput = ({ ...props }: any) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.

  // Formik does this too! When you specify `type` to useField(), it will

  // return the correct bag of props for you

  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="checkbox"
          {...field}
          {...props}
          checked={meta.value === true ? true : false}
          // onChange={(e) => {
          //   helpers.setValue(meta.value === true ? false : true)
          //   props.onChange(e)
          // }}
          className="mt-2.5 rounded-[4px] p-2 w-4 focus:ring-brand-700 text-brand-700"
        />
        <div className="mt-2">
          <label className="checkbox text-sm ml-1 font-semibold">{props.label}</label>
        </div>
      </div>
      <div className="absolute top-18">
        <ErrorMessage component="div" name={props.name} className="text-sm text-red-500" />
      </div>
    </div>
  )
}

export default CheckboxInput
