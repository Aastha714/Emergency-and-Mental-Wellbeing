import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import API from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import "./login.css";
import Image1 from "../assets/signup(1).jpg";
import Image2 from "../assets/therpist.jpg";
import Logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTherapist, setIsTherapist] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
  });

  const [therapistCredentials, setTherapistCredentials] = useState({
    email: "",
    password: "",
    name: "",
    licenceNo: "",
    specialization: "",
  });

  useEffect(() => {
    setIsTherapist(location.pathname === "/signup/therapist");
  }, [location.pathname]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (isTherapist) {
      setTherapistCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserCredentials((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || "" : value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const credentials = isTherapist ? therapistCredentials : userCredentials;

    if (
      !credentials.email ||
      !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(credentials.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required.";
    } else {
      if (credentials.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(credentials.password)) {
        newErrors.password =
          "Password must contain at least one special character.";
      }
    }

    if (!confirmPassword || credentials.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!credentials.name) {
      newErrors.name = "Name is required.";
    }

    if (!isTherapist && (!credentials.age || credentials.age <= 0)) {
      newErrors.age = "Please enter a valid age.";
    }

    if (isTherapist && !credentials.specialization) {
      newErrors.specialization = "Specialization is required.";
    }

    if (isTherapist && !credentials.licenceNo) {
      newErrors.licenceNo = "License/Registration number is required.";
    }

    if (!isTherapist && !credentials.gender) {
      newErrors.gender = "Please select a gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const credentials = isTherapist ? therapistCredentials : userCredentials;

    try {
      const endpoint = isTherapist
        ? "/auth/signUp/therapist"
        : "/auth/signUp/user";

      const response = await API.post(endpoint, credentials);

      setUserCredentials({
        email: "",
        password: "",
        name: "",
        age: "",
        gender: "",
      });
      setTherapistCredentials({
        email: "",
        password: "",
        name: "",
        licenceNo: "",
        specialization: "",
      });
      setConfirmPassword("");
      setMessage("");

      toast.success("Registration successful! Redirecting to login...", {
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
      // Delay navigation to login after toast is shown
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please try again.", {
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
      } else {
        toast.error("Signup failed. Please try again.", {
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
    }
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="left-image">
        <img
          src={isTherapist ? Image2 : Image1}
          alt="signup illustration"
          className="w-full h-full object-fit"
        />
      </div>
      <div className="right">
        <div className="mb-5 mt-5">
          <img src={Logo} alt="Logo" className="w-[60px] m-auto" />
        </div>
        <div className="w-[100%] h-[50px] text-[30px] font-semibold text-[#109948] text-center mb-[20px]">
          <h2>Sign up as {isTherapist ? "Therapist" : "User"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-[100%] h-[350px] relative">
          <div className="w-[450px] h-[40px] m-auto mb-2">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={
                isTherapist ? therapistCredentials.email : userCredentials.email
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            {message && <p className="text-red-500 text-left ">{message}</p>}
          </div>
          <div className="w-[450px] h-[40px] m-auto mt-[40px] flex justify-between gap-8">
            <div className="flex flex-col w-[100%]">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  isTherapist ? therapistCredentials.name : userCredentials.name
                }
                onChange={handleInput}
                className="w-[100%] h-[100%] p-[30px] outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col w-[100%]">
              <input
                type={isTherapist ? "text" : "number"}
                name={isTherapist ? "specialization" : "age"}
                placeholder={isTherapist ? "Specialization" : "Age"}
                value={
                  isTherapist
                    ? therapistCredentials.specialization
                    : userCredentials.age
                }
                onChange={handleInput}
                className="w-[100%] h-[100%] p-[30px] outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
              />
              {isTherapist && errors.specialization && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specialization}
                </p>
              )}
              {!isTherapist && errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>
          </div>

          {isTherapist && (
            <div className="w-[450px] h-[40px] m-auto mt-[40px]">
              <input
                type="text"
                name="licenceNo"
                placeholder="License/Registration Number"
                value={therapistCredentials.licenceNo}
                onChange={handleInput}
                className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
              />
              {errors.licenceNo && (
                <p className="text-red-500">{errors.licenceNo}</p>
              )}
            </div>
          )}
          <div className="w-[450px] h-[40px] m-auto mt-[40px] relative">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={
                isTherapist
                  ? therapistCredentials.password
                  : userCredentials.password
              }
              onChange={handleInput}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            {showPassword1 ? (
              <FaEyeSlash
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute top-[64%] right-[5%] text-[#109948] text-[20px]"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            )}
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="w-[450px] h-[40px] m-auto mt-[40px] relative">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[100%] h-[100%] p-[30px] brd outline-none bg-[#F6F6F6] rounded-lg text-[18px]"
            />
            {showPassword2 ? (
              <FaEyeSlash
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-[64%] right-[5%] text-[#109948] text-[20px]"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute top-[64%] right-[5%] text-[#d6d5d5] text-[20px]"
              />
            )}
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          {!isTherapist && (
            <div className="absolute top-[100%] left-[16%]">
              <label className="text-[18px] text-[#d6d5d5]">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userCredentials.gender === "Male"}
                  onChange={handleInput}
                  className="accent-[#109948] w-[25px] h-[18px]"
                />
                Male
              </label>
              <label className="text-[18px] text-[#d6d5d5]">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userCredentials.gender === "Female"}
                  onChange={handleInput}
                  className="accent-[#109948] ml-[295px] w-[25px] h-[18px]"
                />
                Female
              </label>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>
          )}
          <div
            className={
              isTherapist
                ? "absolute top-[118%] left-[26.5%]"
                : " absolute top-[116%] left-[26.5%]"
            }
          >
            <button
              type="submit"
              className="w-[300px] h-[50px] rounded-[30px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div
          className={
            isTherapist
              ? "absolute top-[94%] right-[18%] text-[14px]"
              : "absolute top-[93%] right-[18%] text-[14px]"
          }
        >
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-[#008055]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
