import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const menuItems = [
  { label: "characters", path: "characters" },
  { label: "locations", path: "locations" },
  { label: "episodes", path: "episodes" }
];


const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-end p-4 ">
      <button
        className="md:hidden block text-2xl absolute right-4 top-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <ul className=" hidden md:flex space-x-4">
        {menuItems.map((item, index) => (
          <li key={index} className="rounded-lg">
            <Link to={item.path} className="block px-4 py-2 text-black  transition">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {isOpen && (
        <ul className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-3 md:hidden">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="block text-black hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)} 
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
