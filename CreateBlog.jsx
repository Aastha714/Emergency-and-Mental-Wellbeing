import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = ({ blogs, addBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "", // URL for the image after upload
  });

  const navigate = useNavigate(); // Initialize the navigate function
  const email = Cookies.get("email");
  const role = Cookies.get("role");

  // Redirect to /403 if the email is not in the cookies and the form is shown
  const handleCreateBlogClick = () => {
    if (!email || role === "THERAPIST") {
      navigate("/403"); // Redirect to 403 page if not logged in
    } else {
      setShowForm(true); // Show the form if email exists
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      handleImageUpload(e); // Upload image when file is selected
    } else {
      if (name === "title" && value.length > 50) {
        setFormData({ ...formData, [name]: value.substring(0, 50) });
      }
      if (name === "content") {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "photos");
    data.append("cloud_name", "dwcqn9ilb");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwcqn9ilb/image/upload",
        { method: "POST", body: data }
      );

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image: result.url }); // Store URL in formData
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.image) {
      alert("Please fill all required fields.");
      return;
    }

    const blogData = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
      email,
    };

    try {
      const response = await API.post(`user/blogs`, blogData);
      if (response.status === 200) {
        setFormData({ title: "", content: "", image: "" });
        setShowForm(false);
        addBlog(response.data); // Update blogs in parent component
        toast.success("Blog created successfully!", {
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
      toast.error(
        "There was an error while posting the blog. Please try again.",
        {
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
        }
      );
    }
  };

  return (
    <>
      <div>
        <h2 className="mt-11 text-5xl text-[#109948] text-center">
          Explore Inspiring Stories
        </h2>
        <div className="ml-[68px] mt-[40px] w-[100%] h-[50px] text-white flex justify-center items-center mb-10">
          <button
            className="w-[200px] h-[50px] bg-[#1F1F1F] hover:bg-black text-white text-[18px] font-semibold mr-[155px]"
            onClick={handleCreateBlogClick} // Check if the user is logged in before showing form
          >
            Create a Blog
          </button>
        </div>
      </div>

      {showForm &&
        email && ( // Only show the form if the email is present in cookies
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-12 w-[95%] ">
              <h2 className="text-4xl font-semibold text-center mb-8">
                Create Blog
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-[16px] mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948] "
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-[16px] mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#109948]"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-[16px] mb-2">
                    Content
                  </label>
                  <ReactQuill
                    value={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    style={{ height: "250px" }}
                  />
                </div>
                <div className="flex justify-end gap-6 mt-[50px]">
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-300 text-[16px] rounded-lg hover:bg-gray-400"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-[16px] text-white rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default CreateBlog;
