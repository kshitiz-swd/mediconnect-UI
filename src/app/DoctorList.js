"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorDetails from "./DoctorDetails";
// import BookAppointment from "./BookAppointment";

const DoctorList = ({ baseUrl }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState(1);
  const [specialityList, setSpecialityList] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");


  const openModalHandler = (doctor, tab) => {
    setSelectedDoctor(doctor);
    setTabValue(tab);
    setModalIsOpen(true);
  };

  const closeModalHandler = () => setModalIsOpen(false);

useEffect(() => {
  const demoDoctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      hospital: "Memorial Medical Center",
      experience: 15,
      education: "Harvard Medical School",
      availability: "Available Today"
    },
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      hospital: "Memorial Medical Center",
      experience: 15,
      education: "Harvard Medical School",
      availability: "Available Today"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Dermatology",
      hospital: "City General Hospital",
      experience: 10,
      education: "Johns Hopkins University",
      availability: "Next Available: Tomorrow"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Dermatology",
      hospital: "City General Hospital",
      experience: 12,
      education: "Johns Hopkins University",
      availability: "Next Available: Tomorrow"
    },
    {
      name: "Dr. Michgnhael Chen",
      specialization: "Dermatology",
      hospital: "City General Hospital",
      experience: 9,
      education: "Johns Hopkins University",
      availability: "Next Available: Tomorrow"
    },
  ];

  setDoctors(demoDoctors);
  setFilteredDoctors(demoDoctors);
  setSpecialityList(["All", "Cardiology", "Dermatology"]);
}, []);


  useEffect(() => {
    let result = [...doctors];

    if (selectedSpeciality !== "All") {
      result = result.filter((doc) => doc.specialization === selectedSpeciality);
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(result);
  }, [selectedSpeciality, searchTerm, doctors]);

  if (!doctors.length) return <p className="text-center mt-10">Loading doctors...</p>;

  return (
    <div className=" mx-auto ">
      {/* Hero Section with Blue Background */}
        <div className="bg-blue-600 text-white py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Find the Right Doctor for Your Care</h1>
        <p className="mt-2 text-sm md:text-base">
            Search our extensive network of healthcare professionals to find specialists who meet your specific needs.
        </p>

        {/* White Search Box */}
        <div className="mt-8 bg-white p-4 md:p-6 rounded-xl shadow-md max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <input
            type="text"
            placeholder="Search doctor by name"
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
            {specialityList.map((speciality, index) => (
                <option key={index} value={speciality}>
                {speciality}
                </option>
            ))}
            </select>
        </div>
        </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-8 md:px-10 lg:px-[120px] pt-24">
        {filteredDoctors.map((doctor, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md border hover:shadow-xl transition duration-300"
          >
            <div className="bg-blue-600 h-20"></div>
            <div className="p-4 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto -mt-12 flex items-center justify-center text-3xl text-gray-600">
                👨‍⚕️
              </div>
              <h2 className="mt-4 font-semibold text-lg text-gray-800">{doctor.name}</h2>
              <p className="text-blue-500 text-sm mb-2">{doctor.specialization}</p>

              <div className="flex flex-col items-center text-sm text-gray-600 gap-1 mb-2">
                <p>🏥 {doctor.hospital || "City Hospital"}</p>
                <p>📅 {doctor.experience || "8"} years experience</p>
                <p>🎓 {doctor.education || "Harvard Medical School"}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs mt-2 mb-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {doctor.availability || "Available Today"}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Accepting New Patients</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModalHandler(doctor, 1)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded  text-sm"
                >
                  Book Now
                </button>
                <button
                  onClick={() => openModalHandler(doctor, 0)}
                  className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100 text-black"
                >
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal for Book/View */}
      {modalIsOpen && 
          <DoctorDetails
            isOpen={modalIsOpen}
            onRequestClose={closeModalHandler}
            baseUrl={baseUrl}
            selectedDoctor={selectedDoctor}
          />}
      {/* {modalIsOpen &&
        (tabValue === 0 ? (
          <DoctorDetails
            isOpen={modalIsOpen}
            onRequestClose={closeModalHandler}
            baseUrl={baseUrl}
            selectedDoctor={selectedDoctor}
          />
        ) : (
          <BookAppointment
            isOpen={modalIsOpen}
            onRequestClose={closeModalHandler}
            baseUrl={baseUrl}
            selectedDoctor={selectedDoctor}
          />
        ))} */}
    </div>
  );
};

export default DoctorList;
