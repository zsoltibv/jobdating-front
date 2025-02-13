import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const FooterSection = ({ menuItems, jobCategories }) => {
  return (
    <footer className="bg-gray-600 text-white font-inter">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:py-24 py-14">
        {/* Column 1: Logo, Street, Tel, and Mail */}
        <div className="flex flex-col gap-1">
          <Link href="/">
            <img
              className="h-12 w-auto mb-8"
              src="https://api.jobdating.ro/wp-content/uploads/2024/03/site_feher.png"
              alt="Home"
            />
          </Link>
          <p>
            Str. Observatorului nr 90/06, <br /> Cluj-Napoca
          </p>
          <div className="flex flex-col mt-3">
            <p className="font-bold mb-2">Tel:</p>
            <div className="">
              <p>
                <a href="tel:+40720540025">+40 720 540 025</a>
              </p>
              <p>
                <a href="tel:+40771422783">+40 771 422 783</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="font-bold mb-2">Email:</p>
            <div className="">
              <p>
                <a href="mailto:office@jobdating.ro">office@jobdating.ro</a>
              </p>
              <p>
                <a href="mailto:temporar@jobdating.ro">temporar@jobdating.ro</a>
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Menu Items */}
        <div>
          <h2 className="font-bold mb-4 font-open-sans text-2xl">Meniu</h2>
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  <p className="hover:text-gray-300">{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Job Categories */}
        <div>
          <h2 className="font-bold mb-4 font-open-sans text-2xl">
            Locuri de muncă
          </h2>
          <ul className="flex flex-col gap-1">
            {jobCategories.slice(0, 10).map((category, index) => (
              <li key={index}>
                <Link href={`/jobs/category/${category.name}`}>
                  <p className="hover:text-gray-300">{category.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Termeni Legali + Social Media Icons */}
        <div>
          <h2 className="font-bold mb-4 font-open-sans text-2xl">
            Termeni Legali
          </h2>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/politica-de-confidentialitate">
                <p className="hover:text-gray-300">
                  Politica de Confidențialitate
                </p>
              </Link>
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-12">
            <a
              href="https://www.facebook.com/100094691801415"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon
                icon={faFacebook as IconProp}
                size="2x"
                className="hover:text-gray-300"
              />
            </a>
            <a
              href="https://www.instagram.com/dateyourjob/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon
                icon={faInstagram as IconProp}
                size="2x"
                className="hover:text-gray-300"
              />
            </a>
            <a
              href="https://www.tiktok.com/@dateyourjob"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FontAwesomeIcon
                icon={faTiktok as IconProp}
                size="2x"
                className="hover:text-gray-300"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCjzQPvmBNmaEhTETAYfMJNQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FontAwesomeIcon
                icon={faYoutube as IconProp}
                size="2x"
                className="hover:text-gray-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/* New Image Section */}
      <div className="flex justify-center gap-5 py-6">
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow">
          <img
            className="w-60 h-auto"
            src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sal.png"
            alt="Solutionarea Alternativa a Litigiilor"
          />
        </a>
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="nofollow"
        >
          <img
            className="w-60 h-auto"
            src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sol.png"
            alt="Solutionarea Online a Litigiilor"
          />
        </a>
      </div>

      <hr className="border-gray-400" />

      {/* Copyright Notice */}
      <p className="text-center py-3">
        Copyright © {new Date().getFullYear()} jobdating.ro. Toate drepturile
        rezervate.
      </p>
    </footer>
  );
};

export default FooterSection;
