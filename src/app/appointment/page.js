'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RateAppointment from '../RateAppointment';


const Appointment = ({ baseUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

console.log(appointments)
  const openModalHandler = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/appointment`, {
        withCredentials: true, 
      });
      console.log(response)

      setAppointments(response.data.allAppointments || response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setIsLoggedIn(false); 
    }
  };

  fetchAppointments();
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
               {appointment.doctorId.name}
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
        <RateAppointment
          isOpen={modalIsOpen}
          onRequestClose={closeModalHandler}
          selectedAppointment={selectedAppointment}
          baseUrl={baseUrl}
        />
    </div>
  );
};

export default Appointment;
