import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import mood from "../assets/mood.png";

const Assement = () => {
  const navigate = useNavigate(); // Initializing useNavigate

  // Handle the button click to navigate to the feedback page
  const handleButtonClick = () => {
    navigate("/feedBack"); // Redirects to the feedback page
  };

  return (
    <div className="m-auto flex w-[95%] h-[80%] mt-10 drop-shadow-md rounded-md">
      <div className="w-full md:w-1/2 h-1/2 md:h-full drop-shadow-md">
        <img
          src={mood}
          alt=""
          className="w-[100%] h-[100%] object-cover rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full  text-center text-5xl relative">
        <h2 className="mt-[180px] text-[#001A35] text-6xl font-bold text-left ml-[65px]">
          Let us know how you’re doing
        </h2>
        <p className="mt-[40px] text-gray-600 text-3xl text-left ml-[65px]">
          Your feelings matter. Share your mood to help us provide the right
          support.
        </p>

        <div className="ml-[68px] mt-[40px] w-[200px] h-[50px] text-white ">
          <button
            type="button"
            className="w-[100%] h-[50px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold"
            onClick={handleButtonClick} // Set the onClick handler
          >
            Share your Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assement;
