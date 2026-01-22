/* eslint-disable @next/next/no-img-element */
'use client'
import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import CanView from './CanView'
import Image from 'next/image'
import { HOME, SIDEBAR_LINKS } from '@/utils/constents/routes'

interface MobileSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export function MobileSidebar({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) {
  return (
    <div className="block md:hidden">
      <Dialog className="relative z-50" open={!sidebarOpen} onClose={setSidebarOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full lg:max-w-[270px] max-w-[250px] flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <div className="flex h-16 shrink-0 items-center mt-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Link href={HOME}>
                    <Image
                      src="/svgs/logo-m2u.svg"
                      width={192}
                      height={144}
                      priority
                      alt="Your Company"
                      className="md:h-36 md:w-48 w-32 h-24"
                    />
                  </Link>
                </div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="mx-2 space-y-1">
                      {SIDEBAR_LINKS.map((item, idx) => (
                        <li key={idx} onClick={() => setSidebarOpen(!sidebarOpen)}>
                          <CanView I={item.perms.action} a={item.perms.subject}>
                            <Link
                              href={item.path}
                              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            >
                              <item.icon className="h-6 w-6 shrink-0 text-black" aria-hidden="true" />
                              {item.name}
                            </Link>
                          </CanView>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-black "
                    >
                      <Cog6ToothIcon className="h-6 w-6 shrink-0 text-black" aria-hidden="true" />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
