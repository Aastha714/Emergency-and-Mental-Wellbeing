import React, { useState, useEffect } from "react";
import Input from "./Input";
import API from "../api/api";
import image from "../assets/download.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ userData, setUserData }) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [email] = useState(userData.email);
  const [gender, setGender] = useState(userData.gender);
  const [originalImage, setOriginalImage] = useState(userData.profilePicture);
  const [tempImage, setTempImage] = useState(userData.profilePicture);
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    setOriginalImage(userData.profilePicture);
    setTempImage(userData.profilePicture);
  }, [userData]);

  const handleSave = async (field, value) => {
    try {
      const updatedData = {
        ...userData,
        [field]: value,
      };

      const response = await API.put(`/user/${email}`, updatedData);

      if (response.status === 200) {
        if (field === "name") setName(value);
        if (field === "age") setAge(value);
        if (field === "gender") setGender(value);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImage);
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
        const updatedResponse = await API.put(`/user/${email}`, {
          profilePicture: result.url,
        });

        if (updatedResponse.status === 200) {
          setOriginalImage(result.url);
          setUserData((prevData) => ({
            ...prevData,
            profilePicture: result.url,
          }));
          setIsEditPicture(false);
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
    setTempImage(originalImage);
    setIsEditPicture(false);
  };

  return (
    <div className="ml-[60px] w-[80%] h-[100%] bg-white drop-shadow-md rounded-md pt-10">
      <div
        className="w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden m-auto mt-4 cursor-pointer mb-5"
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
        label="Age"
        value={age}
        onChange={(e) => {
          const newAge = e.target.value;
          setAge(newAge);
        }}
        onSave={() => handleSave("age", age)}
      />
      <Input
        label="Email"
        value={email}
        onChange={() => {}}
        onSave={() => {}}
      />
      <Input
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        onSave={() => handleSave("gender", gender)}
      />
    </div>
  );
};

export default Card;
