import React from "react";

import { motion, AnimatePresence } from "framer-motion";

function EmployeeViewDetails({ onGoBack }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/75 bg-opacity-50 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-white rounded-lg shadow-lg pt-4 pb-4 pr-6 pl-6 w-80">
            <h2>Hello</h2>
            <button
              onClick={onGoBack}
              className="px-4 py-2 rounded text-sm transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            >
              Back
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EmployeeViewDetails;
