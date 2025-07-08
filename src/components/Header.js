"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/Frame.png"; 
import user from "../../public/user.png"; 
import AuthModal from "../app/AuthModal";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Header = ({ baseUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const isLoggedIn = !!userData;

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, {}, {
        withCredentials: true,
      });

      dispatch(removeUser());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 md:px-10 lg:px-[120px] py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
        <Image src={logo} alt="MediConnect Logo" width={48} height={48} className="rounded-full" />
        <h1 className="ml-4 text-2xl font-bold text-blue-600">MediConnect</h1>
      </div>

      <div className="flex gap-8 items-center">
        <Link href="/symptom-checker" className="text-red-500 p-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white">
          Symptom Checker
        </Link>

        {!isLoggedIn ? (
          <button
            onClick={openModalHandler}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Login / Signup
          </button>
        ) : (
          <div className="relative">
            <Menu>
              <MenuButton className="items-center gap-2 rounded-full p-2 hover:bg-gray-200">
                <Image src={user} alt="User" width={40} height={40} className="rounded-full" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 z-50 w-52 origin-top-right rounded-xl border border-white/10 bg-white text-black shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-xl"
                    onClick={() => router.push("/appointment")}
                  >
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
