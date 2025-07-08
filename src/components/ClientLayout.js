"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice"; 
import ClientHeader from "./ClientHeader";
import baseUrl from "../utils/constants"
import axios from "axios";

const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;

      try {
        const res = await axios.get(`${baseUrl}auth/profile`, {
          withCredentials: true,
        });

        if (res.status === 200) {
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
      <ClientHeader baseUrl={baseUrl} />
      {children}
    </>
  );
};

export default ClientLayout;
