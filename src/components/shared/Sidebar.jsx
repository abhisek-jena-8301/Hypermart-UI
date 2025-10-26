import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const inventoryLinks = [
    { name: "Add Product", path: "create-label" },
    { name: "Stock Updation", path: "stock-update" },
  ];

  return (
    <div className="w-64 h-screen bg-[#213448] text-white flex flex-col pl-4 pr-4">
      {/* <h2 className="text-xl font-semibold mb-6 border-b border-t border-gray-600 pt-2 pb-2">
        Inventory Control
      </h2> */}
      <hr className="mb-4 mt-1 border border-gray-500" />
      <nav className="flex flex-col space-y-3">
        {inventoryLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-gray-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
