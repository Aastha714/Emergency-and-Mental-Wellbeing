import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";

const SessionAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const therapistEmail = Cookies.get("email");

  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const response = await API.get(
          `/appointments/accepted?therapistEmail=${therapistEmail}`
        );
        if (response.status === 200) {
          // Filter appointments to include only those with present or future dates
          const today = new Date();
          const filteredAppointments = response.data.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= today.setHours(0, 0, 0, 0); // Include today's date and future dates
          });
          setAppointments(filteredAppointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAcceptedAppointments();
  }, [therapistEmail]);

  return (
    <div
      className={`w-full bg-white drop-shadow-md p-10 mx-auto ${
        appointments.length === 0 ? "h-[700px]" : "h-full"
      }`}
    >
      <h2 className="text-6xl text-[#109948] font-bold text-center mb-[50px]">
        My Accepted Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          No upcoming accepted appointments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-11">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="w-[450px] h-[350px] bg-white shadow-md border p-11 flex flex-col justify-evenly rounded-md transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-[16px] text-gray-600">
                <strong>Name:</strong> {appointment.name}
              </div>
              <div className="text-[16px] text-gray-600">
                <strong>Email:</strong> {appointment.email}
              </div>
              <div className="text-[18px] text-gray-600 mb-2">
                <strong className="mr-2">Date:</strong>
                {appointment.date}
              </div>
              <div className="text-[18px] text-gray-600 mb-2">
                <strong className="mr-2">Time:</strong>
                {appointment.time}
              </div>
              <div className="text-[18px] mb-2 text-gray-700">
                <strong>Message:</strong>
                <span className="ml-2">{appointment.message}</span>
              </div>
              <div className="text-[18px] text-gray-700 font-semibold">
                <strong>Status:</strong>{" "}
                <span className="text-green-600">Accepted</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionAppointments;
