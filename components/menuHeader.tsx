import React from "react";
import Link from "next/link";

const MenuHeader = ({ menuItems }) => {
  return (
    <header className="max-w-[1640px] w-full mx-auto bg-opacity-75 p-4 absolute top-0 left-0 right-0 z-20 font-inter font-regular text-sm">
      <nav className="flex justify-between items-center">
        <div>
          <img
            className="h-12 w-auto"
            src="http://api.jobdating.ro/wp-content/uploads/2024/03/site_feher.png"
            alt=""
          />
        </div>
        <ul className="flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.url} className="text-white uppercase">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MenuHeader;
