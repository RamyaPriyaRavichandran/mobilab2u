export function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
}: {
  getTableBodyProps: Function
  page: Array<any> // Adjusted to Array<any> to handle row objects
  prepareRow: Function
}) {
  return (
    <tbody className="divide-y divide-gray-200 bg-brand-400 bg-opacity-5" {...getTableBodyProps()}>
      {page?.length > 0 ? (
        page.map((row: any, rowIndex: number) => {
          prepareRow(row)

          const { key: rowKey, ...restRowProps } = row.getRowProps() // Extracting the key from the row props
          return (
            <tr key={rowKey || rowIndex} {...restRowProps}>
              {row.cells.map((cell: any, cellIndex: number) => {
                const { key: cellKey, ...restCellProps } = cell.getCellProps() // Extracting the key from the cell props
                return (
                  <td
                    key={cellKey || cellIndex}
                    className="whitespace-nowrap text-center underline-offset-2 px-2 text-sm py-4"
                    {...restCellProps}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })
      ) : (
        <tr>
          <td className="col-span-2">No Data Found</td>
        </tr>
      )}
    </tbody>
  )
}
