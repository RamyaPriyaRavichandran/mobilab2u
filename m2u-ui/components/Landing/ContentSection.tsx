import Image from 'next/image'

export default function ContentSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4 space-y-6">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-brand-600">About Mobilab2u</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What is Mobilab2U.com ?
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-700 lg:max-w-lg">
                Mobilab2U is a new on-demand application that matches our willing partners with customers and patients
                who are looking to take time sensitive medical tests without having to track to hospitals, labs and
                clinics.
              </p>
            </div>
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How does our partnership program works ?
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-700 lg:max-w-lg">
                By signing up to be our partner, you will be verified with your qualifications. Upon verification you
                will be purchasing medical test kits from us with a guaranteed return policy. All you have to do after
                that is to drive to a patient that you are matched with, carry out the test, and get the samples
                delivered to our lab partners or send to the collection centers.
              </p>
            </div>
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Early bird special benefits
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-700 lg:max-w-lg">
                The first 1,000 service providers nationwide who sign up to be our partners will be automatically made
                company shareholders once it scales up for an Initial Public Offering (IPO). A sum of 10 percent of
                company shares will be distributed equally to our 1,000 partners, as a mark of appreciation for the
                growth that we are looking to achieve- together.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image alt="" src="/images/sample-check.png" width={657} height={599} className="rounded-xl" />
        </div>
      </div>
    </section>
  )
}
