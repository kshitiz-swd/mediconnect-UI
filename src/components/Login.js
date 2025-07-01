"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = ({ baseUrl, onClose }) => {
  const router = useRouter();

  const [emailId, setEmailId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!emailId) newErrors.emailId = "Email is required";
    if (!loginPassword) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginClickHandler = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${baseUrl}auth/login`,
        {
          emailId,
          password: loginPassword,
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
      console.error("Login failed:", error);
      setErrorMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4 mt-2">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.emailId ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.loginPassword ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        {errors.loginPassword && (
          <p className="text-red-500 text-sm">{errors.loginPassword}</p>
        )}
      </div>

      {/* General Error */}
      {errorMessage && (
        <div className="text-red-600 text-sm text-center">{errorMessage}</div>
      )}

      {/* Submit */}
      <button
        onClick={loginClickHandler}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
