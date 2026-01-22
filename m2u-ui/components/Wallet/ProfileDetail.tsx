import React from 'react'

export default function ProfileDetail({ onChange }: { onChange: () => void }) {
  return (
    <div>
      {' '}
      <div className="p-4 bg-white shadow-lg h-full rounded-xl text-center relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile</h2>
        <button onClick={onChange} className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full">
          ✏️
        </button>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-gray-500">johndoe@example.com</p>
          <p className="text-gray-500">+123 456 7890</p>
          <p className="text-gray-500">123 Main St, City</p>
        </div>
      </div>
    </div>
  )
}
