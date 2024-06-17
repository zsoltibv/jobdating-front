import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const services = [
  "Construcții civile și industriale",
  "Industria auto",
  "Industria hotelieră",
  "Domeniul medical",
  "Logistica",
  "Grădinărit-peisagistică",
  "Comerț",
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const serviceCount = services.length;
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleAutoScroll = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % serviceCount);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(handleAutoScroll, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + serviceCount) % serviceCount
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % serviceCount);
  };

  const getDisplayedServices = () => {
    return [...services, ...services];
  };

  const displayedServices = getDisplayedServices();

  const getItemWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemsPerView = Math.floor(containerWidth / 200);
      return containerWidth / itemsPerView;
    }
    return 200;
  };

  const itemWidth = getItemWidth();

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto text-center" ref={containerRef}>
        <h2 className="text-lg md:text-md uppercase text-cyan-900 font-bold mb-8 tracking-wider">
          Job-uri in diverse domenii
        </h2>
        <div className="relative w-full overflow-hidden">
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {displayedServices.map((service, index) => (
              <div
                key={index}
                className="flex-none p-4"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="bg-zinc-200 shadow-md rounded-lg p-4 flex items-center justify-center min-h-[80px]">
                  <p className="text-gray-800">{service}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
