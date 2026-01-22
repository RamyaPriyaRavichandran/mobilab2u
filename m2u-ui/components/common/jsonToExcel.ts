/**
 * Converts JSON data to CSV format and triggers a download
 *
 * @param json - The JSON data to convert (array of objects)
 * @param fileName - The name for the downloaded file (without extension)
 * @returns void
 */
export function JsonToExcel(json: any[], fileName: string): void {
  if (!json || !json.length) {
    console.error('No data provided for export')
    return
  }

  const fields = Object.keys(json[0].original || json[0])

  // Format header titles to be more readable (first letter capital, rest lowercase)
  const formattedHeaders = fields.map(formatHeaderTitle)

  const escapeCsvValue = (value: any): string => {
    if (value === null || value === undefined) return ''

    let stringValue = ''

    if (Array.isArray(value)) {
      stringValue = value.join(', ')
    } else {
      stringValue = String(value)
    }

    // Escape quotes and wrap in double quotes if needed
    if (/[",\n\r]/.test(stringValue)) {
      stringValue = `"${stringValue.replace(/"/g, '""')}"`
    }

    return stringValue
  }

  const csvRows = json.map((row: any) => {
    const rowData = row.original || row
    return fields.map((field) => escapeCsvValue(rowData[field])).join(',')
  })

  // Add UTF-8 BOM and header
  const csvString = `\uFEFF${formattedHeaders.join(',')}\r\n${csvRows.join('\r\n')}`
  DownloadToCsv(csvString, fileName)
}

/**
 * Formats a header title to be more readable
 * - Converts camelCase or snake_case to separate words
 * - Capitalizes each word
 *
 * @param header - The original header string
 * @returns The formatted header string
 */
function formatHeaderTitle(header: string): string {
  const withSpaces = header.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Creates a CSV blob and triggers a download
 *
 * @param data - The CSV data as a string
 * @param fileName - The name for the downloaded file (without extension)
 * @returns void
 */
function DownloadToCsv(data: string, fileName: string): void {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.download = `${fileName}.csv`
  a.href = url
  a.style.display = 'none'

  document.body.appendChild(a)
  a.click()

  a.remove()
  URL.revokeObjectURL(url)
}
