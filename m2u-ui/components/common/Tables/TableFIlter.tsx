import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export default function TableFilter({
  columnFilter,
  button,
  button1,
  tableFilters,
  setTable,
  tableOptions,
  path,
  pathName,
}: {
  columnFilter?: boolean
  button?: boolean
  button1?: boolean
  tableFilters?: boolean
  setTable: Dispatch<SetStateAction<string>>
  tableOptions?: Array<string>
  path?: string
  pathName?: string
}) {
  const options = tableOptions || []
  const Router = useRouter()
  return (
    <div
      className={`${
        columnFilter || button || button1
          ? 'md:flex space-y-5 md:space-y-0 justify-between'
          : 'md:flex md:justify-end md:space-x-5'
      }`}
    >
      {tableFilters && (
        <div className="flex space-x-1">
          <p className="mt-0.5">Table Filters :</p>
          <select
            className="h-8 sm:text-sm ml-2 px-2 rounded-lg outline-none dark:bg-white bg-gray-200 dark:bg-opacity-30 bg-opacity-100 border border-brand-400 dark:placeholder-slate-400"
            id=""
            onClick={(e: any) => setTable(e.target.value)}
          >
            {options.map((op: string, idx: number) => (
              <option value={idx} key={idx}>
                {op}
              </option>
            ))}
          </select>
        </div>
      )}
      {path && (
        <div>
          <button className="bg-other-lightred py-1.5 px-4 text-white rounded-md" onClick={() => Router.push(path)}>
            {pathName}
          </button>
        </div>
      )}
    </div>
  )
}
