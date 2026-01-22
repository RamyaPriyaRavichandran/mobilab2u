import React from 'react'
import SpDetail from '../Customers/Orders/SpDetail'

export default function CustomerPopupDetails({ onClose, customerpopup }: { onClose: any; customerpopup: any }) {
  return (
    <div className="bg-black w-full h-full top-0 left-0 fixed bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[800px] h-[500px] rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Consultation Details</h2>
          <button onClick={onClose} className="text-red-500">
            X
          </button>
        </div>
        <div>
          <SpDetail sp={customerpopup.data.doctor} />
        </div>
      </div>
    </div>
  )
}
