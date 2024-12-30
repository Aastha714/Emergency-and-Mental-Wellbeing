import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if (!passwords.newPassword) {
      errors.newPassword = "New password is required.";
    } else if (!passwordRegex.test(passwords.newPassword)) {
      errors.newPassword =
        "Password must be at least 6 characters long and include at least one special character.";
    }

    if (passwords.confirmPassword !== passwords.newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await API.post("/auth/reset-password", {
        token,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });
      setMessage(response.data);

      // Redirect to login page after successful reset
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage("Error resetting password.");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-[50%] h-[50%]">
        <h2 className="text-4xl text-[#001A35] font-bold drop-shadow text-center mb-10 mt-11">
          Please Update The Password
        </h2>
        <div className="w-full h-[50px] mb-10 mt-10">
          <input
            type="password"
            placeholder="New Password"
            className={`w-full h-full p-3 text-[#000] bg-[#f6f6f6] text-[18px] pl-4 outline-none rounded-md ${
              errors.newPassword ? "border-red-500 border" : ""
            }`}
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>
        <div className="w-full h-[50px] mb-10 mt-10">
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full h-full p-3 text-[#000] bg-[#f6f6f6] text-[18px] pl-4 outline-none rounded-md ${
              errors.confirmPassword ? "border-red-500 border" : ""
            }`}
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full h-[50px] bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-10 text-3xl"
        >
          Reset Password
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
