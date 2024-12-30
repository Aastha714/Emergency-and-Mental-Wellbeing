import React, { useState, useEffect } from "react";
import image from "../assets/happy.jpg";
import API from "../api/api";
import Cookies from "js-cookie";
import men from "../assets/happy(men).jpg";
import women from "../assets/happy(women).jpg";

const UserHome = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGender, setUserGender] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const email = Cookies.get("email");
    const userRole = Cookies.get("role");

    if (email && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);

      if (userRole !== "ADMIN") {
        const fetchUserDetails = async () => {
          try {
            const response = await API.get(`/user/${email}`);
            if (response.status === 200) {
              setUserName(response.data.name);
              setUserGender(response.data.gender);
            } else {
              console.error("Failed to fetch user details");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };

        fetchUserDetails();
      }
    } else {
      setRole(""); // No role in cookies
    }
  }, []);

  const getImage = () => {
    if (role === "ADMIN" || !isLoggedIn) return image;

    const cleanGender = userGender?.trim().toLowerCase();

    if (cleanGender === "male") return men;
    if (cleanGender === "female") return women;
    return image;
  };

  return (
    <div className="bg-white">
      <div className="flex justify-around items-center w-[95%] m-auto mt-11 h-[500px] rounded-lg p-6 drop-shadow-md">
        <div className="text-6xl text-[#001A35] font-medium animate-fade-in ml-11">
          <h1 className="relative inline-block leading-snug">
            {isLoggedIn && role !== "ADMIN" ? (
              <>
                <span className="animate-slide-up text-7xl font-bold block">
                  Hey,{" "}
                  <span className="text-green-700 animate-pulse-infinite">
                    {userName}
                  </span>
                </span>
                <span className="block text-4xl mt-4">
                  How’s your mood today?
                </span>
              </>
            ) : (
              <>
                <span className="animate-slide-up block">
                  Welcome to Your Mental Wellness!
                </span>
                <span className="block text-4xl mt-4">
                  Your well-being starts with a smile 😊
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 text-xl text-gray-600 animate-fade-in-delayed leading-relaxed">
            {isLoggedIn && role !== "ADMIN"
              ? `We're glad to see you, ${userName}! Take a moment today to reflect, relax, and smile. Your mental health matters. 🌟`
              : "Take the first step towards a healthier mind. Let’s build your journey to happiness together!"}
          </p>
        </div>

        <div className="ml-[10px] w-[600px] h-[400px] animate-zoom-in">
          <img
            src={getImage()}
            alt="Happy"
            className="w-full h-full object-cover rounded-lg drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
