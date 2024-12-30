import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../api/api.js";
import { useNavigate } from "react-router-dom";
import therapistImage from "../assets/therpistImg.jpg";
import image1 from "../assets/THome1.jpg";
import image2 from "../assets/THome2.jpeg";

const TherpistHome = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      setIsLoggedIn(true);
      const handleUserName = async () => {
        try {
          const response = await API.get(`/therapist/${email}/name`);
          if (response.status === 200) {
            console.log(response);
            setUserName(response.data);
          } else {
            console.log("error");
          }
        } catch (err) {
          console.log(err);
        }
      };
      handleUserName();
    }
  });
  const navigate = useNavigate(); // Initializing useNavigate

  // Handle the button click to navigate to the feedback page
  const handleButtonClick = () => {
    navigate("/appointments"); // Redirects to the feedback page
  };
  const handleFindSupportClick = () => {
    navigate("/sessions");
  };

  return (
    <>
      <div className="flex justify-around items-center  w-[95%] m-auto mt-11 h-[500px] rounded-lg p-6 drop-shadow-md">
        {/* Left Section */}
        <div className="text-6xl text-[#001A35] font-medium ml-11 animate-fade-in">
          <h1 className="relative inline-block leading-snug">
            {isLoggedIn ? (
              <>
                <span className="text-7xl font-bold block animate-slide-up">
                  Welcome,{" "}
                  <span className="text-green-700 animate-pop">
                    Dr. {userName}
                  </span>
                </span>
                <span className="block text-4xl mt-4 animate-slide-down">
                  Ready to assist your clients today?
                </span>
              </>
            ) : (
              <>
                <span className="block animate-slide-up">
                  Welcome to the Therapist Portal!
                </span>
                <span className="block text-4xl mt-4 animate-slide-down">
                  Start managing your sessions and clients efficiently.
                </span>
              </>
            )}
          </h1>

          {/* Additional Paragraph */}
          <p className="mt-6 text-xl text-gray-600 leading-relaxed animate-fade-in-delayed">
            {isLoggedIn
              ? `Keep empowering lives, Dr. ${userName}. Check your appointments, manage sessions, and make a difference! 🌟`
              : "Log in to begin your journey of transforming lives and spreading hope."}
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="ml-[10px] w-[600px] h-[400px] animate-zoom-in">
          <img
            src={therapistImage}
            alt="Therapist"
            className="w-full h-full object-cover rounded-lg drop-shadow-lg"
          />
        </div>
      </div>
      <div className="w-[100%] mt-[20px] h-[1200px] bg-white text-left m-auto rounded-md">
        <div className="m-auto flex w-[95%] h-[550px] mt-10 drop-shadow-md">
          <div className="w-full md:w-1/2 h-1/2 md:h-full b">
            <img
              src={image1}
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full  text-center text-6xl relative">
            <h2 className="mt-[180px] text-[#001A35] font-bold text-left ml-[65px]">
              Pending Appointments
            </h2>
            <p className="mt-[40px] text-gray-600 text-3xl text-left ml-[65px]">
              Check your pending appointments and take the necessary action.
            </p>
            <div className="ml-[68px] mt-[40px] w-[240px] h-[50px] text-white ">
              <button
                type="button"
                className="w-[100%] h-[50px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold"
                onClick={handleButtonClick} // Set the onClick handler
              >
                Check Appointments
              </button>
            </div>
          </div>
        </div>
        <div className="m-auto flex w-[95%] h-[500px] mt-10 drop-shadow-md  rounded-md">
          <div className="w-full md:w-1/2 h-1/2 md:h-full text-center">
            <h2 className="text-6xl mt-[160px] m-auto ml-[45px] text-left font-bold text-[#001A35]">
              Your Accepted Sessions
            </h2>
            <p className=" text-3xl ml-[45px] text-left m-auto mt-[30px] text-gray-600">
              Manage your upcoming sessions and provide support.
            </p>
            <div className="  ml-[47px] mt-[40px] w-[200px] h-[50px]  text-white bg-[#109948] hover:bg-[#008055]">
              <button
                type="submit"
                className="w-[100%] h-[50px]  bg-[#109948] hover:bg-[#008055] rounded-[8px] text-white text-[18px] font-semibold"
                onClick={handleFindSupportClick}
              >
                Accepted Sessions
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full ">
            <img
              src={image2}
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TherpistHome;
