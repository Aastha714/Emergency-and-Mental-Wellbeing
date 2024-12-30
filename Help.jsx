import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/support2.jpg";

const Help = () => {
  const [userName, setUserName] = useState("Guest"); // Simulating a user name, you can integrate real data if needed

  return (
    <div className=" min-h-screen text-white">
      {/* Header */}
      <header className="py-16 drop-shadow-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl  text-[#001A35]  animate-fade-in font-extrabold tracking-tight leading-snug animate-slide-up">
            Welcome, <span className="text-green-700">{userName}</span>
          </h1>
          <p className="mt-6 text-2xl opacity-90 animate-fade-in text-gray-600">
            Explore resources, guidance, and support for your mental well-being.
          </p>
          <img
            src={image}
            alt="Help Center"
            className="mx-auto mt-8 rounded-3xl shadow-lg w-4/5 animate-zoom-in"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-16 drop-shadow-md">
          {/* Welcome Section */}
          <section className="text-center space-y-12">
            <h2 className="text-5xl font-semibold text-[#109948]  animate-pulse">
              Your Mental Health Matters
            </h2>
            <p className="text-xl text-gray-600 opacity-90">
              Let us guide you with resources and tools to nurture your
              well-being.
            </p>
            <div className="flex justify-center mt-6 space-x-6 text-[14px]">
              <button
                className="bg-[#109948] text-white py-4 px-10 rounded-full hover:bg-[#008055] hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
                onClick={() => (window.location.href = "/")}
              >
                Get Started
              </button>

              <button
                className="bg-transparent border-2 border-[#109948]  text-gray-600 py-4 px-10 rounded-full hover:bg-[#008055]  hover:text-white hover:scale-105 hover:border-none transform transition duration-300 ease-in-out shadow-lg"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us
              </button>
            </div>
          </section>

          <section className="bg-gray-900 text-center py-16 rounded-lg shadow-2xl space-y-8">
            <h2 className="text-4xl font-semibold text-white animate-bounce">
              Helpful Resources & Hotlines
            </h2>
            <p className="text-lg text-gray-300">
              Find important numbers and links for immediate support.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 space-y-4 text-center">
              <a
                href="tel:1800-123-4567"
                className="bg-green-600 py-4 px-10 text-[14px] rounded-full text-white hover:bg-green-700 hover:scale-105 transform transition duration-300 ease-in-out shadow-lg "
              >
                National Helpline
              </a>
              <a
                href="https://www.mentalhealth.gov/"
                className="bg-blue-600 py-4 px-10 text-[14px] rounded-full text-white hover:bg-blue-700 hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
              >
                Mental Health Resources
              </a>
              <a
                href="https://www.suicidepreventionlifeline.org/"
                className="bg-red-600 py-4 px-10 text-[14px] rounded-full text-white hover:bg-red-700 hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
              >
                Suicide Prevention
              </a>
              <a
                href="https://www.nami.org/Home"
                className="bg-purple-600 py-4 px-10 text-[14px] rounded-full text-white hover:bg-purple-700 hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
              >
                NAMI Support
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
