import React from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table'
import GlobalFIlter from './GlobalFIlter'
import { TablePagination } from './TablePagination'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import TableFilter from './TableFIlter'
import { JsonToExcel } from '../jsonToExcel'
import ExportSVG from '../SVG/ExportSvg'

export default function Table({
  data = [],
  columns = [],
  columnFilter,
  button,
  button1,
  path,
  setTable,
  exportExcel,
  excelExportName = 'Reports',
  tableOptions = [],
  tableFilters,
  pathName,
  tableName,
}: {
  data: Array<any>
  columns: Array<any>
  columnFilter?: boolean
  options?: Array<any>
  button?: boolean
  button1?: boolean
  path?: string
  exportExcel?: boolean
  excelExportName?: string
  pathName?: string
  tableFilters?: boolean
  tableOptions?: Array<string>
  setTable?: void | any
  tableName: string
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions: pages,
    state,
    gotoPage,
    pageCount,
    setGlobalFilter,
    setPageSize,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } as object,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { pageIndex, pageSize }: { pageIndex: number; pageSize: number } = state
  const { globalFilter }: { globalFilter: void } = state

  return (
    <div className="mt-8 max-w-full min-w-full">
      <TableFilter
        columnFilter={columnFilter}
        button={button}
        button1={button1}
        tableFilters={tableFilters}
        setTable={setTable}
        tableOptions={tableOptions || []}
        path={path}
        pathName={pathName}
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
        <p className="font-semibold text-2xl ml-2">{tableName}</p>

        <div className="flex items-center gap-2">
          {data.length >= 1 && (
            <div className="w-64">
              <GlobalFIlter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          )}

          {exportExcel && (
            <button
              onClick={() => JsonToExcel(rows, `${excelExportName}`)}
              className="flex items-center gap-1 px-2 py-2  rounded-lg text-gray-600 mt-6"
            >
              <ExportSVG />
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="inline-block max-w-full rounded-lg min-w-full align-middle">
        <div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-brand-700 scrollbar-track-gray-100">
          <table
            className="max-w-full mx-auto min-w-full mt-5 border-2 bg-gray-50 divide-y divide-gray-300"
            {...getTableProps()}
          >
            <TableHeader headerGroups={headerGroups} />
            <TableBody getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow} />
          </table>
        </div>

        <div className=" bottom-0 z-20">
          <TablePagination
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            gotoPage={gotoPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            rows={rows}
            pageCount={pageCount}
            previousPage={previousPage}
            pages={pages}
            pageIndex={pageIndex}
            nextPage={nextPage}
          />
        </div>
      </div>
    </div>
  )
}
