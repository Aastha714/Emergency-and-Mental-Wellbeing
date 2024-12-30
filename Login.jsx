import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./login.css";
import Image from "../assets/login.jpg";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/api.js";
import ForgotPasswordModal from "../components/ForgetPasswordModal.jsx";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginCredentials.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(loginCredentials.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!loginCredentials.password) {
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await API.post("/auth/login", loginCredentials);

      if (response.status === 200) {
        const email = loginCredentials.email;
        const roles = response.data.roles;
        const userName = response.data.name;

        Cookies.set("email", email, { path: "/", expires: 7 });
        Cookies.set("role", roles, { path: "/", expires: 7 });
        Cookies.set("userName", userName, { path: "/", expires: 7 });

        toast.success("Login successful! Redirecting...", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            fontSize: "14px",
          },
        });

        setTimeout(() => {
          if (roles[0] === "USER") {
            window.location.href = "/userDb";
          } else if (roles[0] === "THERAPIST") {
            window.location.href = "/therapistDb";
          } else if (roles[0] === "ADMIN") {
            window.location.href = "/admin";
          } else {
            toast.error("Invalid role!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              style: {
                backgroundColor: "#FF3131",
                color: "#fff",
                fontSize: "14px",
              },
            });
          }
        }, 3000);
      }
    } catch (error) {
      toast.error("Email or Password is incorrect. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: "#FF3131", color: "#fff", fontSize: "14px" },
      });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="main mt-[50px]">
      <ToastContainer />
      <div className="left-image">
        <img
          src={Image}
          alt="Login illustration"
          className="w-full h-full object-fit"
        />
      </div>

      <div className="right">
        <div className="mb-10 mt-10">
          <img src={Logo} alt="Logo" className="w-[60px] m-auto" />
        </div>
        <div className="w-[100%] h-[100px] text-[30px] font-semibold text-[#109948] text-center mb-[70px]">
          <h2 className="mb-5"> Login</h2>
          <h2 className="">Welcome to HopeLine</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-[100%] h-[350px] relative">
          <div className="w-[450px] h-[30px] m-auto">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginCredentials.email}
              onChange={handleInput}
              className={`w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px] ${
                errors.email ? "border-red-500 " : "border-[#d5d6d6]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xl mt-2 ">{errors.email}</p>
            )}
          </div>
          <div className="w-[450px] h-[30px] m-auto mt-[60px] relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginCredentials.password}
              onChange={handleInput}
              className={`w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px] ${
                errors.password ? "border-red-500" : "border-[#d5d6d6]"
              }`}
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            )}
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className=" text-[18px] text-[#109948] mt-2 ml-[280px]"
            >
              Forgot Password ?
            </button>
            <ForgotPasswordModal
              isOpen={isForgotPasswordOpen}
              onClose={() => setIsForgotPasswordOpen(false)}
            />
            {errors.password && (
              <p className="text-red-500 text-lg mt-[-30px]">
                {errors.password}
              </p>
            )}
          </div>

          <div className="absolute top-[58%] right-[27%]">
            <button
              type="submit"
              className="w-[300px] h-[50px] rounded-[30px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold"
            >
              Log In
            </button>
          </div>
          <div className="absolute top-[73%] right-[33%] text-[14px] ">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#008055]">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
