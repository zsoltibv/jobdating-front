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
  const [openDropdownId, setOpenDropdownId] = useState(null);
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
    if (!isMenuOpen) {
      setOpenDropdownId(null); // Reset dropdown open state when closing the menu
    }
  };

  const toggleDropdown = (itemId) => {
    setOpenDropdownId(openDropdownId === itemId ? null : itemId);
  };

  return (
    <div className="header-container">
      <header className="container md:flex md:justify-between block w-full absolute mx-auto bg-opacity-75 p-4 top-0 left-0 right-0 z-30 font-inter font-regular text-sm">
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
        </nav>
        <div
          className={`${
            isMenuOpen ? "pb-4" : "pb-0"
          } transition-all duration-300 ease-in-out mt-2`}
        >
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:relative bg-white md:bg-transparent w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 text-center`}
          >
            {organizedMenuItems.map((item) => (
              <Fragment key={item.id}>
                <li className="group relative md:inline-block md:my-0 my-2">
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="text-black md:text-white uppercase flex items-center justify-between w-full px-4 py-2"
                  >
                    {item.children.length == 0 && (
                      <Link href={item.url}>{item.label}</Link>
                    )}
                    {item.children && item.children.length > 0 && (
                      <div>
                        <span>{item.label}</span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="ml-2"
                        />
                      </div>
                    )}
                  </button>
                  {item.children && item.children.length > 0 && (
                    <ul
                      className={`${
                        openDropdownId === item.id ? "flex" : "hidden"
                      } flex-col md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full bg-gray-100 shadow-md w-full md:w-auto rounded md:rounded-none`}
                    >
                      {item.children.map((child) => (
                        <li key={child.id} className="whitespace-nowrap">
                          <Link
                            href={child.url}
                            className="text-black block px-4 py-2 hover:bg-gray-200"
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
        </div>
      </header>
    </div>
  );
};

export default MenuHeader;
