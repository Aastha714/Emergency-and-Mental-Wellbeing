import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaSquareXmark } from "react-icons/fa6";

const Contact = ({ phone, name, relationship, deleteContact }) => {
  return (
    <div className="flex justify-between items-center m-auto mt-5 w-[600px] h-[60px] text-[18px] bg-[#f6f6f6] rounded-md px-4">
      <div className="flex items-center w-[25%] justify-center">
        <FaPhoneVolume className="text-[#109948] text-[24px]" />
      </div>
      <div className="w-[25%] text-center">{phone}</div>
      <div className="w-[25%] text-center">{name}</div>
      <div className="w-[25%] text-center">{relationship}</div>
      <div className="flex items-center w-[10%] justify-center">
        <FaSquareXmark
          className="text-red-500 text-[24px] cursor-pointer"
          onClick={() => deleteContact(phone, relationship)}
        />
      </div>
    </div>
  );
};

export default Contact;
