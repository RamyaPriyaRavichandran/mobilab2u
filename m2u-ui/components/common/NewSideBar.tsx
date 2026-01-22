'use client'

import { type Dispatch, type SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CONSULTATION_APPOINTMENTS,
  CUSTOMER_DASHBOARD,
  CUSTOMER_ORDERS,
  CUSTOMER_PURCHASED,
  CUSTOMER_TABLE,
  DOCTOR_CALENDER,
  GP_LIST,
  HOME,
  LABS,
  PACKAGE_DETAILS,
  PACKAGES,
  PURCHASED_MEDICINES,
  REGISTRATION,
  SP_LIST,
  TICKETS,
  USER_PROFILE,
  WALLET,
  WALLET_REDEEMS,
} from '@/utils/constents/routes'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import CanView from './CanView'

interface CustomerSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function CustomerSidebar({ sidebarOpen, setSidebarOpen }: CustomerSidebarProps) {
  useEffect(() => {
    const setInitialState = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    setInitialState()
    window.addEventListener('resize', setInitialState)
    return () => window.removeEventListener('resize', setInitialState)
  }, [setSidebarOpen])

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  const menuItems = [
    {
      id: 1,
      icon: 'dashboard.svg',
      label: 'Dashboard',
      href: REGISTRATION,
      perms: {
        subject: SUBJECTS.Package,
        action: ACTIONS.PAY_SERVICE_PROVIDER_FEE,
      },
    },
    {
      id: 2,
      icon: 'customers.svg',
      label: 'Profile',
      href: USER_PROFILE,
      perms: {
        subject: SUBJECTS.User,
        action: ACTIONS.PROFILE_UPDATE,
      },
    },
    {
      label: 'Service Providers',
      id: 3,
      icon: 'service-provider.svg',
      href: SP_LIST,
      perms: {
        subject: SUBJECTS.ServiceProvider,
        action: ACTIONS.VIEW_ALL,
      },
    },
    {
      label: 'G.P Partners',
      id: 4,
      icon: 'gp-partner.svg',
      href: GP_LIST,
      perms: {
        subject: SUBJECTS.ServiceProvider,
        action: ACTIONS.VIEW_ALL,
      },
    },
    {
      label: 'Customers',
      id: 5,
      icon: 'customers.svg',
      href: CUSTOMER_TABLE,
      perms: {
        subject: SUBJECTS.Customer,
        action: ACTIONS.VIEW_ALL,
      },
    },
    {
      label: 'Labs',
      id: 6,
      icon: 'labs.svg',
      href: LABS,
      perms: {
        subject: SUBJECTS.Lab,
        action: ACTIONS.CREATE,
      },
    },
    {
      label: 'Packages',
      id: 7,
      icon: 'package.svg',
      href: PACKAGE_DETAILS,
      perms: {
        subject: SUBJECTS.Payment,
        action: ACTIONS.PAY_LAB_TEST_PAYMENT,
      },
    },
    {
      label: 'Packages',
      id: 8,
      icon: 'package.svg',
      href: PACKAGES,
      perms: {
        subject: SUBJECTS.Package,
        action: ACTIONS.CREATE,
      },
    },
    {
      label: 'Purchased Tests',
      id: 9,
      icon: 'tests.svg',
      href: CUSTOMER_PURCHASED,
      perms: {
        subject: SUBJECTS.Test,
        action: ACTIONS.ADMIN_VIEW,
      },
    },
    {
      label: 'Availablity Calender',
      id: 10,
      icon: 'availability-calendar.svg',
      href: DOCTOR_CALENDER,
      perms: {
        subject: SUBJECTS.GPPartner,
        action: ACTIONS.UPDATE,
      },
    },
    {
      label: 'Appointments',
      id: 11,
      icon: 'appointments.svg',
      href: CONSULTATION_APPOINTMENTS,
      perms: {
        subject: SUBJECTS.Appointment,
        action: ACTIONS.VIEW_ALL,
      },
    },
    {
      label: 'Purchased Medicines',
      id: 12,
      icon: 'purchased-medicine.svg',
      href: PURCHASED_MEDICINES,
      perms: {
        subject: SUBJECTS.AppointmentPrescription,
        action: ACTIONS.APPROVE,
      },
    },

    {
      label: 'Wallet redeems',
      id: 13,
      icon: 'wallet-redeem.svg',
      href: WALLET_REDEEMS,
      perms: {
        subject: SUBJECTS.Wallet,
        action: ACTIONS.REVIEW,
      },
    },
    {
      label: 'Tests',
      id: 14,
      icon: 'tests.svg',
      href: CUSTOMER_ORDERS,
      perms: {
        subject: SUBJECTS.Test,
        action: ACTIONS.VIEW_ALL,
      },
    },

    {
      label: 'Wallet',
      id: 15,
      icon: 'wallet.svg',
      href: WALLET,
      perms: {
        subject: SUBJECTS.User,
        action: ACTIONS.VIEW,
      },
    },
    {
      label: 'Registration',
      id: 16,
      icon: 'registration.svg',
      href: REGISTRATION,
      perms: {
        subject: SUBJECTS.Payment,
        action: ACTIONS.PAY_SERVICE_PROVIDER_FEE,
      },
    },
    {
      label: 'Dashboard',
      id: 17,
      icon: 'dashboard.svg',
      href: CUSTOMER_DASHBOARD,
      perms: {
        subject: SUBJECTS.Payment,
        action: ACTIONS.PAY_LAB_TEST_PAYMENT,
      },
    },
    {
      label: 'Tickets',
      id: 18,
      icon: 'gp-partner.svg',
      href: TICKETS,
      perms: {
        subject: SUBJECTS.ServiceProvider,
        action: ACTIONS.VIEW_ALL,
      },
    },
  ]

  return (
    <>
      {/* Sidebar */}
      <section
        className={`lg:pt-5 md:pt-10 py-5 md:px-20 lg:px-5 p-4 z-40 w-full md:w-[250px] lg:w-[280px] xl:w-[310px] border border-[#c0c0c0] h-screen fixed bg-white top-0 left-0 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="block lg:hidden text-end mb-4" onClick={() => setSidebarOpen(false)}>
          <Image
            src="/assets/images/customer/close.svg"
            alt="Close"
            width={30}
            height={30}
            className="ml-auto w-[30px] h-[30px] cursor-pointer"
          />
        </div>

        <div className="xl:mb-8 lg:static mb-4">
          <Link href={HOME}>
            <div className="flex justify-start items-center mb-4 h-[80px] sm:h-[90px] md:h-[100px] pl-3 ">
              <Image
                src="/assets/images/svg/mobilab2u-icon.svg"
                alt="MobiLab2u"
                width={200}
                height={150}
                className="object-contain w-[100px] sm:w-[120px] md:w-[140px] lg:w-[150px] xl:w-[180px] h-[70px] sm:h-[80px] md:h-[80px] lg:h-[70px] xl:h-[80px] transition-all duration-300"
              />
            </div>
          </Link>
        </div>

        <ul className="flex flex-col gap-1 m-0 p-0 list-none">
          {menuItems.map((item, id) => (
            <CanView key={id} I={item.perms.action} a={item.perms.subject}>
              <li className="m-0 p-0">
                <Link
                  href={item.href}
                  onClick={handleMenuItemClick}
                  className="flex items-center px-3 py-1.5 hover:bg-gray-50 rounded transition-colors gap-3"
                >
                  <Image
                    src={`/assets/images/customer/${item.icon}`}
                    alt={item.label}
                    width={30}
                    height={30}
                    className="shrink-0"
                  />
                  <span className="text-sm md:text-base lg:text-md xl:text-lg">{item.label}</span>
                </Link>
              </li>
            </CanView>
          ))}
        </ul>
      </section>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-39 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
