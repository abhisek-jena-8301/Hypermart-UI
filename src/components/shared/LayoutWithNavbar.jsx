// components/LayoutWithNavbar.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutWithNavbar;
