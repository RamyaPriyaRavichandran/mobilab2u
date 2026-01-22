/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import SparklesText from '../Animation/SparklesText'

export default function Products() {
  return (
    <>
      <div className="flex justify-center py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-center items-center max-w-6xl w-full h-auto lg:h-[400px]">
          <div className="flex flex-col justify-center h-full w-full lg:w-1/2 px-8 text-center lg:text-left mb-8 lg:mb-0">
            <SparklesText text="Products" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4" />
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Welcome to Our Company! We are dedicated to providing the best service possible. We are Working On it...
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/svgs/about-us.svg"
              width={400}
              height={400}
              priority
              alt="About us"
              className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
}
