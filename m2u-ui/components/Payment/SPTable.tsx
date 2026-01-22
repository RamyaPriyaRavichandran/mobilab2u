import React from 'react'

const tableData = [
  '1. test kits (sample collection tubes)',
  '2. syringe needles with different sizes',
  '3. butterfly needle',
  '4. injection needles',
  '5. specimen container (urine or stool collections)',
  '6. cotton balls',
  '7. alcohol swab',
  '8. bandages/tape',
  '9. tourniquet',
  '10. sharp bin container (small size) easy to carry it along',
  '11. gloves with different sizes',
  '12. mask',
  '13. face shield',
  '14. apron',
  '15. Yellow back to collect sample and throw waste products/ transparent bag to collect and seal samples',
  '16. Ice packs and ice box',
  '17. Mobilab2u Carrying Bag (Cooler Bag) Size XL',
  '18. 2 days Training Program / Product / System',
]

interface SPTableProps {
  showMore: boolean
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

export function SPTable({ showMore, setShowMore }: SPTableProps) {
  const displayedData = showMore ? tableData : tableData.slice(0, 5)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-2 border-gray-300 text-left text-sm font-semibold uppercase">
              Medical Equipment and Training Programs
            </th>
            <th className="px-4 py-2 border-2 border-gray-300 text-center text-sm font-semibold uppercase">Unit</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-2 border-gray-300">{item}</td>
              {index === 0 && (
                <>
                  <td className="px-4 py-2 border-2 my-auto border-gray-300 text-center" rowSpan={displayedData.length}>
                    1 Unit
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button onClick={() => setShowMore(!showMore)} className="text-cyan-600 font-semibold hover:underline">
          {showMore ? 'View less' : 'View more'}
        </button>
      </div>
    </div>
  )
}
