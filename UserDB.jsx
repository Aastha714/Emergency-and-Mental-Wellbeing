import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Profile from "../components/Profile";
import Analysis from "../components/Analysis";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import UserAppointments from "../components/UserAppointments";
import { ToastContainer } from "react-toastify";

const UserDB = () => {
  const email = Cookies.get("email");
  const role = Cookies.get("role");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || role === "THERAPIST" || role === "ADMIN") {
      navigate("/403");
    }
  }, [email, role, navigate]);

  useEffect(() => {
    if (email && role !== "THERAPIST") {
      setIsLoggedIn(true);
      fetchUserDetails();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, [email, role]);

  const fetchUserDetails = async () => {
    try {
      const response = await API.get(`/user/${email}`);
      console.log("User Details:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userData?.name || ""}
        avatar={userData?.profilePicture || ""}
      />
      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-pink-500 origin-left-right"></div>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          {userData && (
            <Profile userData={userData} setUserData={setUserData} />
          )}
          <Analysis />
          <UserAppointments />
          <Footer />
        </>
      )}
    </div>
  );
};

export default UserDB;
