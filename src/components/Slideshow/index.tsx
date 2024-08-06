// index.tsx
"use client";
import React, { useState } from "react";
import { FaShareAlt, FaCopy } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import Image from "next/image";
import { images } from "./slideshowData";
import SectionTitle from "../Common/SectionTitle";

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const copyToClipboard = () => {
    const currentImageURL = window.location.origin + images[currentIndex].src;
    navigator.clipboard.writeText(currentImageURL).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => setCopySuccess(false),
    );
  };

  return (
    <section id="projects" className="relative mx-auto w-full max-w-2xl">
      <div className="relative overflow-hidden">
        <SectionTitle title="Projects" paragraph="" center width="665px" />
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
        <button
          onClick={prevSlide}
          className="rounded-full bg-gray-800 p-2 text-white"
        >
          &#10094;
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
        <button
          onClick={nextSlide}
          className="rounded-full bg-gray-800 p-2 text-white"
        >
          &#10095;
        </button>
      </div>
      {copySuccess && (
        <p className="mt-2 text-center text-green-500">
          Link copied to clipboard!
        </p>
      )}
    </section>
  );
};

export default Slideshow;
