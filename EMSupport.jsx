import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { MdFireTruck } from "react-icons/md";
import { FaCarCrash } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";

const EMSupport = () => {
  // Define emergency numbers
  const emergencyNumbers = {
    hospital: "tel:102",
    fireSafety: "tel:101",
    accident: "tel:103",
    police: "tel:100",
  };

  return (
    <div className="w-full h-[800px] flex items-center justify-center">
      <div className="w-[60%] h-full white flex flex-col items-center">
        <h1 className="mb-8 p-4 text-5xl text-[#109948] font-semibold text-center">
          Emergency Assistance
        </h1>
        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Hospital */}
          <a
            href={emergencyNumbers.hospital}
            className="flex flex-col items-center shadow-lg rounded-lg w-[400px] h-[300px] bg-white hover:bg-gray-200 transition duration-300"
          >
            <FaStethoscope className="text-[100px] text-[#109948] mb-8 mt-[80px]" />
            <span className="text-4xl font-semibold text-gray-700">
              Hospital
            </span>
          </a>

          {/* Fire & Safety */}
          <a
            href={emergencyNumbers.fireSafety}
            className="flex flex-col items-center shadow-lg rounded-lg w-[400px] h-[300px] bg-white hover:bg-gray-200 transition duration-300"
          >
            <MdFireTruck className="text-[100px] text-red-500 mb-8 mt-[80px]" />
            <span className="text-4xl font-semibold text-gray-700">
              Fire & Safety
            </span>
          </a>

          {/* Accident */}
          <a
            href={emergencyNumbers.accident}
            className="flex flex-col items-center shadow-lg rounded-lg w-[400px] h-[300px] bg-white hover:bg-gray-200 transition duration-300"
          >
            <FaCarCrash className="text-[100px] text-yellow-500 mt-[80px] mb-8" />
            <span className="text-4xl font-semibold text-gray-700">
              Accident
            </span>
          </a>

          {/* Police */}
          <a
            href={emergencyNumbers.police}
            className="flex flex-col items-center shadow-lg rounded-lg w-[400px] h-[300px] bg-white hover:bg-gray-200 transition duration-300"
          >
            <MdLocalPolice className="text-[100px] text-blue-500 mb-8 mt-[80px]" />
            <span className="text-4xl font-semibold text-gray-700">Police</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EMSupport;
