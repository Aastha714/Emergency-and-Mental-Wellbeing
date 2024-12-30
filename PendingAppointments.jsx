import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/appointments/pending");
        if (response.status === 200) {
          setAppointments(response.data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    const therapistEmail = Cookies.get("email");

    if (!therapistEmail) {
      console.error("Therapist email not found in cookies");
      return;
    }

    try {
      const response = await API.put(`/appointments/${appointmentId}/status`, {
        status,
        therapistEmail,
      });

      if (response.status === 200) {
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== appointmentId)
        );
        toast.success("Updated status successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      toast.success("Error updating status:", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          fontSize: "14px",
        },
      });
    }
  };

  return (
    <div
      className={`w-full bg-white drop-shadow-md p-10 mx-auto ${
        appointments.length === 0 ? "h-[700px]" : "h-full"
      }`}
    >
      <h2 className="text-4xl text-center font-bold text-green-600 mb-8">
        Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No pending appointments</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="w-[450px] h-[350px] bg-white shadow-md border p-11 flex flex-col justify-evenly rounded-md hover:shadow-lg transition-shadow"
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
              <div className="text-[18px] mb-2 text-gray-700">
                <strong>Message:</strong>
                <span className="ml-2">{appointment.message}</span>
              </div>
              <div className="text-left text-[18px] text-gray-700 font-semibold">
                Status:
                <span
                  className={`${
                    appointment.status === "Accepted"
                      ? "text-green-600"
                      : appointment.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  } ml-2`}
                >
                  {appointment.status}
                </span>
              </div>
              {appointment.therapistEmail && (
                <div className="text-[18px] text-gray-700 mb-2">
                  <strong>Consulted by:</strong> {appointment.therapistEmail}
                </div>
              )}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleStatusChange(appointment.id, "Accepted")}
                  className="bg-green-500 text-white px-6 py-4 rounded-md hover:bg-green-700 transition text-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(appointment.id, "Rejected")}
                  className="bg-red-500 text-white px-6 py-4 rounded-md hover:bg-red-700 transition text-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingAppointments;
