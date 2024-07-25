import React from "react";
import Link from "next/link";

const HeroSection = ({ image }) => {
  return (
    <div
      className="hero-slider md:max-h-[800px] md:min-h-[700px] min-h-[500px] max-h-[600px] flex justify-center items-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-zinc-700 bg-opacity-65 z-10"></div>
      <div className="absolute inset-0 z-20 flex justify-center items-center">
        <div className="container w-full mx-auto text-left px-4">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
            <div className="ml-10">
              <h1 className="text-white font-open-sans md:text-6xl text-3xl font-regular mb-4 md:mb-12">
                Get the perfect match !
              </h1>
              <p className="text-white font-inter font-light md:text-xl text-md max-w-md">
                Înregistrează-te în baza noastră de date pentru a întâlni noul
                loc de muncă !
              </p>
              <div className="flex flex-col justify-start gap-4 pt-16">
                <Link href="/cerere-de-oferta">
                  <button className="bg-cyan-400 hover:bg-cyan-300 text-white font-inter py-3 md:px-8 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                    Întâlnește-ți angajatul
                  </button>
                </Link>
                <Link href="/jobs">
                  <button className="bg-cyan-900 hover:bg-cyan-800 text-white font-inter py-3 md:px-6 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                    Întâlnește-ți jobul
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
