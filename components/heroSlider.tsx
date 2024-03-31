import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HeroSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Change image every 3 seconds
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, images.length]);

  // Navigate to previous image
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setIsRunning(false);
  };

  // Navigate to next image
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setIsRunning(false);
  };

  // Generate the image slides
  const imageSlides = images.map((image, index) => (
    <div
      key={index}
      style={{ display: index === currentIndex ? "block" : "none" }}
    >
      <img src={image} alt={`Slide ${index}`} />
    </div>
  ));

  return (
    <div className="hero-slider max-h-[650px] flex justify-center items-center overflow-hidden relative">
      {imageSlides}
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-80 z-0"></div>
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className="max-w-[1640px] w-full mx-auto text-left px-4">
          <h1 className="text-white font-open-sans text-5xl font-regular mb-4">
            Întâlneşte-ți locul tău de muncă!
          </h1>
          <p className="text-white font-inter font-light text-xl">
            Înregistrează-te în baza noastră de date pentru a întâlni noul
            <br /> tău job cât mai curând posibil!
          </p>
          <div className="flex justify-start space-x-4 pt-16">
            <button className="bg-cyan-400 text-white font-inter py-2 px-12 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
              <p className="text-base font-regular font-open-sans">
                Înscrie-te acum
              </p>
            </button>
            <button className="bg-transparent text-white border border-white font-inter py-2 px-12 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
              <p className="text-base font-regular font-open-sans">
                Trimite o cerere
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-20 space-x-3 px-6 py-3 bg-gray-100">
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
