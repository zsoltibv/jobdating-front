import React, { useEffect, useState } from "react";
import Link from "next/link";

const HeroSection = ({ image }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-slider md:max-h-[800px] md:min-h-[700px] min-h-[500px] max-h-[600px] flex items-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-zinc-800 bg-opacity-65 z-10 backdrop-blur-sm"></div>
      <div className="absolute inset-0 z-20 flex md:p-4 container mx-auto">
        <div className="relative w-full h-full flex items-centeroverflow-hidden">
          <div className="relative w-full h-full">
            {/* Slide 1 */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === 0 ? "opacity-100" : "opacity-0"
              } flex items-center`}
            >
              <div className="relative w-full max-w-2xl px-4">
                <div className="flex-shrink-0">
                  <div className="absolute left-1 top-0 bottom-0 w-1 bg-cyan-400"></div>
                  <div className="ml-10">
                    <h1 className="text-white font-open-sans md:text-6xl text-3xl font-regular mb-4 md:mb-12">
                      Date Your Job
                    </h1>
                    <p className="text-white font-inter font-light md:text-xl text-md max-w-md">
                      Înregistrează-te în baza noastră de date pentru a întâlni
                      noul loc de muncă !
                    </p>
                    <div className="flex flex-col justify-start gap-4 pt-16">
                      <Link href="/jobs">
                        <button className="bg-cyan-400 hover:bg-cyan-600  text-white font-inter py-3 md:px-8 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                          Întâlnește-ți jobul
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === 1 ? "opacity-100" : "opacity-0"
              } flex items-center`}
            >
              <div className="relative w-full max-w-2xl px-4">
                <div className="flex-shrink-0">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
                  <div className="ml-10">
                    <h1 className="text-white font-open-sans md:text-6xl text-3xl font-regular mb-4 md:mb-12">
                      Get Your Perfect Match
                    </h1>
                    <p className="text-white font-inter font-light md:text-xl text-md max-w-md">
                      Apelează cu încredere la serviciile de recrutare de
                      personal sau la soluții de forță de muncă temporară!
                    </p>
                    <div className="flex flex-col justify-start gap-4 pt-16">
                      <Link href="/cerere-de-oferta">
                        <button className="bg-cyan-400 hover:bg-cyan-300 text-white font-inter py-3 md:px-8 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                          Întâlnește-ți angajatul
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
