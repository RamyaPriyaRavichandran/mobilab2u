import Link from 'next/link'
import CanView from './CanView'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { HOME, SIDEBAR_LINKS } from '@/utils/constents/routes'

interface SideBarDatas {
  name: string
  id: number
  path: string
  icon: any
  perms: {
    subject: string
    action: string
  }
}

export function DesktopSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-[270px] lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-2 text-black bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center mt-4">
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
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {SIDEBAR_LINKS.map((item: SideBarDatas, idx) => (
                  <li key={idx}>
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
          </ul>
        </nav>
      </div>
    </div>
  )
}
