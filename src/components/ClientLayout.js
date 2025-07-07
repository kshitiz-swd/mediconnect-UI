// components/ClientLayout.jsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice"; // adjust path
import ClientHeader from "./ClientHeader";

const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;

      try {
        const res = await fetch("http://localhost:7000/api/auth/profile", {
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          dispatch(addUser(data));
        }
      } catch (err) {
        console.log("Not logged in:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ClientHeader baseUrl="http://localhost:7000/api" />
      {children}
    </>
  );
};

export default ClientLayout;
