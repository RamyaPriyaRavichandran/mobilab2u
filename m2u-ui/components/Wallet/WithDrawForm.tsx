import React, { useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import NumberInput from '../common/Input/NumberInput'
import TextInput from '../common/Input/TextInput'
import { useOnClickOutside } from 'usehooks-ts'
import {
  OTP_ERROR,
  WITHDRAW_AMOUNT_ERROR,
  WITHDRAW_AMOUNT_ERROR_MESSAGE,
  WITHDRAW_AMOUNT_ERROR_MESSAGE_MIN,
} from '@/utils/constents'
import { usePopup } from '@/lib/contexts/PopupContext'
import { RedeemFormField, WalletRedeemFormInterface } from './wallet.interface'
import DashLoader from '../common/DashLoader'

export default function WithDrawForm({
  onClose,
  sendOTP,
  redeemWallet,
  redeemMutating,
  isMutating,
  balance,
}: WalletRedeemFormInterface) {
  const withDrawFormSchema = Yup.object().shape({
    withdrawAmount: Yup.number()
      .required(WITHDRAW_AMOUNT_ERROR)
      .min(1, WITHDRAW_AMOUNT_ERROR_MESSAGE_MIN)
      .max(balance, WITHDRAW_AMOUNT_ERROR_MESSAGE),
    otp: Yup.string().required(OTP_ERROR),
  })
  const modelRef = useRef(null)
  const { showError } = usePopup()
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Withdraw Funds</h2>

        {/* Withdraw Form */}
        <Formik
          initialValues={{ withdrawAmount: 0, walletBalance: '', otp: '' }}
          validationSchema={withDrawFormSchema}
          onSubmit={(values: RedeemFormField, { setSubmitting }) => {
            if (!values.otp) {
              showError('Please verify your register email and enter code')
            } else {
              return redeemWallet(values)
            }

            setSubmitting(false)
          }}
        >
          {({ values, setSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <NumberInput
                label="Withdrawal Amount"
                name="withdrawAmount"
                placeholder="Enter amount"
                regex={/^\d*\.?\d{0,2}$/}
              />
              <div className="flex space-x-2 mt-1">
                <TextInput label="OTP" name="otp" placeholder="Enter OTP for login email" />

                <button
                  disabled={isMutating}
                  type="button"
                  className="bg-brand-600 px-2 font-semibold text-white rounded-md md:mt-7 mt-3  py-1.5 disabled:bg-gray-300"
                  onClick={() => sendOTP()}
                >
                  {isMutating ? <DashLoader color="brand-500" /> : 'Send OTP'}{' '}
                </button>
              </div>

              {/* Submit Button */}
              <button
                disabled={redeemMutating}
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 mt-2"
              >
                {redeemMutating ? <DashLoader color="white-500" /> : 'Withdraw'}
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
