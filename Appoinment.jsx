import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PendingAppointments from "../components/PendingAppointments";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
const Appoinment = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [loading, setLoading] = useState(true);
  const userRole = Cookies.get("role"); // Loading state to handle async calls
  const userEmail = Cookies.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail || userRole === "USER") {
      navigate("/403");
    }
  }, [userEmail, navigate]);

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
            setUser(response.data.name); // Set the user name
            setAvatar(response.data.profilePicture || ""); // Set the avatar or fallback
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false); // If no email or role in cookies, stop loading
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
        <Loading />
      ) : (
        <>
          <ToastContainer />
          <PendingAppointments />
          <Footer />
        </>
      )}
    </>
  );
};

export default Appoinment;