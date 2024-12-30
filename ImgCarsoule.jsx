import React, { useState, useEffect } from "react";

const ImgCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[95%] h-[700px] mx-auto overflow-hidden mt-[15px] mb-[20px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover", // Ensure the image fits without distorting
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ImgCarousel;
