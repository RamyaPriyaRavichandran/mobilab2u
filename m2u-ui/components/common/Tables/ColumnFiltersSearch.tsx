import React from 'react'

export default function ColumFiltersSearch({ column }: any) {
  const { setFilter } = column
  return (
    <input
      className="sm:text-sm rounded-lg outline-none dark:bg-white bg-gray-200 dark:bg-opacity-30 bg-opacity-100 dark:placeholder-slate-400 flex justify-start"
      placeholder="Search...."
      onChange={(e) => setFilter(e.target.value)}
    />
  )
}
