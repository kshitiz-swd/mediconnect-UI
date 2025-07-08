"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; 
import baseUrl from "../utils/constants";

const RegisterForm = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      switch (field) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) error = "Enter a valid email";
          break;
        case "contact":
          if (!/^\d{10}$/.test(value))
            error = "Enter a valid 10-digit contact number";
          break;
        case "registerPassword":
          if (value.length < 6) error = "Password must be at least 6 characters";
          break;
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAllFields = () => {
    validateField("firstname", firstname);
    validateField("lastname", lastname);
    validateField("email", email);
    validateField("registerPassword", registerPassword);
    validateField("contact", contact);
  };

  const registerClickHandler = async () => {
    validateAllFields();

    const hasErrors = Object.values(errors).some((e) => e);
    if (hasErrors) return;

    const dataSignup = {
      emailId: email,
      firstname,
      lastname,
      mobile: contact,
      password: registerPassword,
    };

    try {
      const response = await axios.post(`${baseUrl}auth/signup`, dataSignup, {
           withCredentials: true ,
        headers: { "Content-Type": "application/json" },
      });

      // const loginResponse = await axios.post(
      //   `${baseUrl}auth/login`,
      //   {
      //     loginData: {
      //       emailId: email,
      //       password: registerPassword,
      //     },
      //   },
      //   { withCredentials: true }
      // );

      dispatch(addUser(response.data));

      onClose?.();
      router.push("/");
    } catch (error) {
      console.error("Registration/Login failed:", error);
      alert(error.message+" Please try again");
    }
  };

  return (
    <div className="space-y-4 mt-2 text-black">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.firstname ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          onBlur={() => validateField("firstname", firstname)}
        />
        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.lastname ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          onBlur={() => validateField("lastname", lastname)}
        />
        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateField("email", email)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.registerPassword ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          onBlur={() => validateField("registerPassword", registerPassword)}
        />
        {errors.registerPassword && (
          <p className="text-red-500 text-sm">{errors.registerPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact No.</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.contact ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm`}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onBlur={() => validateField("contact", contact)}
        />
        {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
      </div>

      <button
        onClick={registerClickHandler}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
