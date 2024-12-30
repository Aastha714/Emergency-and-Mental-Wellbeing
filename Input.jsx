import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

const Input = ({ label, value, onChange, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    onSave(); // Call the save function to update the database
  };

  return (
    <div className="flex justify-between items-center m-auto mt-5 w-[500px] h-[60px] text-[18px]">
      <label className="text-[#109948] w-[150px] text-left pr-4">
        {label}:
      </label>
      {isEdit ? (
        <div className="flex-grow relative bg-[#f6f6f6] h-[50px] rounded-md flex items-center">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="text-[#000] bg-[#f6f6f6] text-[18px] p-3 pl-4 outline-none w-full h-full rounded-md"
          />
          <FaCheck
            className="absolute right-4 cursor-pointer text-[#109948]"
            onClick={handleSave}
          />
        </div>
      ) : (
        <div className="flex-grow relative p-3 pl-4 bg-[#f6f6f6] h-[50px] rounded-md flex items-center">
          {value}
          <BiSolidPencil
            className="absolute right-4 text-[20px] text-[#109948] cursor-pointer"
            onClick={() => setIsEdit(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
