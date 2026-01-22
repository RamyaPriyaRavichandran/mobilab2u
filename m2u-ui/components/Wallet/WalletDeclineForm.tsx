import React, { useRef } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'
import { RedeemDecline } from './wallet.interface'
import TextAreaInput from '../common/Input/TextAreaInput'
import { DECLINE_ERROR } from '@/utils/constents'

export default function WalletDeclineForm({ reviewWalletRedeems, onClose, walletId }: any) {
  const DeclineFormSchema = Yup.object().shape({
    declineNote: Yup.string().required(DECLINE_ERROR),
  })
  const modelRef = useRef(null)
  useOnClickOutside(modelRef, onClose)

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <motion.div
        ref={modelRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Redeem Request</h2>

        {/* Withdraw Form */}
        <Formik
          initialValues={{ declineNote: '', status: 'DECLINED', walletId: walletId }}
          validationSchema={DeclineFormSchema}
          onSubmit={(values: RedeemDecline, { setSubmitting }) => {
            reviewWalletRedeems(values)
            setSubmitting(false)
          }}
        >
          {({ values, setSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <label htmlFor="">Decline Reason</label>
              <TextAreaInput name="declineNote" />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm transition duration-300"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  )
}
