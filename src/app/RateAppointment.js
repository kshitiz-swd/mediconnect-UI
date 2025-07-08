"use client";

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import baseUrl from "@/utils/constants";
import axios from "axios";

const RateAppointment = ({ isOpen, onRequestClose, selectedAppointment }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

      useEffect(() => {
        if (isOpen && selectedAppointment) {
          setRating(0);
          setComment('');
          setErrorMessage('');
        }
      }, [selectedAppointment, isOpen]);

  const rateAppointment = async () => {
    if (!rating || !selectedAppointment?._id) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await axios.post(
        `${baseUrl}ratings/${selectedAppointment._id}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setRating(0);
      setComment("");
      onRequestClose(); 
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedAppointment) return <p>Loading...</p>;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onRequestClose} className="relative z-50 text-black">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex justify-center items-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl space-y-6">
            <h2 className="text-blue-600 text-xl font-semibold">
              Rate Appointment
            </h2>
            <div>
              <p className="mb-1">
                Dr: {selectedAppointment?.doctorId?.name || "N/A"}
              </p>
              <p className="mb-1">
                Date:{" "}
                {selectedAppointment?.appointmentDate?.split("T")[0] || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex gap-2 items-center mt-4">
              <label className="text-sm font-medium text-gray-700">
                Rating:
              </label>
              <Rating
                style={{ width: "100px" }}
                value={rating}
                onChange={setRating}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              onClick={rateAppointment}
              disabled={rating === 0 || isSubmitting}
              className={`w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RateAppointment;
