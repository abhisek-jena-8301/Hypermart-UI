import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import router from "./routes.jsx"; // Import the router
import { RouterProvider } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-colour min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="h-screen">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
