'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Eye, X } from 'lucide-react'
import { GET_CONTACT_US_FORM } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'
import Table from '@/components/common/Tables'
import PageLoaderSVG from '@/components/common/PageLoaderSVG'
import { constructCustomerColumns, type TableColumnCustom, type TableData } from '@/utils'
import NoDataAvailable from '@/components/common/Nodate'

interface Ticket {
  _id: string
  name: string
  email: string
  location: string
  subject: string
  message: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface StateInterface {
  popup: boolean
  data: any
}

export default function TicketList() {
  const { data = [], isLoading } = useSWR(GET_CONTACT_US_FORM, fetcher<Array<Ticket>>())

  const [form, setForm] = useState<StateInterface>({ popup: false, data: {} })

  const tableColumns: TableColumnCustom[] = [
    {
      Header: 'No',
      accessor: 'No',
      Cell: ({ row: { index } }: TableData) => <div>{index + 1}</div>,
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'View',
      accessor: 'action',
      Cell: ({ row: { original } }: TableData) => (
        <button
          onClick={() => {
            setForm({ popup: true, data: original })
          }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="View ticket details"
        >
          <Eye className="w-5 h-5 text-blue-600" />
        </button>
      ),
    },
  ]

  const column = constructCustomerColumns(tableColumns)

  return (
    <div className="p-6">
      <div className="mb-4">
        {isLoading ? (
          <PageLoaderSVG />
        ) : data.length > 0 ? (
          <div>
            <Table columns={column} data={data} tableName="Customers" />
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-3xl ">Customers</h1>
            <NoDataAvailable />
          </div>
        )}
      </div>

      {form.popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setForm({ popup: false, data: {} })}
        >
          <div
            className="bg-card rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-border animate-in zoom-in-95 duration-200 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with gradient accent */}
            <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Ticket Details</h2>
                  <p className="text-sm text-muted-foreground mt-1">Customer inquiry information</p>
                </div>
                <button
                  onClick={() => setForm({ popup: false, data: {} })}
                  className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Modal Body with improved layout */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</label>
                    <p className="text-base text-foreground font-medium px-3 py-2 bg-muted/50 rounded-lg">
                      {form.data.name}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</label>
                    <p className="text-base text-foreground font-medium px-3 py-2 bg-muted/50 rounded-lg break-all">
                      {form.data.email}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Location
                    </label>
                    <p className="text-base text-foreground font-medium px-3 py-2 bg-muted/50 rounded-lg">
                      {form.data.location}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</label>
                    <p className="text-base text-foreground font-medium px-3 py-2 bg-muted/50 rounded-lg">
                      {form.data.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject</label>
                <p className="text-base text-foreground font-medium px-4 py-3 bg-primary/5 rounded-lg border border-primary/20">
                  {form.data.subject}
                </p>
              </div>

              {/* Message Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</label>
                <div className="px-4 py-4 bg-muted/30 rounded-lg border border-border">
                  <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{form.data.message}</p>
                </div>
              </div>

              {/* Metadata Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Submitted
                    </label>
                    <p className="text-sm text-foreground font-medium">
                      {new Date(form.data.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Active Ticket
                  </div> */}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
              <button
                onClick={() => setForm({ popup: false, data: {} })}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
