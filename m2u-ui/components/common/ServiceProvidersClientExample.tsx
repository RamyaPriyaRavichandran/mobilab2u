'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetchers'
import { TEST_ENDPOINT } from '@/lib/endpoints'

const ServiceProvidersClientExample = () => {
  // Client side fetching using useSWR
  const { data, mutate, error } = useSWR(TEST_ENDPOINT, fetcher<any[]>())

  return (
    <section>
      <h1 className="text-2xl mb-4">Service Providers CSR</h1>
      <div className="inline-flex flex-col gap-4">
        {data?.map((user: any) => (
          <article key={user.id} className="rounded-lg bg-gray-100 shadow-md px-6 py-4">
            <header className="font-bold">{user.name}</header>
            <p>Email: {user.email}</p>
            <p>Phone: {user.email}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServiceProvidersClientExample
