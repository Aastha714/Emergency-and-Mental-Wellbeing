import React, { useState } from "react";
import Modal from "react-modal";
import API from "../api/api.js";
Modal.setAppElement("#root");

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      const response = await API.post("/auth/forgot-password", { email });
      setMessage(response.data);

      // Automatically close the modal after 10 seconds
      setTimeout(() => {
        handleClose();
      }, 10000);
    } catch (error) {
      setMessage("Email not found.");
    }
  };

  const handleClose = () => {
    setEmail(""); // Clear the email input
    setMessage(""); // Clear the message
    onClose(); // Call the parent component's onClose handler
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="bg-white rounded-lg shadow-lg w-[50%] h-[70%] p-6"
    >
      <h2 className="text-5xl text-center  text-[#001A35] font-bold drop-shadow mb-8 mt-[120px]">
        Reset Password
      </h2>
      <div className="flex flex-col items-center   m-auto">
        <div className=" w-[450px] h-[30px] mb-[50px]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] h-[100%] p-[30px]  outline-none bg-white  border-gray-400 border rounded-lg text-[18px] mb-4 mt-6"
          />
        </div>
        <div className=" w-[450px]  text-white mt-4 mb-4">
          <button
            onClick={handlePasswordReset}
            className=" w-full h-[60px] bg-[#109948] hover:bg-[#008055] rounded-[8px] text-white text-[18px] font-semibold "
          >
            Submit
          </button>
        </div>

        <div className="w-[450px]  ">
          <button
            onClick={handleClose}
            className="w-full h-[60px]  rounded-[8px] text-[18px] font-semibold  bg-gray-300 text-black  hover:bg-gray-400 transition-colors duration-300"
          >
            Close
          </button>
        </div>
        {message && (
          <p className="mt-4 text-[18px] text-center text-green-600 mb-4">
            {message}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
