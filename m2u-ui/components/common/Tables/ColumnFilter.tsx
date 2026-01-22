import React, { useState } from 'react'

export default function ColumnFilter({ filter, column, setFilter, options = [] }: any) {
  const [option, setOption] = useState('')

  const showFilter = () => {
    return setFilter(option)
  }
  return (
    <div className="space-x-6">
      <select
        className="border border-heading rounded-md py-1.5 w-[170px]  "
        value={option || ''}
        onChange={(e: any) => setOption(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => showFilter()} className="bg-brand-300 text-white px-4 py-1.5 rounded-md">
        Filter
      </button>
    </div>
  )
}
