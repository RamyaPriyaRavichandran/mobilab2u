'use client'
import { useAbility } from '@/lib/contexts/AbilityContext'

function CanView({
  I,
  a,
  children,
  fallbackChildren,
}: {
  I: string
  a: string
  children: JSX.Element | JSX.Element[]
  fallbackChildren?: JSX.Element | JSX.Element[]
}) {
  const { ability } = useAbility()
  if (ability.can(I, a)) {
    return children
  }
  if (fallbackChildren) {
    return fallbackChildren
  }
  return
}

export default CanView
