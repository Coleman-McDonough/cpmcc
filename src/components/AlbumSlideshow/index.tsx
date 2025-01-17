"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Image = {
  public_id: string;
  secure_url: string;
};

type AlbumSlideshowProps = {
  album: string;
  onClose?: () => void;
};

export default function AlbumSlideshow({
  album,
  onClose,
}: AlbumSlideshowProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/albums/${album}`);
        setImages(response.data.resources);
      } catch (error) {
        console.error("Error fetching album images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [album]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreen = () => {
    const img = document.getElementById("largeImage");
    if (img) {
      img.requestFullscreen?.();
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-50 rounded-full bg-black bg-opacity-50 text-2xl font-bold text-white *:p-3 hover:bg-opacity-75 hover:text-gray-300"
        >
          ✖
        </button>
      )}

      {/* Large Image Display */}
      <div className="relative max-h-[70vh] w-full">
        <img
          id="largeImage"
          src={images[currentIndex]?.secure_url}
          alt={images[currentIndex]?.public_id}
          className="h-auto max-h-[70vh] w-full rounded-lg object-contain"
        />
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-75"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-75"
        >
          ❯
        </button>

        {/* Fullscreen and Button */}
        <div className="absolute bottom-4 right-4 z-10 flex space-x-3">
          <button
            onClick={handleFullscreen}
            className="rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-75"
          >
            ⛶
          </button>
        </div>
      </div>

      {/* Thumbnail Row */}
      <div className="mt-4 flex space-x-2 overflow-x-auto overflow-y-hidden">
        {images.map((image, index) => (
          <img
            key={image.public_id}
            src={image.secure_url}
            alt={image.public_id}
            className={`h-20 w-20 cursor-pointer rounded-lg object-cover transition-transform duration-300 ${
              currentIndex === index
                ? "scale-105 ring-4 ring-blue-500"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
