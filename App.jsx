import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDB from "./pages/UserDB";
import Home from "./pages/Home";
import SOS from "./pages/SOS";
import FeedBack from "./pages/FeedBack";
import Blog from "./pages/Blog";
import Forbidden from "./pages/Frobidden";
import TherapistDB from "./pages/TherapistDB";
import Appoinment from "./pages/Appoinment";
import Sessions from "./pages/Sessions";
import About from "./pages/About";
import ResetPasswordPage from "./components/ResetPassword";
import ContactUs from "./components/ContactUs";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import BlogDetails from "./components/blogDetails";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup/therapist" element={<Register />} />
        <Route path="/userDb" element={<UserDB />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/therapistDb" element={<TherapistDB />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/feedBack" element={<FeedBack />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/appointments" element={<Appoinment />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/blogs/:blogId" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
