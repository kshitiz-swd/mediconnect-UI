'use client';

import { useState, useEffect, Fragment, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
} from '@headlessui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import baseUrl from '@/utils/constants';


const BookAppointment = ({ isOpen, onRequestClose, selectedDoctor }) => {
  const [medicalHistory, setMedicalHistory] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');

  const cancelButtonRef = useRef(null);

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate('');
      setSymptoms('');
      setMedicalHistory('');
      setAvailableSlots([]);
      setTimeSlot('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDate && selectedDoctor?._id) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    console.log('hi')
    try {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      const response = await axios.get(`${baseUrl}doctors/${selectedDoctor._id}/slots`, {
        params: { date: formattedDate },
      });
      console.log(response)
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const combineDateAndTime = (date, timeString) => {
    const [hours, minutes] = timeString.split(':');
    return dayjs(date).hour(Number(hours)).minute(Number(minutes)).toISOString();
  };

  const bookAppointment = async () => {
    if (!user) {
      alert(" Please login to book an appointment.");
      onRequestClose(); 
      router.push("/"); 
      return;
    }

    try {
      const fullDateTime = combineDateAndTime(selectedDate, timeSlot);
      const response = await axios.post(
        `${baseUrl}appointment`,
        {
          doctorId: selectedDoctor._id,
          medicalHistory,
          symptoms,
          appointmentDate: fullDateTime,
        },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      console.log(response)

      alert(' Appointment booked successfully!');
      onRequestClose();
    } catch (error) {
      alert(' Booking failed: ' + (error.response?.data?.error || error.message));
    }
  };


  if (!selectedDoctor) return null;

  return (
    <Transition show={isOpen} as={Fragment} >
      <Dialog
        initialFocus={cancelButtonRef}
        onClose={onRequestClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex justify-center items-center p-4 text-black">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-semibold text-blue-600">
              Book an Appointment
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <p className="text-gray-900 font-semibold">{selectedDoctor?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Date</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a slot --
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot.time} value={slot.time.split('T')[1]}>
                    {new Date(slot.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </option>
                ))}
              </select>

              {availableSlots.length === 0 && selectedDate && (
                <p className="text-sm text-red-500 mt-2">No slots available for this date.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
              onClick={()=>bookAppointment()}
              disabled={!selectedDate || !timeSlot}
              ref={cancelButtonRef}
            >
              Book Appointment
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookAppointment;
