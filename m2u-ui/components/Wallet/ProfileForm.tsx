import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProfileForm({ setProfileOpen }: any) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white m-2 p-6 rounded-xl shadow-2xl w-full max-w-md"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Edit Profile</h2>

        {/* Profile Form */}
        <Formik
          initialValues={{ name: '', email: '', phone: '', address: '' }}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="flex flex-col gap-4">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="profile-image"
                className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition"
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">Upload</span>
                )}
              </label>
              <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            {/* Input Fields */}
            <Field
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
            <Field
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
            <Field
              name="phone"
              type="text"
              placeholder="Phone Number"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
            <Field
              name="address"
              type="text"
              placeholder="Address"
              required
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>

        {/* Close Button */}
        <button
          onClick={() => setProfileOpen(false)}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 transition duration-300 text-sm"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  )
}
