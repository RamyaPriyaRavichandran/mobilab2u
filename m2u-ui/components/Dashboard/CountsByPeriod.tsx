import React, { useState } from 'react'

type PeriodData = {
  appointments: number
  operations: number
  newPatients: number
  earnings: string
}

type Data = {
  day: PeriodData
  week: PeriodData
  month: PeriodData
}

const CountsByPeriod = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day')

  const data: Data = {
    day: { appointments: 20, operations: 5, newPatients: 10, earnings: '$1,000' },
    week: { appointments: 140, operations: 35, newPatients: 70, earnings: '$7,000' },
    month: { appointments: 600, operations: 150, newPatients: 300, earnings: '$30,000' },
  }

  return (
    <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">Counts By Period</h3>
      <div className="flex space-x-4 mb-4">
        {['day', 'week', 'month'].map((p: any) => (
          <button
            key={p}
            className={`px-4 py-2 rounded ${period === p ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPeriod(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {Object.entries(data[period]).map(([key, value]) => (
          <div key={key} className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountsByPeriod
