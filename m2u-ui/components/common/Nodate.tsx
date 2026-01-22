import React from 'react'
import Image from 'next/image'

export default function NoDataAvailable() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <Image height={400} width={400} src="/images/NoData2.svg" alt="No Data" className="mb-4 object-contain" />
      <p className="text-lg text-gray-600">Data not found</p>
    </div>
  )
}
