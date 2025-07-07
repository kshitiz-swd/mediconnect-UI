"use client"
import Header from "../components/Header";
import Image from "next/image";
import DoctorList from "./DoctorList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "@/utils/userSlice";

export default function Home() {

  return (
    <div>
      <DoctorList baseUrl={baseUrl} />
    </div>
  );
}
