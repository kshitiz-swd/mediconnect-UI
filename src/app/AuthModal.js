"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoginForm from "../components/Login"; 
import RegisterForm from "../components/Register"; 

const AuthModal = ({ isOpen, onRequestClose, baseUrl }) => {
  const [tab, setTab] = useState("login");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onRequestClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-white bg-purple-600 p-3 rounded-t-xl text-center"
                >
                  Authentication
                </Dialog.Title>

                {/* Tabs */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setTab("login")}
                    className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                      tab === "login"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setTab("register")}
                    className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                      tab === "register"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Register
                  </button>
                </div>

                <div className="mt-4">
                  {tab === "login" ? (
                    <LoginForm baseUrl={baseUrl} onClose={onRequestClose} />
                  ) : (
                    <RegisterForm baseUrl={baseUrl} onClose={onRequestClose} />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
