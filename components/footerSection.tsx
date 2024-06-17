import React from "react";
import Link from "next/link";

const FooterSection = ({ menuItems, jobCategories }) => {
  // Assuming `jobCategories` is passed as a prop similar to `menuItems`

  return (
    <footer className="bg-gray-600 text-white font-inter">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:py-24 py-14">
        {/* Column 1: Logo, Street, Tel, and Mail */}
        <div className="flex flex-col gap-1">
          <Link href="/">
            <img
              className="h-12 w-auto mb-8"
              src="http://api.jobdating.ro/wp-content/uploads/2024/03/site_feher.png"
              alt="Home"
            />
          </Link>
          <p>Str. Observatorului nr 90/06, Cluj-Napoca</p>
          <p>Tel: +40 720 540 025</p>
          <p>Email: office@jobdating.ro</p>
        </div>

        {/* Column 2: Menu Items */}
        <div>
          <h2 className="font-bold mb-4 font-open-sans text-2xl">Menu</h2>
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
            Job Categories
          </h2>
          <ul className="flex flex-col gap-1">
            {jobCategories.map((category, index) => (
              <li key={index}>
                <Link href={`/jobs/${category.slug}`}>
                  <p className="hover:text-gray-300">{category.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Termeni Legali */}
        <div>
          <h2 className="font-bold mb-4 font-open-sans text-2xl">
            Termeni Legali
          </h2>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/termeni-si-conditii">
                <p className="hover:text-gray-300">Termeni și Condiții</p>
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privatitate">
                <p className="hover:text-gray-300">Politica de Privatitate</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-400" />

      {/* Copyright Notice */}
      <p className="text-center py-3">
        Copyright © {new Date().getFullYear()} jobdating.ro. All rights
        reserved.
      </p>
    </footer>
  );
};

export default FooterSection;
