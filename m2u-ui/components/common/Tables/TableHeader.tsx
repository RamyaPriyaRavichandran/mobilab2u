export function TableHeader({ headerGroups }: { headerGroups: Array<any> }) {
  return (
    <thead className="rounded-2xl">
      {headerGroups.map((headerGroup: any, index: number) => {
        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
        return (
          <tr key={key || index} {...restHeaderGroupProps}>
            {headerGroup.headers.map((column: any, colIndex: number) => {
              const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps())
              return (
                <th
                  key={columnKey || colIndex}
                  className="px-2 py-3.5 bg-brand-500 bg-opacity-20 text-black text-center text-sm font-semibold "
                  {...restColumnProps}
                >
                  {column.render('Header')}
                  <div>{column.canFilter && column.Filter && column?.render('Filter')}</div>
                </th>
              )
            })}
          </tr>
        )
      })}
    </thead>
  )
}
