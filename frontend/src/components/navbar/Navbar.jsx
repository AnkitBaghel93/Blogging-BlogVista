import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Create Blog", to: "/blog" },
  ];

  const activeClass = "text-blue-600 font-semibold";
  const defaultClass = "hover:text-blue-600 transition-colors duration-200";

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          Blog<span className="text-gray-900">Vista</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? activeClass : "text-blue-600 font-medium hover:underline"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 text-white px-5 py-2 rounded-full font-semibold"
                : "bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            }
          >
            Get Started
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-6 pt-4 pb-6 shadow transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 text-lg font-medium text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
            >
              {link.name}
            </NavLink>
          ))}

          <hr />

          <NavLink
            to="/signin"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : "text-blue-600 font-medium"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 text-white px-5 py-2 rounded-full font-semibold"
                : "bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            }
          >
            Get Started
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
