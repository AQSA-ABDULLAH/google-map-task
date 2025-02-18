"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import SquareProgressBar from "./ProgressBar";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const Timer = dynamic(() => import("./Timer"), { ssr: false });

interface CardProps {
  markerId: string; // Accept marker ID as prop
}

const images: string[] = [
  "/assets/Rectangle.png",
  "/assets/Rectangle193.png",
  "/assets/Rectangle.png",
  "/assets/Rectangle.png",
  "/assets/Rectangle193.png",
  "/assets/Rectangle.png",
  "/assets/Rectangle.png",
];

const Card: React.FC<CardProps> = ({ markerId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="text-white bg-white w-full max-w-[280px]">
      <div className="relative rounded-t-2xl overflow-hidden shadow-lg">
        <div
          className="h-[280px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundColor: "#ccc",
            boxShadow:
              "inset 0px 90px 80px -38px rgba(0, 0, 0, 0.8), inset 0px -90px 60px -35px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button className="rounded-full text-white" onClick={prevImage}>
            <img src="/assets/Path2.png" alt="previous-button" className="h-4" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button className="rounded-full text-white" onClick={nextImage}>
            <img src="/assets/Path1.png" alt="next-button" className="h-4" />
          </button>
        </div>

        <Timer />

        <div className="absolute top-20 right-7 flex items-center space-x-4">
          <img src="/assets/Path 7830.png" alt="share-icon" className="w-3 h-3"/>
          {isLiked ? (
            <IoMdHeart
              className="cursor-pointer text-red-500 w-3 h-3"
              onClick={() => setIsLiked(false)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer text-white w-3 h-3"
              onClick={() => setIsLiked(true)}
            />
          )}
        </div>

        {/* Circular Progress Bar and Price */}
        <div className="absolute bottom-10 flex justify-between w-[100%] px-4">
          <SquareProgressBar percentage={23} />
          <div className="flex flex-col">
            <div className="flex justify-between text-white">
              <p className="text-[10px] tracking-widest">£5,000,000 GBP</p>
              <img src="/assets/g12.png" alt="logo" className="px-1 w-16" />
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4">
              {images.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`cursor-pointer mx-1 h-0.5 w-4 ${index === currentImageIndex ? "bg-gold" : "bg-gray-400"}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Address and Details Section */}
        <div className="absolute w-[100%] bottom-2 tracking-wider">
          <div className="flex justify-between font-lato text-[5px] uppercase  px-4">
            <p>Shelton Street</p>
            <p>Covent Garden</p>
            <p>London</p>
            <p>WC2H</p>
            <p>United Kingdom</p>
          </div>
          <p className="text-end text-[9px] font-bold mt-1 px-5 tracking-widest">
          Marker ID: {markerId}
          </p>
        </div>
      </div>

        {/* <div className="absolute w-[100%] bottom-2 tracking-wider">
          <p className="text-end text-[5px] mt-1 px-5 tracking-widest">
            Marker ID: {markerId}
          </p>
        </div>
      </div> */}

      <div className="h-[40px] bg-black tracking-widest rounded-b-2xl mt-2 font-lato text-[10px]">
        <div className="flex justify-between pt-3 px-6">
          <p>£25.00 GBP</p>
          <button>BUY ENTRY NOW</button>
        </div>
        <p className="text-end text-[4px] px-5">#ZM7861234567</p>
      </div>
    </div>
  );
};

export default Card;


