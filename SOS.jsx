import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import SOSButton from "../components/SOSButton";
import EMSupport from "../components/EMSupport";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const SOS = () => {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const userEmail = Cookies.get("email");
  const userRole = Cookies.get("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole === "ADMIN" || userRole === "THERAPIST") {
      navigate("/403");
    }
  }, [userRole]);

  useEffect(() => {
    if (userEmail && userRole) {
      setRole(userRole);
      setIsLoggedIn(true);

      const fetchUserDetails = async () => {
        try {
          const response =
            userRole === "USER"
              ? await API.get(`/user/${userEmail}`)
              : await API.get(`/therapist/${userEmail}`);

          if (response.status === 200) {
            setUser(response.data.name);
            setAvatar(response.data.profilePicture || "");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
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
          <SOSButton />
          <EMSupport />
          <Footer />
        </>
      )}
    </>
  );
};

export default SOS;
