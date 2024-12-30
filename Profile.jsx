import React from "react";
import Card from "./Card";
import EMGC from "./EMGC";

const Profile = ({ userData, setUserData }) => {
  return (
    <div className="flex gap-0">
      <div className="mt-10 w-1/2 h-[600px] ml-[30px]">
        <Card userData={userData} setUserData={setUserData} />
      </div>
      <div className="mt-10 w-1/2 h-[600px] mr-[100px]">
        <EMGC />
      </div>
    </div>
  );
};

export default Profile;
