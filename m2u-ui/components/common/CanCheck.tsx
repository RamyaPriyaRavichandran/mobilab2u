'use client'

import { useAbility } from '@/lib/contexts/AbilityContext'
import { useAuth, UserValuesInterface } from '@/lib/contexts/AuthContext'
import PageLoaderSVG from './PageLoaderSVG'
function CanCheck({ I, a, children }: { I: string; a: string; children: JSX.Element | JSX.Element[] }) {
  const { ability, loading } = useAbility()
  const { user } = useAuth()

  if (loading) {
    return <PageLoaderSVG />
  }

  if (user && ability.can(I, a)) {
    return children
  } else {
    return <NoPermission user={user} />
  }
}

function NoPermission({ user }: { user: UserValuesInterface }) {
  return (
    <div className="pt-20">
      <div className="bg-white border shadow-md text-center rounded-3xl max-w-sm mx-auto">
        <div className="flex justify-center pt-7">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-brand-100 sm:mx-0 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-lg md:text-2xl text-brand-500 mt-4">{user ? 'Permission Denied' : 'Unauthorized user'} </h1>
        <p className="my-4 mx-8 sm:mx-12 text-xs text-black sm:text-base">You have no permission to view this page</p>
      </div>
    </div>
  )
}

export default CanCheck
