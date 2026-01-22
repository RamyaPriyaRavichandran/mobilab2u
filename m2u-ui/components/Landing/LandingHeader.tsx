'use client'

import React, { useRef, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils'
import { usePathname } from 'next/navigation'
import {
  ABOUT_US,
  CONTACT_US,
  HOME,
  LOGIN_ROUTES,
  PURCHASEABLE_PACKAGES,
  SERVICES,
  SP_LOGIN,
} from '@/utils/constents/routes'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useOnClickOutside } from 'usehooks-ts'
import { ProfilePopup } from '../common/Header'
import { motion } from 'framer-motion'

function LandingHeader({ landing = false }: { landing?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [popup, setPopup] = useState(false)
  const path = usePathname()
  const { user = {}, loggedIn } = useAuth()
  const navigation = [
    {
      name: 'Home',
      href: LOGIN_ROUTES[user?.userRole],
    },
    { name: 'About us', href: ABOUT_US },
    { name: 'Contact us', href: CONTACT_US },
    { name: 'Services', href: SERVICES },
    { name: 'Packages', href: PURCHASEABLE_PACKAGES },
  ]

  const modalRef = useRef(null)
  const handleClickOutside = () => {
    setPopup(false)
  }
  useOnClickOutside(modalRef, handleClickOutside)
  return (
    <header className={cn(landing && 'absolute inset-x-0 top-0 z-50 mx-6 md:mx-0')}>
      <nav aria-label="Global" className="flex items-center justify-between lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Mobilab2u</span>
            <Image
              src="/svgs/logo-m2u.svg"
              width={192}
              height={144}
              priority
              alt="Mobilab2u"
              className="md:h-32 md:w-32 h-24 w-24  object-contain"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6 mr-3" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden -mt-8 lg:flex lg:flex-1 lg:justify-end">
          {loggedIn ? (
            <div ref={modalRef}>
              <div className="hover:cursor-pointer py-1.5 mt-2 rounded-md">
                <div className="flex items-center" onClick={() => setPopup(!popup)}>
                  <div className="flex justify-center">
                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                      <p className="text-center mt-0.5 font-bold text-xl">{user?.name?.slice(0, 1)}</p>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user?.name}</p>
                  </div>
                </div>
              </div>
              {popup && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <ProfilePopup userDetail={user} setPopup={setPopup} popup={popup} />
                </motion.div>
              )}
            </div>
          ) : path === SP_LOGIN ? (
            <Link href={HOME} className="text-sm font-semibold leading-6 text-gray-900">
              Home <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <div className="mt-6">
              <Link
                href={SP_LOGIN}
                className="text-sm px-3 py-2 font-semibold leading-6 text-white bg-brand-400 hover:bg-brand-500 rounded-md shadow-md "
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mobilab2u</span>
              <Image
                src="/svgs/logo-m2u.svg"
                width={192}
                height={144}
                priority
                alt="Mobilab2u"
                className="h-32 w-32 object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 mr-3" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div onClick={() => setMobileMenuOpen(false)} className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={SP_LOGIN}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default LandingHeader
