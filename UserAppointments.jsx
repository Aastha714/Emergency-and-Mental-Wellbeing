import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import "../main.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [therapistNames, setTherapistNames] = useState({}); // Store therapist names by email

  const userEmail = Cookies.get("email");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get(`/appointments/user/${userEmail}`);
        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (err) {
        setError("Error fetching appointments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchTherapistNames = async () => {
      const emails = [
        ...new Set(
          appointments
            .map((appointment) => appointment.therapistEmail)
            .filter(Boolean)
        ),
      ];

      const names = {};
      await Promise.all(
        emails.map(async (email) => {
          try {
            const response = await API.get(`/therapist/${email}/name`);
            if (response.status === 200) {
              names[email] = response.data; // Save therapist name by email
            }
          } catch (err) {
            console.error(`Error fetching name for therapist ${email}:`, err);
          }
        })
      );
      setTherapistNames(names);
    };

    if (appointments.length > 0) {
      fetchTherapistNames();
    }
  }, [appointments]);

  const handleReschedule = async (id) => {
    try {
      const response = await API.put(`/appointments/${id}/status`, {
        status: "Pending",
        therapistEmail: "",
      });
      if (response.status === 200) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: "Pending", therapistEmail: "" }
              : appointment
          )
        );
      }
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
    }
  };

  const filterFutureAppointments = (appointments) => {
    const today = new Date().setHours(0, 0, 0, 0); // Current date at midnight
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date).setHours(0, 0, 0, 0); // Appointment date at midnight
      return appointmentDate >= today;
    });
  };

  const futureAppointments = filterFutureAppointments(appointments);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-5 w-full flex justify-center mb-[100px]">
      <div className="w-[90%]">
        <h2 className="text-5xl font-semibold mb-8 text-center text-[#109948]">
          My Appointments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureAppointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            futureAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="w-[450px] h-[350px] bg-white shadow-md border p-11 flex flex-col justify-evenly transform hover:scale-105 transition-transform duration-300"
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
                  <strong>Message:</strong>{" "}
                  <span className="ml-2">{appointment.message}</span>
                </div>
                <div className="text-left text-[18px] text-gray-700 font-semibold">
                  Status:{" "}
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
                {appointment.status === "Rejected" ? (
                  <button
                    onClick={() => handleReschedule(appointment.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-[100px] h-[40px] text-xl font-semibold"
                  >
                    Reschedule
                  </button>
                ) : appointment.therapistEmail ? (
                  <div className="text-[18px] text-gray-700 mb-2">
                    <strong>Consulted by: </strong>{" "}
                    <span>
                      Dr.
                      {therapistNames[appointment.therapistEmail] ||
                        "Loading..."}
                    </span>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserAppointments;
