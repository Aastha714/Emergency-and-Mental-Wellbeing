import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/group.png";
import image2 from "../assets/work.png";
import image3 from "../assets/sos.jpg";
import image4 from "../assets/blog.jpeg";
import image5 from "../assets/support1.jpg";
import image6 from "../assets/story.png";

const AboutUs = () => {
  return (
    <div className="w-full h-full bg-white ">
      <div className="w-full h-[500px] bg-[#f5f9fc] flex justify-around  items-center m-auto mt-10">
        <div className="w-[50%] ">
          <h1 className="text-[#001A35] font-bold drop-shadow text-[54px] mb-6 tracking-wider">
            About Us
          </h1>
          <h4 className="text-3xl text-gray-600 font-normal tracking-wider">
            Our platform is dedicated to helping individuals improve their
            mental well-being. We offer tools, resources, and support to help
            you lead a healthier, happier life. Mental health is not just
            important; it's essential, and we're here to make it accessible to
            everyone
          </h4>
        </div>
        <div className=" w-[40%] ">
          <img
            src={image}
            alt="Group Photo"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>
      <div className="w-full h-[500px] bg-white flex justify-around  items-center m-auto mt-10 ">
        <div className=" w-[40%] ">
          <img
            src={image5}
            alt="Group Photo"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="w-[50%]">
          <h1 className="text-[#001A35] font-bold drop-shadow text-5xl mb-6 tracking-wider">
            Our Mission: Improving Lives Through Mental Health Support
          </h1>
          <h4 className="text-3xl text-gray-600 tracking-wider font-normal">
            We believe mental health care should be easy, accessible, and
            supportive. Our mission is to provide a safe space where individuals
            can monitor their mood, connect with licensed therapists, and find
            resources that improve their mental well-being
          </h4>
        </div>
      </div>
      <div className="w-full h-[500px] bg-[#FFFFF7] flex justify-around  items-center m-auto mt-10">
        <div className="w-[50%] ">
          <h1 className="text-[#001A35] font-bold drop-shadow   text-5xl mb-6 tracking-wider">
            Our Story
          </h1>
          <h4 className="text-2xl text-gray-600 font-normal tracking-wider">
            <p className="mb-6">
              At the heart of our platform is the belief that mental health is
              as vital as physical health. We provide tools like mood tracking
              to help users understand their emotions and identify patterns. Our
              blogging feature creates a safe community where individuals can
              share experiences, insights, and encouragement with others.
            </p>
            <p className="mb-6">
              We also understand the importance of professional guidance, which
              is why we’ve made it easier to connect with licensed therapists.
              Whether you need help managing stress, anxiety, or any other
              challenge, our platform ensures support is just a few clicks away.
            </p>
            <p className="mb-2">
              As we continue to grow, our mission remains the same: to create a
              safe, supportive, and accessible space for everyone. Mental health
              is a journey, and we are here to walk with you every step of the
              way.
            </p>
          </h4>
        </div>
        <div className=" w-[40%] ">
          <img
            src={image6}
            alt="Group Photo"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>
      <div className="w-full h-[600px] bg-[#f5f9fc] p-5">
        <h1 className="text-[#001A35] font-bold drop-shadow   text-5xl  tracking-wider mt-10 text-center mb-10">
          Key Features
        </h1>

        <div className="flex justify-evenly items-center w-full mt-[40px]">
          <Link
            to="/feedback"
            className=" items-center shadow-lg rounded-lg w-[400px] h-[400px] bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={image2}
              alt=""
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="w-[80%] h-[70px] m-auto mt-[20px]">
              <h4 className="text-2xl font-semibold text-gray-700  text-center">
                Monitor your emotions daily and gain valuable insights into your
                mental health trends
              </h4>
            </div>
          </Link>

          <Link
            to="/sos"
            className=" items-center shadow-lg rounded-lg w-[400px] h-[400px] bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={image3}
              alt=""
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="w-[80%] h-[70px] m-auto mt-[20px]">
              <h4 className="text-2xl font-semibold text-gray-700 mt-4 text-center">
                Access quick support in times of crisis with our emergency
                button
              </h4>
            </div>
          </Link>

          <Link
            to="/blog"
            className=" items-center shadow-lg rounded-lg w-[400px] h-[400px] bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={image4}
              alt=""
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="w-[80%] h-[70px] m-auto mt-[20px]">
              <h4 className="text-2xl font-semibold text-gray-700 mt-4 text-center">
                Share your mental well-being journey or read inspiring stories
                from others.
              </h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
