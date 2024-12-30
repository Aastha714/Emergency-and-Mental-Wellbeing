import React from "react";

const ProfileCard = ({
  profilePicture,
  name,
  specialization,
  licenceNo,
  email,
  onBookNow,
}) => {
  return (
    <div className="w-[300px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img
        src={profilePicture || "https://via.placeholder.com/250"} // Fallback image if profilePicture is null
        alt={name}
        className="w-full h-[260px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-3xl font-bold text-[#001A35] drop-shadow-md">
          {name}
        </h3>
        <p className=" mt-2 font-medium text-[14px] text-gray-800">
          {specialization}
        </p>
        <p className="text-gray-500 mt-1 text-[14px]">
          License: <span className="text-gray-800">{licenceNo}</span>
        </p>
        <p className="text-gray-500 mt-1 text-[14px]">
          Email: <span className="text-gray-800">{email}</span>
        </p>
        <button
          className="mt-4 px-4 py-2 w-[200px] h-[50px] bg-[#109948] text-[18px] text-white rounded-[6px] hover:bg-[#008055]"
          onClick={() => onBookNow({ name, email })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
