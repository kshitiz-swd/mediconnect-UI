"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/Frame.png";
import user from "../../public/user.png";
import AuthModal from "../app/AuthModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Header = ({ baseUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const isLoggedIn = !!userData && !!userData._id;

  const openModalHandler = () => setModalIsOpen(true);
  const closeModalHandler = () => setModalIsOpen(false);

  const logoutHandler = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
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
        <h1 className="ml-4 text-2xl font-bold text-blue-600 hidden lg:block">MediConnect</h1>
      </div>

      <div className="hidden lg:flex gap-8 items-center">
        <Link
          href="/symptom-checker"
          className="text-red-500 border border-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition"
        >
          Symptom Checker
        </Link>

        {!isLoggedIn ? (
          <button
            onClick={openModalHandler}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            Login / Signup
          </button>
        ) : (
          <Menu>
            <MenuButton className="items-center gap-2 rounded-full p-2 hover:bg-gray-200">
              <Image src={user} alt="User" width={40} height={40} className="rounded-full" />
            </MenuButton>
            <MenuItems className="absolute right-4 mt-2 z-50 w-52 origin-top-right rounded-xl border bg-white text-black shadow-lg ring-1 ring-black/5 focus:outline-none">
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
        )}
      </div>

      <div className="lg:hidden text-black">
        {!isLoggedIn ? (
          <Menu>
            <MenuButton className="flex items-center justify-center p-2 border rounded-md hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </MenuButton>

            <MenuItems className="absolute right-4 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              <MenuItem>
                <Link
                  href="/symptom-checker"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Symptom Checker
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={openModalHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Login / Signup
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <Menu>
            <MenuButton className="flex items-center justify-center p-1 border rounded-full hover:bg-gray-100">
              <Image src={user} alt="User" width={36} height={36} className="rounded-full" />
            </MenuButton>

            <MenuItems className="absolute right-4 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              <MenuItem>
                <Link
                  href="/symptom-checker"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Symptom Checker
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/appointment")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  My Appointments
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
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
