import React from 'react'

export default function AppointmentDetailLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {Array.from({ length: 11 }).map((_, index) => (
        <div key={index} className="animate-pulse flex">
          <p className="font-semibold w-[200px] col-span-2 bg-gray-300 h-5 rounded"></p>
          <p className="col-span-3 w-full bg-gray-200 h-5 ml-1 rounded"></p>
        </div>
      ))}
    </div>
  )
}
