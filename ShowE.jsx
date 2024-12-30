import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Contact from "./Contact";

const ShowE = ({ contacts, deleteContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNext = () => {
    if (currentIndex + 3 < contacts.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full bg-white drop-shadow-md p-10 mt-6 mb-7">
      <h2 className="text-4xl text-center font-semibold text-[#109948] mb-8">
        Emergency Contacts
      </h2>

      <div className="w-full">
        {contacts.slice(currentIndex, currentIndex + 3).map((contact) => (
          <Contact
            key={contact.phoneNumber || Math.random()}
            phone={contact.phoneNumber || "N/A"}
            name={contact.name || "Unknown"}
            relationship={contact.relationship || "Not Specified"}
            deleteContact={deleteContact}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-5">
        <button
          onClick={showPrevious}
          disabled={currentIndex === 0}
          className="text-[#109948] text-3xl mx-4"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={showNext}
          disabled={contacts.length <= 3 || currentIndex + 3 >= contacts.length}
          className="text-[#109948] text-3xl mx-4"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ShowE;
