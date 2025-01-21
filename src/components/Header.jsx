import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-all"
          >
            Escritório
          </Link>
        </li>
        <li>
          <Link
            to="/comercial"
            className="text-white hover:text-blue-400 transition-all"
          >
            Comercial
          </Link>
        </li>
        <li>
          <Link to="/rh" className="text-white hover:text-blue-400 transition-all">
            RH
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
