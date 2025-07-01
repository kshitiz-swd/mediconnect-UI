'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

const DoctorDetails = ({ isOpen, onRequestClose, selectedDoctor }) => {
  if (!selectedDoctor) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onRequestClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-white bg-blue-600 px-4 py-3  -mx-6 -mt-6"
              >
                Doctor Details
              </Dialog.Title>

              <div className="mt-4 space-y-2 text-gray-800">
                <p className="text-xl font-bold">Dr. {selectedDoctor.name}</p>
                <p>Experience: {selectedDoctor.totalExperience} years</p>
                <p>Specialization: {selectedDoctor.specialization}</p>
                <p>DOB: {selectedDoctor.dateOfBirth?.split('T')[0]}</p>
                <p>City: {selectedDoctor.city}</p>
                <p>Email: {selectedDoctor.emailId}</p>
                <p>Mobile: {selectedDoctor.mobile}</p>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Rating:</span>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          selectedDoctor.ratings >= i + 1
                            ? 'text-yellow-400'
                            : selectedDoctor.ratings > i
                            ? 'text-yellow-300'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.126 3.47a1 1 0 00.95.69h3.643c.969 0 1.371 1.24.588 1.81l-2.946 2.14a1 1 0 00-.364 1.118l1.126 3.47c.3.921-.755 1.688-1.538 1.118l-2.946-2.14a1 1 0 00-1.176 0l-2.946 2.14c-.783.57-1.838-.197-1.538-1.118l1.126-3.47a1 1 0 00-.364-1.118L2.343 8.897c-.783-.57-.38-1.81.588-1.81h3.643a1 1 0 00.95-.69l1.126-3.47z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={onRequestClose}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DoctorDetails;
