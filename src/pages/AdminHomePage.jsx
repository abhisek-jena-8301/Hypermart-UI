import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import { logoutUser } from "../service/authApi.js";
import AdminQuickLinks from "../components/AdminQuickLinks.jsx";

const AdminHomePage = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-10 mx-auto max-w-md flex flex-col items-center">
      <h2 className="font-semibold mb-2 text-lg text-center">
        Welcome Admin user
      </h2>
      <AdminQuickLinks />
    </div>
  );
};

export default AdminHomePage;
