'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import RateAppointment from './RateAppointment';


const Appointment = ({ baseUrl }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const accessToken = sessionStorage.getItem('access-token');

  const openModalHandler = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

useEffect(() => {
  setIsLoggedIn(true); // Force logged in for demo

  // Dummy appointments data
  const dummyAppointments = [
    {
      doctorId: { name: "Dr. Arjun Mehta" },
      appointmentDate: "2025-07-02T10:00:00.000Z",
      symptoms: "Fever, cough",
      medicalHistory: "Asthma",
    },
    {
      doctorId: { name: "Dr. Neha Sharma" },
      appointmentDate: "2025-06-28T14:30:00.000Z",
      symptoms: "Headache",
      medicalHistory: "None",
    },
    {
      doctorId: { name: "Dr. Neha Sharma" },
      appointmentDate: "2025-06-28T14:30:00.000Z",
      symptoms: "Headache",
      medicalHistory: "None",
    },
    {
      doctorId: { name: "Dr. Ramesh Gupta" },
      appointmentDate: "2025-07-01T09:00:00.000Z",
      symptoms: "Back pain",
      medicalHistory: "Slip disc in 2022",
    },
  ];

  setAppointments(dummyAppointments);
}, []);


  return (
    <div className="px-8 md:px-10 lg:px-[120px] py-6">
      {!isLoggedIn && (
        <p className="text-center text-red-500 text-lg font-semibold">
          Login to see your Appointments
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 text-black"
          >
            <p className="text-lg font-semibold mb-2 text-blue-700">
              Dr. {appointment.doctorId.name}
            </p>
            <p className="mb-1">Date: {appointment.appointmentDate.split('T')[0]}</p>
            <p className="mb-1">Symptoms: {appointment.symptoms || 'N/A'}</p>
            <p className="mb-3">Medical History: {appointment.medicalHistory || 'N/A'}</p>
            <button
              onClick={() => openModalHandler(appointment)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Rate Appointment
            </button>
          </div>
        ))}
      </div>

      {/* <RateAppointment
        isOpen={modalIsOpen}
        onRequestClose={closeModalHandler}
        baseUrl={baseUrl}
        selectedAppointment={selectedAppointment}
        rateMsg={errorMessage}
        setRateMsg={setErrorMessage}
      /> */}
    </div>
  );
};

export default Appointment;
