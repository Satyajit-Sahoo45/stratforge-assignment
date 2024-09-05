import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4 px-8">
        <div className="text-white text-xl font-bold">
          <span>SpaceX</span>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link
            to="/history"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            History
          </Link>
          <Link
            to="/launches"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Launches
          </Link>
          <Link
            to="/"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Rockets
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 bg-black w-3/4 p-4 transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "4rem" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Link
            to="/history"
            className="text-white hover:text-gray-400 transition duration-300 text-lg"
            onClick={toggleMenu}
          >
            History
          </Link>
          <Link
            to="/launches"
            className="text-white hover:text-gray-400 transition duration-300 text-lg"
            onClick={toggleMenu}
          >
            Launches
          </Link>
          <Link
            to="/"
            className="text-white hover:text-gray-400 transition duration-300 text-lg"
            onClick={toggleMenu}
          >
            Rockets
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
