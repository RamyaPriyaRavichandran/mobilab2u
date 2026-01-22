interface PaginationProps {
  currentPage: number
  scollCss?: string
  totalPages: number
  onPageChange: (page: number) => void
}
export default function Pagination({ currentPage, totalPages, onPageChange, scollCss }: PaginationProps) {
  const pages = [...new Array(Number(totalPages) || 0).fill('')].map((_, idx) => idx)
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1)
        }}
        disabled={currentPage <= 1}
        className={`px-2 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-700 cursor-not-allowed text-xs'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs'
        }`}
      >
        &lt;
      </button>

      <div className={`flex ${scollCss}`}>
        {pages.map((p, index) => {
          const firstLast = p === 0 || p === pages[pages.length - 1]
          const pager =
            p !== 0 &&
            p !== pages[pages.length - 1] &&
            ((p >= currentPage && p <= currentPage + 1) || (p >= currentPage - 2 && p < currentPage))
          if (index === 0 || index === totalPages - 1 || (index >= currentPage - 2 && index <= currentPage + 1))
            return (
              <>
                {firstLast && (
                  <div
                    onClick={() => onPageChange(p + 1)}
                    className={`px-3 py-1 rounded-md  ${
                      currentPage === p + 1
                        ? 'bg-gray-200 text-gray-800 text-xs'
                        : 'bg-white text-gray-900 hover:bg-gray-100 text-xs'
                    }`}
                    key={index}
                  >
                    {p + 1}
                  </div>
                )}
                {pager && (
                  <div
                    onClick={() => onPageChange(p + 1)}
                    className={`px-3 py-1 flex rounded-md  ${
                      currentPage === p + 1
                        ? 'bg-gray-200 text-gray-800 text-xs'
                        : 'bg-white text-gray-900 hover:bg-gray-100 text-xs'
                    }`}
                    key={p}
                  >
                    <p>{currentPage - 1 === p && <> ... </>}</p>
                    <p>{p + 1}</p>

                    <p>{currentPage + 1 === p && <> ... </>}</p>
                  </div>
                )}
              </>
            )
        })}
      </div>

      <button
        onClick={() => {
          if (totalPages > currentPage) onPageChange(currentPage + 1)
        }}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded-md  ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-700 text-xs cursor-not-allowed'
            : 'bg-gray-100 text-gray-700  text-xs hover:bg-gray-100'
        }`}
      >
        &gt;
      </button>
    </div>
  )
}
