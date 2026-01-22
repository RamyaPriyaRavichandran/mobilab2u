import React, { useState } from 'react'

type PeriodData = {
  appointments: number
  labtests: number
  earnings: string
}

type Data = {
  day: PeriodData
  month: PeriodData
  year: PeriodData
}
const CountsByPeriod = ({
  walletbalance,
  appointmentCounts: { dailyCount = 0, monthlyCount = 0, yearlyCount = 0 },
  labtestsCounts: { labDailyCount = 0, labMonthlyCount = 0, labYearlyCount = 0 },
}: any) => {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('day')

  const data: Data = {
    day: { appointments: dailyCount, labtests: labDailyCount, earnings: walletbalance },
    month: { appointments: monthlyCount, labtests: labMonthlyCount, earnings: walletbalance },
    year: { appointments: yearlyCount, labtests: labYearlyCount, earnings: walletbalance },
  }

  return (
    <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-medium mb-2">Counts By Period</h3>

      {/* Period Selection Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        {['day', 'month', 'year'].map((p) => (
          <button
            key={p}
            className={`px-6 py-2 rounded-lg transition-all ${
              period === p ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setPeriod(p as 'day' | 'month' | 'year')}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Display in Horizontal Row */}
      <div className="flex flex-wrap justify-between gap-4">
        {Object.entries(data[period]).map(([key, value]) => (
          <div key={key} className="flex-1 min-w-[150px] bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountsByPeriod
