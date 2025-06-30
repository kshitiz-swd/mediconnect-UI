"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import AuthModal from "../screens/auth/Auth"; // Update path if needed
import logo from "../../public/Frame.png"; 
import AuthModal from "../app/AuthModal";

const Header = ({ baseUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    setLoggedIn(token !== null);
  }, []);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const logoutHandler = async () => {
    setLoggedIn(false);
    try {
      await fetch(`${baseUrl}auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    sessionStorage.removeItem("access-token");
  };

  return (
    <header className="flex justify-between items-center px-20 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="MediConnect Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <h1 className="ml-4 text-2xl font-bold text-blue-600">MediConnect</h1>
      </div>

      <div>
        {!loggedIn ? (
          <button
            onClick={openModalHandler}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logoutHandler}
            className="px-5 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {modalIsOpen && (
        <AuthModal
          isOpen={modalIsOpen}
          onRequestClose={closeModalHandler}
          baseUrl={baseUrl}
        />
      )}
    </header>
  );
};

export default Header;
