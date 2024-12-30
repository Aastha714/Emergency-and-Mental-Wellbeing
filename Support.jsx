import React, { useState } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    therapistEmail: "",
  });
  const navigate = useNavigate();

  const handleFindSupportClick = () => {
    setFormErrors({});
    setFormData({ name: "", email: "", date: "", time: "", message: "" });
    const email = Cookies.get("email");
    if (!email) {
      navigate("/403");
      return;
    }
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date();
    const selectedDate = new Date(formData.date);

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.date.trim()) {
      errors.date = "Date is required.";
    } else if (selectedDate < today.setHours(0, 0, 0, 0)) {
      errors.date = "You cannot book a session for a past date.";
    }
    if (!formData.time.trim()) errors.time = "Time is required.";
    if (!formData.message.trim()) errors.message = "Message is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedFormData = {
      ...formData,
      therapistEmail: formData.therapistEmail || "",
    };

    try {
      const response = await API.post("/appointments", updatedFormData);
      if (response.status === 200) {
        toast.success("Appointment booked successfully!", {
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
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          message: "",
          therapistEmail: "",
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.", {
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
    <div className="h-[600px] bg-white">
      <div className="m-auto flex w-[95%] h-[90%] mt-10 bg-white">
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-teal-800 text-center rounded-lg drop-shadow-md">
          <h1 className="mt-[250px] text-5xl leading-normal text-[#f6f6f6]">
            Book an Appointment with a Therapist
          </h1>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full text-center text-5xl relative">
          <h2 className="text-6xl mt-[180px] text-[#001A35] font-bold text-left ml-[65px] drop-shadow-md">
            Healing starts with asking for help
          </h2>
          <p className="mt-[30px] text-3xl text-left ml-[65px] text-gray-600 drop-shadow-md">
            You deserve to feel better. A therapist can offer the support you
            need.
          </p>
          <div className="ml-[68px] mt-[40px] w-[200px] h-[50px] text-white bg-[#109948] hover:bg-[#008055]">
            <button
              type="submit"
              className="w-[100%] h-[50px] bg-[#109948] hover:bg-[#008055] rounded-[8px] text-white text-[18px] font-semibold"
              onClick={handleFindSupportClick}
            >
              Find Support
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-12 w-[95%] md:w-[50%]">
            <h2 className="text-4xl font-semibold text-center mb-8">
              Book Appointment
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                />
                {formErrors.date && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                />
                {formErrors.time && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full h-[100px] px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-300 text-[16px] rounded-lg hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-[16px] text-white rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
