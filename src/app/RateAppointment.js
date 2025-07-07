"use client"

import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const RateAppointment = ({baseUrl, isOpen, onRequestClose,selectedAppointment}) => {
  const [rating, setRating] = useState(0) 

    if(!selectedAppointment) return <p>Loading...</p>
  return (
    <Transition show={isOpen} as={Fragment}>
        <Dialog
            onClose={onRequestClose}
        className="relative z-50 text-black"
        >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className='fixed inset-0 flex justify-center items-center p-4'>
                <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl space-y-6">
                    <h2 className='text-blue-600 text-xl font-semibold'>
                        Rate Appointment
                    </h2>
                    <div>
                        <p className="mb-1">Dr: {selectedAppointment?.doctorId?.name || 'N/A'}</p>
                        <p className="mb-1">Date: {selectedAppointment?.appointmentDate.split('T')[0]}</p>
                    </div>
                    <div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            // onChange={(e) => setMedicalHistory(e.target.value)}
                        />
                        </div>
                        <hr className="my-4 border-gray-300 w-1/3" />
                        <div className='flex gap-2 items-center '>
                            <label className="text-sm font-medium text-gray-700">Rating:</label>
                            <Rating  style={{width:'100px'}} value={rating} onChange={setRating} />
                            
                        </div>
                        <button
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                        // onClick={handleSubmit}
                        disabled={rating === 0}
                        >
                        Submit Rating
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </Transition>
  )
}

export default RateAppointment


