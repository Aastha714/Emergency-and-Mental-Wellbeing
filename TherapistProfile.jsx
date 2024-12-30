import React from "react";
import TherapistCard from "./TherapistCard";
import PersonalApp from "./PersonalApp";

const TherapistProfile = ({ userData, setAvatar }) => {
  return (
    <div className="flex gap-0 h-[700px]">
      <div className="mt-10 w-1/2 h-[600px] ml-[30px]">
        <TherapistCard therapistData={userData} setAvatar={setAvatar} />
      </div>
      <div className="mt-10 w-1/2 h-[600px] mr-[100px]">
        <PersonalApp therapistEmail={userData.email} />
      </div>
    </div>
  );
};

export default TherapistProfile;
