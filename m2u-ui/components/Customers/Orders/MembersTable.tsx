import React from 'react'
import { useTable, Column } from 'react-table'

interface Member {
  name: string
  age: number
  gender: string
}

interface MemberTableProps {
  members?: Member[]
}

const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
  // Define columns for react-table
  const columns: Column<Member>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // Accessor is the "key" in the data
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
    ],
    []
  )

  // Provide default empty array if members is undefined
  const data = React.useMemo(() => members || [], [members])

  // Use react-table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Member>({
    columns,
    data,
  })

  // Render the table
  return (
    <>
      {data.length > 0 ? (
        <div className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 underline">Members</h3>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-brand-100">
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                    {headerGroup.headers.map((column, colIndex) => (
                      <th
                        {...column.getHeaderProps()}
                        key={`header-${colIndex}`}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} key={`row-${rowIndex}`} className="hover:bg-gray-50">
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps()}
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="px-4 py-2 text-sm text-gray-600 border-b"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm"></p>
      )}
    </>
  )
}

export default MemberTable
