import { useField } from 'formik'
import React, { useRef } from 'react'

export interface inputProps {
  name: string
  disabled?: boolean
  inputstyle?: string
  id?: string
  label?: string
  maxFile?: number
  fileLimit: number
  fileSize?: number
}

export default function MultiFileUpload(props: inputProps) {
  const [_, { value: files = [], error }, helpers] = useField(props.name || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileSize = props.fileSize || 2
  const removeFileFromInput = (updatedFiles: Array<File>) => {
    const dataTransfer = new DataTransfer()
    updatedFiles.forEach((file: File) => dataTransfer.items.add(file))
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files
    }
  }

  const hendleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    const maxSize = fileSize * 1024 * 1024
    const existingFiles = files || []
    const combinedFiles = existingFiles.concat(newFiles)

    const uploadFiles = combinedFiles.filter((file: File) => file.size <= maxSize).slice(0, props.fileLimit || 4)

    const dataTransfer = new DataTransfer()
    uploadFiles.forEach((file: any) => dataTransfer.items.add(file))
    removeFileFromInput(uploadFiles)

    helpers.setValue(uploadFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_: any, i: number) => i !== index)
    helpers.setValue(updatedFiles)
    removeFileFromInput(updatedFiles)
  }

  function formatFileSize(size: number) {
    if (size < 1024) return `${size} bytes`
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  function removeAll() {
    if (files.length >= 0) {
      helpers.setValue([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="relative">
      <div>
        <label className="text-sm font-semibold" htmlFor={props.label || 'Label'}>
          {props.label || 'Label'}
        </label>
      </div>
      <div className="mt-1 w-full flex  shadow-sm border-2 border-[#e5e7eb]  rounded-md md:ml-0 ml-0">
        <div className="relative flex-grow focus-within:z-10">
          <label className="w-full rounded-none rounded-l-md absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M14 13.5V8a4 4 0 1 0-8 0v5.5a6.5 6.5 0 1 0 13 0V4h2v9.5a8.5 8.5 0 1 1-17 0V8a6 6 0 1 1 12 0v5.5a3.5 3.5 0 0 1-7 0V8h2v5.5a1.5 1.5 0 0 0 3 0z" />
            </svg>
            <span
              className="text-md font-semibold text-gray-400 ml-1 truncate w-10/12"
              data-toggle="tooltip"
              title={'Choose file'}
            >
              {`${files.length >= 1 ? `${files.length} files` : 'Choose files'}`}
            </span>
            <input
              type="file"
              accept=".jpeg,.jpg,.png,.csv,.pdf,.txt,.docs"
              multiple
              className="hidden rounded-md"
              onChange={hendleFileChange}
            />
          </label>
        </div>
        <div className="relative inline-flex items-center">
          <span className="-ml-px relative inline-flex items-center px-4 py-2 text-sm text-gray-400 leading-5 font-medium rounded-r-md"></span>

          <button
            aria-label="Close"
            type="button"
            onClick={removeAll}
            className="-ml-px relative text-gray-700 inline-flex items-center px-4 py-2 text-sm leading-5 font-medium rounded-r-md focus:outline-none focus:shadow-outline-blue"
          >
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <p className="text-gray-400 text-sm mt-3">
        Maximum {props.fileLimit} files can be uploaded, each not exceeding {fileSize} MB, File longer then {fileSize}{' '}
        MB should not uploaded
      </p>
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {files.map((file: File, idx: number) => (
          <div key={idx}>
            <SelectedFiles idx={idx} file={file} removeFile={removeFile} formatFileSize={formatFileSize} />
          </div>
        ))}
      </section>
    </div>
  )
}

function SelectedFiles({
  removeFile,
  file,
  formatFileSize,
  idx,
}: {
  file: File
  idx: number
  removeFile: Function
  formatFileSize: Function
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-300 p-2 rounded-md shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <p className="text-[11px]  text-gray-700">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeFile(idx)}
        className="text-sm font-semibold text-red-600 hover:text-red-800"
      >
        <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
        </svg>
      </button>
    </div>
  )
}
