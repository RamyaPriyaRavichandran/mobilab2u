import React from 'react'
import Image from 'next/image'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const Failure = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative mb-4 border rounded-xl shadow-lg bg-white w-[400px] h-[500px]  p-8 flex flex-col items-center">
        <div className="flex flex-col items-center flex-grow justify-center">
          <div className="flex justify-center items-center mb-20 -mt-2">
            <Image src="/images/failure.jpeg" width={150} height={150} priority alt="Failure" />
          </div>

          <h1 className="text-2xl font-semibold text-red-600 text-center mb-5">Payment Failed!</h1>

          <p className="text-md text-gray-600 text-center -mb-2">Please try again!</p>
        </div>

        <div className="flex gap-4 mt-auto">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded-full border-2 border-red-500 flex items-center">
              <ArrowPathRoundedSquareIcon className="h-5 w-5 mr-2 animate-spin" />
              Try Again
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 text-red-500 font-semibold bg-white rounded-full border-2 border-red-500 flex items-center">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Failure
