import React from "react";
import Link from "next/link";

const MenuHeader = ({ menuItems }) => {
  return (
    <header className="bg-gray-800 p-4">
      <nav>
        <ul className="flex space-x-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.url} className="text-white">
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
