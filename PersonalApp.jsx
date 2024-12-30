import React, { useState, useEffect } from "react";
import API from "../api/api";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalApp = ({ therapistEmail }) => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get(
          `/appointments?therapistEmail=${therapistEmail}`
        );
        if (response.status === 200) {
          const pendingAppointments = response.data.filter(
            (appointment) => appointment.status === "Pending"
          );
          setAppointments(pendingAppointments);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [therapistEmail]);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      const response = await API.put(`/appointments/${appointmentId}/status`, {
        status,
        therapistEmail,
      });
      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
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

  const handleNextPage = () => {
    if (currentPage < Math.ceil(appointments.length / itemsPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const currentItems = appointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full bg-white drop-shadow-md p-10 max-w-4xl mx-auto">
      <h2 className="text-4xl text-center font-bold text-green-600 mb-8">
        Personal Appointment Scheduler
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No pending appointments</p>
      ) : (
        <>
          <div className="space-y-6">
            {currentItems.map((appointment) => (
              <div
                key={appointment.id}
                className="border px-10 py-6 rounded-md bg-gray-50 shadow-sm hover:shadow-md transition-shadow h-[190px]"
              >
                <p className="text-[18px] text-gray-700">
                  <strong>User:</strong> {appointment.email}
                </p>
                <p className="text-[18px] text-gray-700">
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p className="text-[18px] text-gray-700">
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p className="text-[18px] text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span className="text-yellow-500 ml-2">
                    {appointment.status}
                  </span>
                </p>
                <div className="mt-4 flex space-x-4 relative">
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Accepted")
                    }
                    className="bg-green-500 text-white px-6 py-4 rounded-md hover:bg-green-700 transition text-[14px] font-semibold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Rejected")
                    }
                    className="bg-red-500 text-white px-6 py-4 rounded-md hover:bg-red-700 transition text-[14px] font-semibold "
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaArrowLeftLong size={20} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage >= Math.ceil(appointments.length / itemsPerPage) - 1
              }
              className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 ${
                currentPage >= Math.ceil(appointments.length / itemsPerPage) - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <FaArrowRightLong size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalApp;
