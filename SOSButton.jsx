import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cookies from "js-cookie";
import API from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SOSButton = () => {
  const [open, setOpen] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const email = Cookies.get("email");
  const role = Cookies.get("role");
  const userName = Cookies.get("userName");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (!email || role === "THERAPIST") {
      navigate("/403");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendSOSRequest = async (latitude, longitude) => {
    setIsSendingSOS(true);

    const sosData = {
      userId: email,
      username: userName,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      const response = await API.post("/user/api/send-sos", sosData);
      toast.success("SOS message sent successfully.", {
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
    } catch (error) {
      toast.error("Error sending SOS message.", {
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
    } finally {
      setIsSendingSOS(false);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    setIsSendingSOS(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendSOSRequest(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch location.");
          setIsSendingSOS(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsSendingSOS(false);
    }
  };

  return (
    <div className="w-full h-[650px] flex items-center justify-center flex-col">
      <h1 className="mb-4 p-4 text-5xl text-[#109948] font-semibold text-center mt-10">
        Emergency System
      </h1>
      <div className="w-[40%] h-[90%] p-4 mb-4 flex items-center justify-center bg-white drop-shadow-md">
        <div className="relative flex items-center justify-center group">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FCC7CF] opacity-50 animate-pulse group-hover:scale-110 transition-transform duration-300"></div>

          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FD778A] opacity-75 group-hover:scale-125 transition-transform duration-300"></div>

          <button
            className="relative w-[200px] h-[200px] rounded-full bg-[#FF2945] text-white text-[50px] flex items-center justify-center group-hover:scale-150 transition-transform duration-300"
            onClick={handleClickOpen}
            disabled={isSendingSOS}
          >
            SOS
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "18px" }}>
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "18px" }}
          >
            Do you really want to send an SOS alert? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontSize: "14px" }}>
            No
          </Button>
          <Button onClick={handleConfirm} autoFocus sx={{ fontSize: "14px" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SOSButton;
