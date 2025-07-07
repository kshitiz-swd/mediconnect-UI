"use client"
import Header from "../components/Header";
import Image from "next/image";
import DoctorList from "./DoctorList";

export default function Home() {
  const baseUrl = "http://localhost:7000/api/";

  return (
    <div>
      <DoctorList baseUrl={baseUrl} />
    </div>
  );
}
