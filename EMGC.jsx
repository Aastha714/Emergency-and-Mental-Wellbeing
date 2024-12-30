import React, { useState, useEffect } from "react";
import ADDE from "./ADDE";
import ShowE from "./ShowE";
import API from "../api/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMGC = () => {
  const [contacts, setContacts] = useState([]);
  const userEmail = Cookies.get("email");

  const fetchContacts = async () => {
    if (!userEmail) return;

    try {
      const response = await API.get(`/emergency-contacts/user/${userEmail}`);
      if (response.status === 200) {
        setContacts(response.data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  useEffect(() => {
    if (!userEmail) {
      alert("No user logged in!");
      return;
    }
    fetchContacts();
  }, [userEmail]);
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = async (phoneNumber, relationship) => {
    try {
      const response = await API.delete(
        `/emergency-contacts/delete/${userEmail}`,
        { params: { phoneNumber, relationship } }
      );

      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.filter(
            (contact) =>
              contact.phoneNumber !== phoneNumber ||
              contact.relationship !== relationship
          )
        );
        toast.success("Contact deleted successfully.", {
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
    } catch (error) {
      toast.error("Failed to delete contact. Please try again.", {
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
    <>
      <ADDE addContact={addContact} />
      <ShowE contacts={contacts} deleteContact={deleteContact} />{" "}
    </>
  );
};

export default EMGC;
