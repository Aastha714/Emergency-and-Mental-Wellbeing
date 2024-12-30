import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-2xl text-gray-700">
        You do not have permission to access this page.
      </p>
      <p className="mt-2 text-lg text-gray-500">
        Redirecting to the login page in 10s...
      </p>
    </div>
  );
};

export default Forbidden;
