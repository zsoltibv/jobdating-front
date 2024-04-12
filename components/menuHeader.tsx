import React, { Fragment, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const MenuHeader = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const organizedMenuItems = organizeMenuItems(menuItems);

  function organizeMenuItems(menuItems) {
    const topLevelItems = menuItems.filter((item) => !item.parentId);
    const itemsWithChildren = topLevelItems.map((parentItem) => {
      const children = menuItems.filter(
        (item) => item.parentId === parentItem.id
      );
      return { ...parentItem, children };
    });
    return itemsWithChildren;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container w-full mx-auto bg-opacity-75 p-4 absolute top-0 left-0 right-0 z-30 font-inter font-regular text-sm">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/">
            <img
              className="md:h-12 h-10 w-auto"
              src="http://api.jobdating.ro/wp-content/uploads/2024/03/site_feher.png"
              alt="Home"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="text-white"
              size="lg"
            />
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full md:top-0 right-0 bg-white md:bg-transparent w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 text-center`}
        >
          {organizedMenuItems.map((item) => (
            <Fragment key={item.id}>
              <li className="md:my-0 my-2 group relative">
                <Link
                  href={item.url}
                  className="text-black md:text-white uppercase block px-4 py-2"
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  )}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="hidden group-hover:block absolute left-0 top-full bg-white shadow-md w-auto">
                    {item.children.map((child) => (
                      <li key={child.id} className="whitespace-nowrap">
                        <Link
                          href={child.url}
                          className="text-black block px-4 py-2 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MenuHeader;
