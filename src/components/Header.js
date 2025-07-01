"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import AuthModal from "../screens/auth/Auth"; // Update path if needed
import logo from "../../public/Frame.png"; 
import user from "../../public/user.png"; 
import AuthModal from "../app/AuthModal";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter } from 'next/navigation'

const Header = ({ baseUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter()

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
    <header className="flex justify-between items-center px-4 md:px-10 lg:px-[120px] py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center cursor-pointer" onClick={()=> router.push('/')}>
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
      <div className="relative">
        <Menu>
          <MenuButton className="items-center gap-2 rounded-full p-2 hover:bg-gray-200">
            <Image
              src={user}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          </MenuButton>

          <MenuItems
            className="absolute right-0 mt-2 z-50 w-52 origin-top-right rounded-xl border border-white/10 bg-white text-black shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <MenuItem>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-xl" onClick={()=> router.push('/appointment')}>
                My Appointments
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-xl"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
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
