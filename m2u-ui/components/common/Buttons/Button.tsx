import React from 'react'
interface buttonInterface {
  onClick: () => void
  buttonStyle?: string
  buttonName: string
  disabled?: boolean
}
export default function Button({ onClick, buttonStyle, buttonName, disabled }: buttonInterface) {
  return (
    <>
      <button
        type="button"
        className={`bg-white border px-4 py-1 rounded-md mr-2 ${buttonStyle ? buttonStyle : 'text-blue-500 border-blue-500'}`}
        // className="bg-white text-brand-400 border border-brand-400 px-4 py-1 rounded-md mr-2"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonName}
      </button>
    </>
  )
}
