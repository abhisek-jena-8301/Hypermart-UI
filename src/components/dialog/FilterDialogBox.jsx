import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const departments = [
  "Administration",
  "Security",
  "Sales",
  "Inventory",
  "Cashier",
];
const statuses = ["Active", "Unverified", "Suspended"];
const positions = ["Manager", "Staff", "Contractual"];

function FilterDialogBox({ onConfirm, onCancel }) {
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const toggleSelection = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleConfirm = () => {
    onConfirm({ departments: selectedDepts, statuses: selectedStatuses });
  };

  const isApplyDisabled =
    selectedDepts.length === 0 &&
    selectedStatuses.length === 0 &&
    selectedPositions.length === 0;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black/75 backdrop-blur-md flex justify-center items-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg shadow-lg w-xl max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Filter Employees Section
          </h2>

          {/* First row */}
          <div className="flex space-x-6">
            {/* Departments */}
            <div className="w-1/2 relative mb-4">
              <p className="text-md font-medium text-gray-700 mb-1">
                Departments
              </p>
              <hr className="text-gray-400 mb-3 max-w-3/4" />
              <div className="space-y-2 pl-1">
                {departments.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepts.includes(dept)}
                      onChange={() =>
                        toggleSelection(dept, selectedDepts, setSelectedDepts)
                      }
                      className="accent-blue-600"
                    />
                    <span>{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Statuses */}
            <div className="w-1/2 relative mb-4">
              <p className="text-md font-medium text-gray-700 mb-1">Status</p>
              <hr className="text-gray-400 mb-3 max-w-3/4" />
              <div className="space-y-2 pl-1">
                {statuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() =>
                        toggleSelection(
                          status,
                          selectedStatuses,
                          setSelectedStatuses
                        )
                      }
                      className="accent-blue-600"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className="flex space-x-6">
            {/* User Role */}
            <div className="w-1/2 relative mb-4">
              <p className="text-md font-medium text-gray-700 mb-1">Position</p>
              <hr className="text-gray-400 mb-3 max-w-3/4" />
              <div className="space-y-2 pl-1">
                {positions.map((position) => (
                  <label
                    key={position}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPositions.includes(position)}
                      onChange={() =>
                        toggleSelection(
                          position,
                          selectedPositions,
                          setSelectedPositions
                        )
                      }
                      className="accent-blue-600"
                    />
                    <span>{position}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isApplyDisabled}
              className={`px-4 py-2 rounded text-sm transition cursor-pointer ${
                isApplyDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Apply
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FilterDialogBox;
