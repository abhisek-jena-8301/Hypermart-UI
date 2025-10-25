import React from "react";
import { Eye, Pencil, Trash, UserRoundCheck, UserRoundX } from "lucide-react";

function EmployeeDetailCard({
  userId,
  name,
  role,
  status,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="flex items-center justify-between space-x-40 bg-white p-4 mb-4 rounded-lg shadow-sm border hover:shadow-lg transition">
      <div>
        <h2 className="text-md font-medium text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={onView}
          title="View"
          className="text-blue-400 hover:text-blue-800 transition"
        >
          <Eye size={25} />
        </button>
        <button
          onClick={() => onToggleStatus(userId, status)}
          title={status === "A" ? "Suspend User" : "Resume User"}
          className={`transition ${
            status === "A"
              ? "text-green-400 hover:text-green-600"
              : "text-red-400 hover:text-red-600"
          }`}
        >
          {status === "A" ? (
            <UserRoundCheck size={25} />
          ) : (
            <UserRoundX size={25} />
          )}
        </button>

        <button
          onClick={onEdit}
          title="Edit"
          className="text-yellow-600 hover:text-yellow-700 transition"
        >
          <Pencil size={25} />
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="text-red-400 hover:text-red-700 transition"
        >
          <Trash size={25} />
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetailCard;
