import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"; // Import Link from Next.js

const services = [
  {
    image: "/img/munca-temporara.png", // replace with the correct path to your image
    title: "Închiriere forță de muncă",
    text: "Leasingul de personal este o solutie flexibilă și eficientă pentru a acoperi nevoia de personal în perioade de vârf ale activității sau pentru înlocuirea temporară a unor angajați. Numit oficial muncă temporară acesta reprezintă activitatea prin care o companie de resurse umane pune la dispoziția unei firme , personalul , de care aceasta din urmă are nevoie pentru o anumită perioadă. Personalul care funcționează pe acest principiu nu este angajat direct al companiei pentru care presteaza servicii, ci al Agentului de munca temporara.",
    buttonLink: "/inchiriere-forta-de-munca",
  },
  {
    image: "/img/pixuri.png", // replace with the correct path to your image
    title: "Recrutare și selecție personal",
    text: "Scopul nostru este să vă găsim candidat motivat, care nu are doar competențele necesare, ci a cărui personalitate se încadrează perfect în colectivul dumneavoastră. Candidati care vor aduce valoare adaugata companiei . Oferim, de asemenea, garanție pentru serviciul nostru.",
    buttonLink: "/recrutare-si-selectie-personal",
  },
  {
    image: "/img/admin-personal.png", // replace with the correct path to your image
    title: "Administrare personal",
    text: "De ce să lucrati cu noi pentru administrarea pesonalului? Reduceti costurile cu personalul HR. Economisiti sumele investite in cursurile de calificare și specializare a personalului HR. Se evit erori privind aplicarea prevederilor legale, avand la dispozitie o echipă cu experiență vastă în domeniu.",
    buttonLink: "/administrare-personal",
  },
];

const ServiceImageSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 6000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="py-12 relative">
      <div className="container mx-auto text-center relative">
        <div className="navigation justify-end p-2 flex gap-2">
          <button
            onClick={handlePrevClick}
            className="px-2 py-1 text-lg bg-cyan-400 rounded-md"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
          </button>
          <button
            onClick={handleNextClick}
            className="px-2 py-1 text-lg bg-cyan-400 rounded-md"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-white" />
          </button>
        </div>
        <hr />
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${
                  index === currentIndex ? "block" : "hidden"
                } transition-opacity duration-1000 ease-in-out`}
              >
                <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col md:flex-row min-h-[80px]">
                  <img
                    src={service.image}
                    alt={`Service ${index + 1}`}
                    className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/2 rounded-lg"
                  />
                  <div className="flex flex-col justify-between w-full md:w-1/2 text-left p-8">
                    <div>
                      <h2 className="text-3xl md:text-md text-cyan-900 font-medium mb-4 tracking-wider">
                        {service.title}
                      </h2>
                      <p className="text-gray-800 mb-4">{service.text}</p>
                    </div>
                    <div>
                      <Link href={service.buttonLink}>
                        <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-inter py-3 md:px-6 px-6 rounded transition duration-300 ease-in-out">
                          Află mai multe
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceImageSection;
