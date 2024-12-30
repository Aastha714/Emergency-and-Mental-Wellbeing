import React from "react";

const Footer = () => {
  return (
    <div className=" bg-[#109948]  w-[100%] h-[80px] flex justify-around items-center text-[18px] text-white">
      <div>
        <h2>@2024 All Right Reserved Hope Line</h2>
      </div>
      <div>
        <ul className="flex justify-around gap-8 cursor-pointer">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
          <li>
            <a href="/help-center">Help center</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
