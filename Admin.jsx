import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { MdDelete } from "react-icons/md";
import Navbar from "../components/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = () => {
  const userEmail = Cookies.get("email");
  const userRole = Cookies.get("role");
  const [users, setUsers] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail || userRole !== "ADMIN") {
      navigate("/403");
    }
  }, [userEmail, userRole, navigate]);

  useEffect(() => {
    API.get("/admin/users").then((response) => {
      const filteredUsers = response.data.filter(
        (user) => user.role !== "ADMIN"
      );
      setUsers(filteredUsers);
    });

    API.get("/admin/therapists").then((response) => {
      const filteredTherapists = response.data.filter(
        (therapist) => therapist.role !== "ADMIN"
      );
      setTherapists(filteredTherapists);
    });

    API.get("/admin/blogs").then((response) => setBlogs(response.data));

    API.get("/admin/emergency-contacts").then((response) => {
      setContacts(response.data);
    });
  }, []);

  const handleSuccessToast = (message) => {
    toast.success(message, {
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
  };

  const handleDeleteUser = (id) => {
    API.delete(`/admin/deleteUser/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      handleSuccessToast("User deleted successfully!");
    });
  };

  const handleDeleteTherapist = (id) => {
    API.delete(`/admin/deleteTherapist/${id}`).then(() => {
      setTherapists(therapists.filter((therapist) => therapist.id !== id));
      handleSuccessToast("Therapist deleted successfully!");
    });
  };

  const handleDeleteBlog = (id) => {
    API.delete(`/admin/deleteBlog/${id}`).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      handleSuccessToast("Blog deleted successfully!");
    });
  };

  const handleDeleteContact = (id) => {
    API.delete(`/admin/deleteContact/${id}`).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
      handleSuccessToast("Contact deleted successfully!");
    });
  };

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <>
      <Navbar
        isLoggedIn={!!userEmail}
        userName={Cookies.get("userName")}
        avatar={""}
        role={userRole}
      />
      <div className="bg-gray-100 min-h-screen p-8">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
          Admin Dashboard
        </h1>

        {/* User Management */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            User Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:shadow-2xl hover:scale-105"
              >
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover "
                />
                <div className="w-[200px] ">
                  <p className="text-[18px] font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-lg text-gray-500">{user.email}</p>
                </div>
                <div className="w-[200px] relative h-[20px] ">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-200  absolute right-[2%] top-[6%]"
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Therapist Management */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Therapist Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:shadow-2xl hover:scale-105"
              >
                <img
                  src={therapist.profilePicture}
                  alt={therapist.name}
                  className="w-24 h-24 rounded-full object-cover "
                />
                <div className="w-[200px] ">
                  <p className="text-[18px] font-medium text-gray-900">
                    {therapist.name}
                  </p>
                  <p className="text-lg text-gray-500">{therapist.email}</p>
                </div>
                <div className="w-[200px] relative h-[20px]">
                  <button
                    onClick={() => handleDeleteTherapist(therapist.id)}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-200  absolute right-[2%] top-[6%]"
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Management */}
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Blog Management
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="relative bg-white w-[450px] h-[400px] m-auto flex flex-col justify-between rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 group mb-11"
              >
                <div className="w-full h-[250px] overflow-hidden">
                  <img
                    src={blog.image}
                    alt="Blog Visual"
                    className="w-full h-full rounded-t-2xl object-cover transition-transform duration-300 group-hover:scale-110"
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
                  {(blog.email === userEmail || userRole === "ADMIN") && (
                    <button
                      className="text-red-500 hover:text-red-700 "
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <MdDelete size={24} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <p className="text-[18px] font-semibold text-gray-700">
                    User Email:{" "}
                    <span className="text-green-700">{contact.userId}</span>
                  </p>
                </div>
                <div className="space-y-4">
                  {contact.contacts.map((c, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center "
                    >
                      <div>
                        <p className="text-[18px] font-medium text-gray-800">
                          Name: {c.name}
                        </p>
                        <p className="text-[16px] text-gray-600">
                          Phone: {c.phoneNumber}
                        </p>
                        <p className="text-[16px] text-gray-600">
                          Relationship: {c.relationship}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <MdDelete size={28} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
