'use client'
import { type ReactNode, useState } from 'react'

import Footer from './Footer'
import CustomerSidebar from './NewSideBar'
import Header from './Header'

export default function ProtectedLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-[280px] xl:ml-[310px]' : 'ml-0'}`}
      >
        <div className="sticky top-0 z-10 h-16 items-center border-2 border-l-0 border-gray-200 bg-white px-4 shadow-sm lg:px-5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <main className="min-h-screen">
          <div className="min-h-screen">{children}</div>
          <Footer />
        </main>
      </div>
    </>
  )
}
