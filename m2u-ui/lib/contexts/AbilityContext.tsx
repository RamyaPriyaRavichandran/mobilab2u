'use client'
import { createContext } from 'react'
import { createContextualCan } from '@casl/react'
import { useState } from 'react'
import { useAuth } from './AuthContext'
import { usePopup } from './PopupContext'
import getUserAbilities from '../ability'
import { useEffect } from 'react'
import { useContext } from 'react'
import { GET_USER_PERMS } from '../endpoints'
import axiosII from '../axios-instance'
interface SetupFormProps {
  children: JSX.Element | JSX.Element[]
}

interface AbilityTypes {
  loading: boolean
  ability: any
}

const AbilityContext = createContext<AbilityTypes>({
  loading: true,
  ability: {},
})
export const Can = createContextualCan(AbilityContext.Consumer as any)
export const useAbility = () => useContext(AbilityContext)

export default function AbilityProvider({ children }: SetupFormProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [view, setView] = useState<boolean>(true)
  const [permissions, setPermissions] = useState([])
  const { showError } = usePopup()
  const { loggedIn } = useAuth()
  useEffect(() => {
    getUserPerms()
  }, [loggedIn])
  const getUserPerms = () => {
    if (!loggedIn) {
      return setView(false)
    } else
      axiosII
        .get(GET_USER_PERMS)
        .then(({ data }: any) => {
          setPermissions(data)
          setLoading(false)
          setView(false)
        })
        .catch(({ data: { response: { message = '' } = {} } = {} }) => {
          showError(message)
          setLoading(false)
        })
  }

  const ability = getUserAbilities(permissions)
  return <AbilityContext.Provider value={{ ability, loading }}>{!view && children}</AbilityContext.Provider>
}
