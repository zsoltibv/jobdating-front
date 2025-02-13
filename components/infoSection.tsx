import React from "react";
import Link from "next/link";

const InfoSection = () => {
  return (
    <div className="flex flex-col items-center py-16 bg-gray-100">
      <div className="container w-full mx-auto px-4 flex justify-center">
        <div className="ml-10 max-w-3xl">
          <h1 className="text-zinc-800 font-open-sans md:text-4.5xl text-3xl font-medium mb-4 md:mb-12">
            De ce Job Dating?
          </h1>
          <p className="text-zinc-800 font-inter font-light md:text-xl text-md">
            Prin echipa noastră de specialiști cu experiență de peste 20 de ani
            pe piața forței de muncă, oferim servicii de cea mai înaltă calitate
            și o varietate de soluții care acoperă întreg ciclul de management a
            resurselor umane, precum leasing personal (muncă temporară),
            recrutare și selecție forță de muncă, administrare personal și
            consultanță în domeniul legislației muncii.
          </p>
          <div className="flex justify-start gap-2.5 pt-16">
            <Link href="/despre-noi">
              <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-inter py-3 md:px-6 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                Află mai multe
              </button>
            </Link>
            <Link href="/cerere-de-oferta">
              <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-inter py-3 md:px-6 px-6 rounded hover:bg-opacity-90 transition duration-300 ease-in-out">
                Solicită personal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
