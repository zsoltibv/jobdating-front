import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter for active link handling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const MenuHeader = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const router = useRouter(); // Initialize useRouter for active link checking
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
    <div className="header-container bg-gray-100">
      <header className="container md:flex md:justify-between block w-full mx-auto bg-opacity-75 p-4 top-0 left-0 right-0 z-30 font-inter font-regular text-md">
        <nav className="flex justify-between items-center">
          <div>
            <Link href="/">
              <img
                className="md:h-10 h-10 w-auto"
                src="/img/logo-gray.png"
                alt="Home"
              />
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="text-gray-800"
                size="2xl"
              />
            </button>
          </div>
        </nav>
        <div
          className={`${
            isMenuOpen ? "pb-4" : "pb-0"
          } transition-all duration-300 ease-in-out mt-2 bg-gray-100 md:bg-transparent`}
        >
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:relative bg-gray-100 md:bg-transparent w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 text-center z-50`}
          >
            {organizedMenuItems.map((item) => (
              <Fragment key={item.id}>
                <li className="group relative md:inline-block md:my-0 my-2">
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`${
                      router.pathname === item.url ? "text-black font-bold" : ""
                    } text-black md:text-zinc-800 font-normal flex items-center justify-between w-full px-4 py-3`}
                  >
                    {item.children.length == 0 && (
                      <Link href={item.url}>
                        <p
                          className={`${
                            router.pathname === item.url
                              ? "md:text-cyan-600 font-bold"
                              : "md:hover:text-cyan-600"
                          }`}
                        >
                          {item.label}
                        </p>
                      </Link>
                    )}
                    {item.children && item.children.length > 0 && (
                      <div className="flex items-center">
                        <span>{item.label}</span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="ml-2 h-3 w-3"
                        />
                      </div>
                    )}
                  </button>
                  {item.children && item.children.length > 0 && (
                    <ul
                      className={`${
                        openDropdownId === item.id ? "flex" : "hidden"
                      } flex-col md:absolute md:right-0 md:top-full md:bg-gray-200 bg-gray-200 shadow-md w-full md:w-auto rounded`}
                    >
                      {item.children.map((child) => (
                        <li key={child.id} className="whitespace-nowrap">
                          <Link
                            href={child.url}
                            className={`block px-4 py-3 ${
                              router.pathname === child.url
                                ? "md:text-cyan-600 font-bold"
                                : "md:hover:text-cyan-600"
                            } hover:bg-gray-300 rounded`}
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
