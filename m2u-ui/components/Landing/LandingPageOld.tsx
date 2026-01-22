/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { SP_REGISTER } from '@/utils/constents/routes'

const LandingPage = () => {
  return (
    <main>
      <div className="bg-white">
        <section>
          <div className="relative overflow-hidden">
            <svg className="absolute inset-0 z-[-10] h-full w-full stroke-gray-200" aria-hidden="true">
              <defs>
                <pattern id="pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="fill-gray-100">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-600 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth="0"
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern)" />
            </svg>

            {/* first Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:pt-40 py-20 sm:py-20 md:py-0 md:pt-32 ">
              <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
                  Welcome to Mobilab2u.com
                </h1>
                <p className="mt-6 text-md leading-8 text-gray-600">
                  The skills of medical practitioners have becoming an invaluable asset during the ongoing Covid-19
                  pandemic. With Mobilab2U, such practitioners can put their skills to good use while using it as a
                  means to supplement their incomes.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                  <Link
                    href={SP_REGISTER}
                    className=" rounded-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer px-6 py-3 text-sm font-semibold text-white shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Register
                  </Link>
                  <Link href="/learn-more" className="text-sm font-semibold leading-6 text-emerald-600 hover:underline">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="">
        {/* Wave SVG */}
        <div className="">
          <svg
            className="hidden md:block relative lg:top-0 w-full rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#10b981"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,202.7C384,203,480,149,576,128C672,107,768,117,864,117.3C960,117,1056,107,1152,106.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1048,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        {/* second Component */}
        <div className="-mt-1 flex items-center justify-center bg-emerald-500 text-white">
          <section className="max-w-6xl flex flex-col md:flex-row items-center mx-auto px-6 lg:px-8 py-10">
            <div>
              <h1 className="text-4xl font-bold mb-4">What is Mobilab2U.com ?</h1>
              <p className="text-lg mb-8">
                Mobilab2U is a new on-demand application that matches our willing partners with customers and patients
                who are looking to take time sensitive medical tests without having to track to hospitals, labs and
                clinics.
              </p>
              <h2 className="text-3xl font-bold mb-4">
                How does Mobilab2u partnership with service provider program works ?
              </h2>
              <p className="text-lg mb-8">
                By signing up to be our partner, you will be verified with your qualifications. Upon verification you
                will be purchasing medical test kits from us with a guaranteed return policy. All you have to do after
                that is to drive to a patient that you are matched with, carry out the test, and get the samples
                delivered to our lab partners or send to the collection centers.
              </p>
              <h3 className="text-3xl font-bold mb-4">Early bird special benefits</h3>
              <p className="text-lg mb-8">
                The first 1,000 service providers nationwide who sign up to be our partners will be automatically made
                company shareholders once it scales up for an Initial Public Offering (IPO). A sum of 10 percent of
                company shares will be distributed equally to our 1,000 partners, as a mark of appreciation for the
                growth that we are looking to achieve- together.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* <div className="space-y-6">
              <div className="flex items-start">
                <div>
                  <h3 className="text-xl font-semibold">Push to deploy</h3>
                  <p className="text-gray-200">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div>
                  <h3 className="text-xl font-semibold">SSL certificates</h3>
                  <p className="text-gray-200">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div>
                  <h3 className="text-xl font-semibold">Database backups</h3>
                  <p className="text-gray-200">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</p>
                </div>
              </div>
            </div> */}

      {/* third Component */}
      {/* <div id="whatWeDo" className=" py-16 rounded-xl">
        <div className="container mx-auto px-6 bottom-2">
          <svg
            className="absolute top-[50%] left-0 w-full rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#3b82f6"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,202.7C384,203,480,149,576,128C672,107,768,117,864,117.3C960,117,1056,107,1152,106.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1048,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg> */}

      {/* fifth component */}
      <div>
        <h1 className="text-4xl font-semibold text-gray-700 flex justify-center mt-10 mb-2">What we do?</h1>
        <div className="flex items-center justify-center mb-11 mr-1">
          <div className="border-t-2 border-teal-500 w-16"></div>
          <div className="h-4 w-4 bg-teal-500 transform rotate-45 mx-2"></div>
          <div className="border-t-2 border-teal-500 w-16"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 ">
          <div className="relative flex flex-col items-center text-center p-6 rounded-lg bg-emerald-50 shadow-md max-w-xs transition-transform transform hover:scale-105 hover:shadow-lg ">
            <div className="absolute inset-0 border-2 border-emerald-400 shadow-teal-400/50 rounded-lg transition-all duration-300 pointer-events-none"></div>

            <img
              src="/images/bloodtest.jpg"
              alt="Our Services"
              className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full "
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-3">Blood Test</h2>
            <p className="text-slate-800 text-md mb-6 text-justify mt-2">
              Duis Integration aute irure design in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non design proident.
            </p>
            <ul className="text-left text-gray-800 text-sm -mt-2 ">
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Exclusive design
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Lifetime supports
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Solve your problem with us
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                We Provide Awesome Services
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Your business deserves the best software
              </li>
            </ul>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-lg bg-emerald-50 shadow-md max-w-xs transition-transform transform hover:scale-105 hover:shadow-lg ">
            <div className="absolute inset-0 border-2 border-emerald-400 shadow-teal-400/50 rounded-lg  transition-all duration-300 pointer-events-none"></div>

            <img
              src="/images/pressure.jpg"
              alt="Our Services"
              className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full"
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-3">Blood Pressure</h2>
            <p className="text-slate-800 text-md mb-6 text-justify mt-2">
              Duis Integration aute irure design in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non design proident.
            </p>
            <ul className="text-left text-gray-800 text-sm -mt-2">
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Exclusive design
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Lifetime supports
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Solve your problem with us
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                We Provide Awesome Services
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Your business deserves the best software
              </li>
            </ul>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-lg bg-emerald-50 shadow-md max-w-xs transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="absolute inset-0 border-2 border-emerald-400 shadow-teal-400/50 rounded-lg  transition-all duration-300 pointer-events-none"></div>

            <img
              src="/images/sugar.jpg"
              alt="Our Services"
              className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full"
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-3">Sugar Test</h2>
            <p className="text-slate-800 text-md mb-6 text-justify  mt-2">
              Duis Integration aute irure design in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non design proident.
            </p>
            <ul className="text-left text-gray-800 text-sm -mt-2">
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Exclusive design
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Lifetime supports
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Solve your problem with us
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                We Provide Awesome Services
              </li>
              <li className="flex items-center ">
                <span className="mr-3 text-green-500 transition-transform transform hover:scale-110">☑</span>
                Your business deserves the best software
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* fourth Component */}
      <div id="learnMore" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in-up">
            Learn More Through Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="transition-transform transform hover:scale-105 animate-fade-in-up">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                src="https://www.youtube.com/embed/tSExfiYzKEk"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="transition-transform transform hover:scale-105 animate-fade-in-up">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                src="https://www.youtube.com/embed/h5T2nuaa2cU"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="transition-transform transform hover:scale-110 animate-fade-in-up">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                src="https://www.youtube.com/embed/IbMc6xdKYBc"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LandingPage
