'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/utils'
import { useAuth } from '@/lib/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfilePopup } from '../common/Header'
import { LOGIN_ROUTES } from '@/utils/constents/routes'
import { LOGOUT_CONFIRM_MESSAGE } from '@/utils/constents'
import { useAlert } from '@/lib/contexts/AlertContext'
import useSWR from 'swr'
import { USER_DETAIL } from '@/lib/endpoints'
import { fetcher } from '@/lib/fetchers'

interface User {
  name?: string
  userRole?: string
}

interface HeaderProps {
  landing?: boolean
}

export default function Header({ landing = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [popup, setPopup] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const { showAlert } = useAlert()
  const path = usePathname()
  const { user = {}, loggedIn, logout } = useAuth()
  const Router = useRouter()
  const { data: userInfo } = useSWR(
    user ? USER_DETAIL : null,
    fetcher<{
      name: string
      userRole: string
      passportSizePhoto: {
        s3URL: string
      }
      paymentStatus?: string
    }>(),
    {}
  )
  const userDetail = userInfo || user
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigation = [
    {
      name: 'Home',
      href:
        userInfo?.userRole === 'SERVICE_PROVIDER'
          ? userInfo?.paymentStatus === 'PAID'
            ? LOGIN_ROUTES[user?.userRole]
            : '/registration'
          : LOGIN_ROUTES[user?.userRole], // or any other fallback route
    },
    { name: 'About Us', href: '/about-us' },
    { name: 'Services', href: '/services' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact Us', href: '/contact-us' },
  ]

  return (
    <header
      id="main-header"
      className={cn(
        'bg-[#fef1e7] w-full top-0 left-0 z-50 transition-all duration-300',
        landing && 'absolute inset-x-0 mx-6 md:mx-0'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/">
          <Image
            id="header-logo"
            src="/assets/images/svg/mobilab2u-icon.svg"
            alt="MobiLab2u - Home Nursing & Healthcare Services in Malaysia"
            title="MobiLab2u - Home Nursing & Healthcare Services in Malaysia"
            width={160}
            height={80}
            className="!w-[100px] !h-[50px] md:!w-[160px] md:!h-[80px] object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 text-sm font-medium text-gray-900">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-red-800 transition">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!mounted || !loggedIn ? (
            <>
              <Link
                href="/user/register"
                className="bg-black hidden lg:block text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
              >
                Register
              </Link>
              <Link
                href="/user/login"
                className="bg-red-600 text-white px-2 md:py-2 py-1 text-[12px] md:px-6 rounded-lg md:text-sm font-semibold hover:bg-black transition"
              >
                Login
              </Link>
            </>
          ) : (
            <div ref={modalRef} className="relative hidden lg:block">
              {/* Avatar */}
              <div className="flex cursor-pointer items-center" onClick={() => setPopup((prev) => !prev)}>
                <div className="flex justify-center">
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={userDetail?.passportSizePhoto?.s3URL || '/images/default-avatar.png'}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userDetail.name}</p>
                </div>
              </div>

              {/* Popup */}
              <AnimatePresence>
                {popup && (
                  <motion.div
                    className="fixed right-10 top-15 w-48 shadow-lg py-2 z-[9999]"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ProfilePopup userDetail={userDetail} setPopup={setPopup} popup={popup} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Hamburger (mobile) */}
          <div className="lg:hidden relative z-50">
            <button onClick={toggleMenu} className="flex flex-col space-y-1 cursor-pointer" aria-label="Toggle menu">
              <span
                className={`w-6 h-0.5 bg-black block transition-transform ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span className={`w-6 h-0.5 bg-black block transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`w-6 h-0.5 bg-black block transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>

            {/* Side Menu */}
            <nav
              className={`fixed top-0 left-0 h-full w-64 bg-[#fef1e7] transform transition-transform duration-300 shadow-lg flex flex-col p-6 space-y-4 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <button onClick={closeMenu} className="self-end cursor-pointer mb-4" aria-label="Close menu">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-red-800 transition" onClick={closeMenu}>
                  {item.name}
                </Link>
              ))}

              {mounted && loggedIn ? (
                <>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm">
                        {user?.name?.slice(0, 1).toUpperCase()}
                      </span>
                      <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    </div>
                    <div
                      className="block px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        if (user.userRole === 'CUSTOMER') {
                          Router.push('/dashboard/customer')
                        } else if (user.userRole === 'GP_PARTNER') {
                          Router.push('/dashboard/gpdashboard')
                        } else if (user.userRole === 'SERVICE_PROVIDER') {
                          if (userInfo?.paymentStatus === 'PAID') {
                            Router.push('/dashboard/spdashboard')
                          } else {
                            Router.push('/registration')
                          }
                        } else {
                          Router.push('/dashboard')
                        }

                        setPopup(false)
                        closeMenu()
                      }}
                    >
                      Go to Portal
                    </div>

                    <Link
                      href="/user-profile"
                      className="block px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded"
                      onClick={closeMenu}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        showAlert(LOGOUT_CONFIRM_MESSAGE, logout)
                        closeMenu()
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/user/register"
                    className="bg-black text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition mt-4"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>

            {isMenuOpen && <div className="fixed inset-0 bg-black/50 -z-10" onClick={closeMenu} />}
          </div>
        </div>
      </div>
    </header>
  )
}
