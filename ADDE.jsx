import React, { useState } from "react";
import Cookies from "js-cookie";
import API from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ADDE = ({ addContact }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  const userEmail = Cookies.get("email");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("No user logged in!");
      return;
    }

    const contactData = {
      userId: userEmail,
      name: newContact.name,
      phoneNumber: newContact.phone,
      relationship: newContact.relationship,
    };

    try {
      const response = await API.post(
        `/emergency-contacts/add/${userEmail}`,
        contactData
      );

      if (response.status === 200) {
        toast.success("Contact saved successfully!", {
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
        addContact(contactData);
        setNewContact({ name: "", phone: "", relationship: "" });
      }
    } catch (error) {
      toast.error("Failed to save contact. Please try again.", {
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
    }
  };

  return (
    <div className="w-full bg-white drop-shadow-md p-10">
      <h2 className="text-4xl text-center font-semibold text-[#109948] mb-8">
        Add your Emergency Contacts
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center m-auto w-[500px] mb-4">
          <label className="text-[#109948] w-[150px] text-left pr-4 text-[16px]">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="text-[#000] bg-[#f6f6f6] text-[18px] p-3 pl-4 outline-none w-full rounded-md"
            required
          />
        </div>

        <div className="flex justify-between items-center m-auto w-[500px] mb-6">
          <label className="text-[#109948] w-[150px] text-left pr-4 text-[16px]">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="text-[#000] bg-[#f6f6f6] text-[18px] p-3 pl-4 outline-none w-full rounded-md"
            required
          />
        </div>
        <div className="flex justify-between items-center m-auto w-[500px] mb-6">
          <label className="text-[#109948] w-[150px] text-left pr-4 text-[16px]">
            Realtion:
          </label>
          <input
            type="text"
            name="relationship"
            value={newContact.relationship}
            onChange={handleChange}
            placeholder="what is your Realtion?"
            className="text-[#000] bg-[#f6f6f6] text-[18px] p-3 pl-4 outline-none w-full rounded-md"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[150px] h-[50px] bg-[#109948] hover:bg-[#008055] text-white text-[18px] font-semibold rounded-lg transition-all duration-300"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ADDE;
