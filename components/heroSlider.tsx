import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const HeroSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track if the image is loading
  const [currentImage, setCurrentImage] = useState(images[0]); // Directly manage the current image

  useEffect(() => {
    setIsLoading(true); // Start loading the new image
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
      setIsLoading(false); // Set loading to false once the image is loaded
      setCurrentImage(images[currentIndex]); // Update the current image
    };
  }, [currentIndex, images]);

  // Change image every 3 seconds, but only if the current image has finished loading
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoading, images.length]);

  // Navigate to previous image
  const prevSlide = () => {
    if (!isLoading) {
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    }
  };

  // Navigate to next image
  const nextSlide = () => {
    if (!isLoading) {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  return (
    <div
      className="hero-slider md:max-h-[650px] min-h-[550px] flex justify-center items-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-65 z-10"></div>
      <div className="absolute inset-0 z-20 flex justify-center items-center">
        <div className="container w-full mx-auto text-left px-4">
          <h1 className="text-white font-open-sans md:text-5xl text-3xl font-regular mb-4">
            Întâlneşte-ți locul tău de muncă!
          </h1>
          <p className="text-white font-inter font-light md:text-xl text-md max-w-md">
            Înregistrează-te în baza noastră de date pentru a întâlni noul tău
            job cât mai curând posibil!
          </p>
          <div className="flex justify-start space-x-4 pt-16">
            <Link href="/inregistrare">
              <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-inter py-2 md:px-12 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                Înscrie-te acum
              </button>
            </Link>
            <Link href="/cerere-de-oferta">
              <button className="bg-transparent text-white border border-white font-inter py-2 md:px-12 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                Trimite o cerere
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-20 space-x-3 md:px-6 px-3 md:py-3 py-1.5 bg-gray-100">
        <button onClick={prevSlide} className="text-black">
          <div className="text-xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </button>
        <button onClick={nextSlide} className="text-black">
          <div className="text-xl">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
