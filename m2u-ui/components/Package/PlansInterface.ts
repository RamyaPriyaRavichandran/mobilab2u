import { Dispatch, SetStateAction } from 'react'

export interface LabStateInterface {
  popup: boolean
  labData: any
}
export interface TableData {
  row: {
    index: number
    original: {
      _id: string
      members?: string
      createdAt: string
      userRole: number
      type: string
      serviceType: string
      document: {
        s3URL: string
      }
    }
  }
}

export interface PlanFormInterface {
  showPlanForm: {
    popup: boolean
    planData: any
  }
  mutate: () => void
  setShowPlanForm: Dispatch<
    SetStateAction<{
      popup: boolean
      planData: object
    }>
  >
}

export interface PlanRegisterInterface {
  _id?: string
  name: string
  description: string
  type: string
  serviceType: string
  members: string
  price: number
  offerPrice: number
  labShare: number
  hspShare: number
  customerShare: number
  mobilabShare: number
  image: any
}

export interface FieldValueState {
  popup: boolean
  planData: object
}
export interface PlanFormFieldInterface {
  setShowPlanForm: Dispatch<SetStateAction<FieldValueState>>
  postMutating: boolean
  putMutating: boolean
  values: any
}
