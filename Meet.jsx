import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import API from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Meet = () => {
  const [therapists, setTherapists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    therapistEmail: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await API.get("/therapist/all");
        if (response.status === 200) {
          setTherapists(response.data);
        }
      } catch (err) {
        setError("Error fetching therapists.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const totalPages = Math.ceil(therapists.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalPages ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleBookNow = ({ email }) => {
    const userEmail = Cookies.get("email");
    if (!userEmail) {
      navigate("/403");
    }
    setFormData((prev) => ({
      ...prev,
      therapistEmail: email,
    }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.date.trim()) errors.date = "Date is required.";
    if (!formData.time.trim()) errors.time = "Time is required.";
    if (!formData.message.trim()) errors.message = "Message is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await API.post("/appointments", formData);
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
    } catch (err) {
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

  const displayedTherapists = therapists.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className=" w-full h-auto bg-white text-center pt-[20px] relative">
      <h2 className="pt-5 text-6xl text-[#001A35] font-bold drop-shadow">
        Meet Our Therapists
      </h2>
      <div className="m-auto flex flex-wrap justify-center gap-6 mt-10 w-[100%]">
        {displayedTherapists.map((therapist) => (
          <div
            key={therapist.id}
            className="transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden"
          >
            <ProfileCard {...therapist} onBookNow={handleBookNow} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className="p-3 bg-[#109948] text-white rounded-full hover:bg-[#008055] absolute top-[50%] left-[5%] w-[50px] h-[50px]"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft className="ml-[7px] text-[18px]" />
        </button>
        <button
          className="p-3 bg-[#109948] text-white rounded-full hover:bg-[#008055] absolute top-[50%] right-[5%] w-[50px] h-[50px]"
          onClick={handleNext}
          disabled={currentIndex + 1 >= totalPages}
        >
          <FaArrowRight className="ml-[9px] text-[18px]" />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-12 w-[95%] md:w-[50%]">
            <h2 className="text-4xl font-semibold text-center mb-8">
              Book Appointment
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2 text-left">
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
                  <p className="text-red-600 text-[10px] mt-1 text-left">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2 text-left">
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
                  <p className="text-red-600 text-[10px] mt-1 text-left">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2 text-left">
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
                  <p className="text-red-600 text-[10px] mt-1 text-left">
                    {formErrors.date}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2 text-left">
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
                  <p className="text-red-600 text-[10px] mt-1 text-left">
                    {formErrors.time}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-[16px] mb-2 text-left">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full h-[100px] px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-600 text-[10px] mt-1 text-left">
                    {formErrors.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-300 text-[16px] rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    setShowForm(false);
                    setFormErrors({});
                  }}
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

export default Meet;
