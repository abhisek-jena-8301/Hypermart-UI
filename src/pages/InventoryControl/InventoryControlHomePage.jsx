import React from "react";
import Sidebar from "../../components/shared/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import { h2 } from "framer-motion/client";
import CreateLabelPage from "./CreateLabelPage.jsx";

const InventoryControlHomePage = () => {
  return (
    <div className="-m-6 h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="/" element={<h2>Welcome to Inventory Control</h2>} />
          <Route path="create-label" element={<CreateLabelPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default InventoryControlHomePage;
