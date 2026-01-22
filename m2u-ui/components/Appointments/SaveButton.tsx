import React from 'react'

export default function SaveButton({ onClick, name }: { onClick: () => void; name: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 hover:border-green-700 text-white  border-[2px] border-green-500 px-4 py-1 rounded-md "
    >
      {name}
    </button>
  )
}
