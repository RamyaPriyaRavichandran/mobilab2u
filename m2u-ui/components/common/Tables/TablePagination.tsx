import { Dispatch, Fragment, SetStateAction } from 'react'
import React from 'react'

export function TablePagination({
  canNextPage,
  canPreviousPage,
  gotoPage,
  pageSize,
  setPageSize,
  rows,
  pageCount,
  previousPage,
  pages,
  pageIndex,
  nextPage,
}: {
  canNextPage: boolean
  nextPage: Function
  gotoPage: Dispatch<SetStateAction<number>>
  canPreviousPage: boolean
  pageIndex: number
  pageSize: number
  pages: Array<number>
  previousPage: Function
  pageCount: number
  setPageSize: Dispatch<SetStateAction<number>>
  rows: Array<any>
}) {
  return (
    <div className="sticky bottom-0 bg-lightBG-600 py-2.5 mt-5 flex justify-between space-x-2 pr-2 cursor-pointer z-20 shadow-sm">
      <div className="flex justify-between">
        <button
          className={`${
            canPreviousPage ? 'bg-brand-700 bg-opacity-20' : 'bg-gray-100'
          } text-brand-700 py-2 px-3 rounded-md `}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <select
          className="mt-1 ml-2 py-0.5 text-brand-700 sm:mt-0 sm:text-sm rounded-sm bg-white border-0 focus:ring-1 focus:ring-brand-700 focus:ring-opacity-20 hidden md:block"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[3, 5, 10, 20, 30, 40, 50, rows.length].map((size, index: number) => (
            <option key={index} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          className={`bg-white text-brand-700 px-1 rounded-md`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <span>
          <div className="flex space-x-2 mt-2">
            {pages.map((p: number) => {
              const firstLast = p === 1 || p === pages[pages.length - 1]
              const pager =
                p !== 1 &&
                p !== pages[pages.length - 1] &&
                ((p >= pageIndex && p <= pageIndex + 2) || (p >= pageIndex - 2 && p < pageIndex))
              return (
                <Fragment key={p}>
                  {firstLast && (
                    <div
                      onClick={() => gotoPage(p)}
                      className={`${
                        p === pageIndex
                          ? 'text-brand-700 rounded-sm bg-brand-700 bg-opacity-20'
                          : 'text-brand-700 bg-white'
                      } px-2`}
                    >
                      {p + 1}
                    </div>
                  )}
                  {pager && (
                    <div
                      onClick={() => gotoPage(p)}
                      className={`${
                        p === pageIndex
                          ? 'text-brand-700 rounded-sm bg-brand-700 bg-opacity-20'
                          : 'text-brand-700 bg-white'
                      } px-2`}
                    >
                      {pageIndex - 2 === p && <> ... </>}
                      {p + 1}
                      {pageIndex + 2 === p && <> ... </>}
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        </span>
        <button
          className={`bg-white text-brand-700 px-1 rounded-md`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
      </div>

      <button
        className={`${canNextPage ? 'bg-brand-700 bg-opacity-20' : 'bg-gray-100'} text-brand-700 py-2 px-3 rounded-md`}
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>
    </div>
  )
}
