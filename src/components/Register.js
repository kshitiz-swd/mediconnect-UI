"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterForm = ({ baseUrl, onClose }) => {
  const router = useRouter();

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
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const registerClickHandler = async () => {
    if (!Object.values(errors).some((e) => e)) {
      const dataSignup = {
        emailId: email,
        firstname,
        lastname,
        mobile: contact,
        password: registerPassword,
      };

      try {
        const response = await axios.post(`${baseUrl}auth/signup`, dataSignup, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        const loginResponse = await axios.post(
          `${baseUrl}auth/login`,
          {
            loginData: {
              emailId: email,
              password: registerPassword,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }
        );

        sessionStorage.setItem(
          "access-token",
          response.headers["access-token"] || response.data["access-token"]
        );

        onClose?.();
        router.push("/");
      } catch (error) {
        console.error("Registration failed:", error);
      }
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
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          onBlur={() => validateField("firstname", firstname)}
        />
        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.lastname ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          onBlur={() => validateField("lastname", lastname)}
        />
        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateField("email", email)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.registerPassword ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          onBlur={() => validateField("registerPassword", registerPassword)}
        />
        {errors.registerPassword && (
          <p className="text-red-500 text-sm">{errors.registerPassword}</p>
        )}
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact No.</label>
        <input
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.contact ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onBlur={() => validateField("contact", contact)}
        />
        {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
      </div>

      {/* Submit */}
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
