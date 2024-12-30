import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import API from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ShowBlogs = ({ blogs, setBlogs }) => {
  const [userDetails, setUserDetails] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [role, setRole] = useState(""); // Track user role
  const navigate = useNavigate();
  const email = Cookies.get("email");

  useEffect(() => {
    // Fetch role from cookies
    const userRole = Cookies.get("role");
    setRole(userRole || "");

    fetchUserDetails(blogs);
  }, [blogs]);

  const fetchUserDetails = (blogs) => {
    const emails = [...new Set(blogs.map((blog) => blog.email))];
    const fetchDetails = emails.map((email) =>
      API.get(`/user/name/${email}`)
        .then((response) => {
          return {
            email,
            name: response.data.username,
            profilePhoto: response.data.profilePicture,
          };
        })
        .catch((error) => {
          console.error(`Error fetching user details for ${email}:`, error);
          return { email, name: "Unknown", profilePhoto: null };
        })
    );

    Promise.all(fetchDetails).then((details) => {
      const detailsMap = details.reduce((acc, detail) => {
        acc[detail.email] = detail;
        return acc;
      }, {});
      setUserDetails(detailsMap);
    });
  };

  const handleDelete = (id) => {
    API.delete(`/user/blogs/${id}`)
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  const goToNext = () => {
    if (currentIndex + 6 < blogs.length) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - 6 >= 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  const currentBlogs = blogs.slice(currentIndex, currentIndex + 6);

  return (
    <div className="w-full mb-11  p-6 flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <AiOutlineLeft className="mr-2" /> Prev
          </button>
        )}
        {currentIndex + 6 < blogs.length && (
          <button
            onClick={goToNext}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ml-auto"
          >
            Next <AiOutlineRight className="ml-2" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {currentBlogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="relative bg-white w-[450px] h-[400px] m-auto flex flex-col justify-between rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 group mb-11"
            >
              <div className="w-full h-[250px] overflow-hidden">
                <img
                  src={blog.image}
                  alt="Blog Visual"
                  className="w-full h-full rounded-t-2xl object-cover transition-transform duration-300 group-hover:scale-110 "
                />
              </div>
              <div className="w-[80%] h-[60px] mt-4 ml-[40px] text-left">
                <h2 className="text-[18px] font-semibold">
                  {blog.title || ""}
                </h2>
              </div>
              <div className="w-[88%] ml-[40px] mb-6 flex items-center justify-between ">
                <button
                  className="h-[40px] w-[100px] rounded-full text-black text-[14px] font-semibold border-[#109948] border-2 hover:text-white hover:bg-[#008055]"
                  onClick={() => handleReadMore(blog.id)}
                >
                  Read Blog
                </button>
                {(blog.email === email || role === "ADMIN") && (
                  <button
                    className="text-red-500 hover:text-red-700 "
                    onClick={() => handleDelete(blog.id)}
                  >
                    <MdDelete size={24} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowBlogs;
