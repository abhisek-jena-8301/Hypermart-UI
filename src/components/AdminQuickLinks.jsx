import React from "react";

const AdminQuickLinks = () => {
  return (
    <div>
      <h2 className="text-4xl text-gray-800 text-center mb-3">Quick links</h2>
      <hr />
      <div className="flex space-x-4 mt-6 ml-3 mr-3">
        <div className="mb-4 w-1/2 relative space-y-3">
          <button className="w-full cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Employee List
          </button>
          <button className="w-full cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Inventory Control
          </button>
        </div>
        <div className="mb-4 w-1/2 relative space-y-3">
          <button className="w-full cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Store information
          </button>
          <button className="w-full cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Tax Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickLinks;
