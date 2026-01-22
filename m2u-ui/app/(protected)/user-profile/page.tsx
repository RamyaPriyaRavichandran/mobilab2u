'use client'

import React from 'react'
import { ACTIONS, SUBJECTS } from '@/utils/constents/permission'
import CanView from '@/components/common/CanView'
import CustomerProfile from '@/components/Customers/CustomerProfile'
import SPProfile from '@/components/ServiceProvider/SPProfile'
import DoctorProfile from '@/components/GPPartner/DoctorProfile'

export default function page() {
  return (
    <>
      <CanView I={ACTIONS.PROFILE_UPDATE} a={SUBJECTS.Customer}>
        <CustomerProfile />
      </CanView>
      <CanView I={ACTIONS.PROFILE_UPDATE} a={SUBJECTS.ServiceProvider}>
        <SPProfile />
      </CanView>
      <CanView I={ACTIONS.PROFILE_UPDATE} a={SUBJECTS.GPPartner}>
        <DoctorProfile />
      </CanView>
    </>
  )
}
