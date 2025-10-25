import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext.jsx";
import { logoutUser } from "../../service/authApi.js";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useSession();

  const role = Cookies.get("role");
  const homePath =
    role === "Admin" ? "/admin-home" : role === "Employee" ? "/emp-home" : "/";

  const handleLogout = async () => {
    try {
      console.log("in logout function");
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log("Error at logout: ", error);
    }
  };

  return (
    <nav className="bg-[#213448] text-white px-2 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <Link to={homePath} className="text-lg font-semibold">
          HyperMart
        </Link>
        {/* Links
        <div className="flex space-x-6"></div> */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <FaUserCircle size={28} className="cursor-pointer" />

          {isDropdownOpen && (
            <div className="absolute right-0 w-40 bg-white text-black rounded-md shadow-lg z-50">
              <Link
                to="/view-profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
