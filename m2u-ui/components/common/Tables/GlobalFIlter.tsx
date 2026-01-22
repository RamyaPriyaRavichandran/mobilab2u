import React from 'react'

export default function GlobalFIlter({ filter, setFilter }: any) {
  return (
    <div>
      Search
      <input
        className="sm:text-sm  py-2 px-2 rounded-md outline-none bg-gray-100 bg-opacity-100 border-gray-300 border-2 focus:border-brand-700 focus:ring-0 focus:border-2"
        placeholder="Search...."
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  )
}
