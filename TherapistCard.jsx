import React, { useState, useEffect } from "react";
import Input from "./Input";
import API from "../api/api";
import image from "../assets/download.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TherapistCard = ({ therapistData, setAvatar }) => {
  const [name, setName] = useState(therapistData.name);
  const [email] = useState(therapistData.email);
  const [specialization, setSpecialization] = useState(
    therapistData.specialization
  );
  const [licenceNo, setLicenceNo] = useState(therapistData.licenceNo);
  const [originalImage, setOriginalImage] = useState(
    therapistData.profilePicture
  );
  const [tempImage, setTempImage] = useState(therapistData.profilePicture);
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    if (therapistData.profilePicture) {
      setOriginalImage(therapistData.profilePicture);
      setTempImage(therapistData.profilePicture);
    }
  }, [therapistData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result); // Show the uploaded image locally
    };
    reader.readAsDataURL(file);
  };
  const handleSave = async (field, value) => {
    try {
      const updatedData = {
        ...therapistData,
        [field]: value,
      };

      const response = await API.put(`/therapist/${email}`, updatedData);

      if (response.status === 200) {
        if (field === "name") setName(value);
        if (field === "specialization") setSpecialization(value);
        if (field === "licenceNo") setLicenceNo(value);
        toast.success("User details updated successfully!", {
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
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      toast.error("Failed to update user details. Please try again.", {
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
  };
  const handleSaveImage = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImage); // You might need to process this file in the backend
      data.append("upload_preset", "photos");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwcqn9ilb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();

        const updatedResponse = await API.put(`/therapist/${email}`, {
          profilePicture: result.url,
        });

        if (updatedResponse.status === 200) {
          setOriginalImage(result.url); // Commit the uploaded image
          setTempImage(result.url);
          setAvatar(result.url); // Update the avatar in Navbar
          setIsEditPicture(false); // Exit edit mode
          toast.success("Profile picture updated successfully!", {
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
        } else {
          throw new Error("Failed to update profile picture");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to update profile picture. Please try again.", {
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
  };

  const handleCancel = () => {
    setTempImage(originalImage); // Revert to the original image
    setIsEditPicture(false); // Exit edit mode
  };

  return (
    <div className="ml-[60px] w-[80%] h-[100%] bg-white drop-shadow-md rounded-md pt-10">
      <div
        className="bg-fuchsia-900 w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden m-auto mt-4 cursor-pointer mb-5"
        onClick={() => setIsEditPicture(true)}
      >
        <img
          src={tempImage ? `${tempImage}?t=${Date.now()}` : image}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {isEditPicture && (
        <div className="mt-2 flex justify-center mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-white p-2 rounded cursor-pointer"
          />
          <button
            onClick={handleSaveImage}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Done
          </button>
          <button
            onClick={handleCancel}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      )}

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onSave={() => handleSave("name", name)}
      />
      <Input
        label="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        onSave={() => handleSave("specialization", specialization)}
      />
      <Input
        label="Licence No"
        value={licenceNo}
        onChange={(e) => setLicenceNo(e.target.value)}
        onSave={() => handleSave("licenceNo", licenceNo)}
      />
      <Input
        label="Email"
        value={email}
        onChange={() => {}}
        onSave={() => {}}
      />
    </div>
  );
};

export default TherapistCard;
