import StatusBadge from '@/components/common/Badges/StatusBadge'
import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import MemberTable from './MembersTable'
import { useOnClickOutside } from 'usehooks-ts'
import { getLatestStatus } from '@/utils/functions'

export default function TestReviewPopup({
  setTest,
  test,
}: {
  setTest: Dispatch<SetStateAction<{ popup: boolean; test: any }>>
  test: any
}) {
  function onClose() {
    setTest({
      popup: false,
      test: { _id: '', statusTransaction: '' },
    })
  }
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white bg-opacity-90 p-8 m-2 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg max-w-2xl w-full"
      >
        <div className="flex space-x-3 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900  ">Test Details -</h2>
          <div className="text-gray-800 mt-1">{StatusBadge(getLatestStatus(test.test.statusTransaction))}</div>
        </div>
        {test?.test?.members?.length > 1 && <MemberTable members={test?.test?.members} />}

        {test.test?.reports?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Reports</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {test.test?.reports?.map((report: { s3URL: string; originalFileName: string }, index: number) => (
                <a
                  key={index}
                  target="_blank"
                  href={report.s3URL}
                  className="flex items-center p-4 border rounded-lg bg-blue-50 hover:bg-blue-100 shadow-sm transition hover:shadow-md text-blue-600 font-medium space-x-3"
                  rel="noopener noreferrer"
                  title={report.originalFileName}
                >
                  {/* Icon for file (uses a generic file icon, you can replace with a specific icon based on file type) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    <path
                      fillRule="evenodd"
                      d="M13 2v5h5l-5-5zm-1 13a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm1-6.732a.8.8 0 00-.6-.066.7.7 0 00-.4.266.8.8 0 00-.2.534v4.4c0 .2.067.4.2.534.134.134.3.2.4.266a.7.7 0 00.6-.066.8.8 0 00.4-.334c.133-.134.2-.334.2-.534v-4.4a.8.8 0 00-.2-.534.7.7 0 00-.4-.266z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* File name */}
                  <span className="truncate">{report.originalFileName.replace(/\.[^.]+$/, '')}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setTest({ popup: false, test: {} })}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}
