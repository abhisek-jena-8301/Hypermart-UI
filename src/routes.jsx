import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import TermsAndConditions from "./pages/T&C";
import AdminHomePage from "./pages/AdminHomePage";
import LayoutWithNavbar from "./components/LayoutWithNavbar.jsx";
import EmployeeHomePage from "./pages/EmployeeHomePage.jsx";
import Home from "./pages/HomePage.jsx";
import ViewProfile from "./pages/ViewProfilePage.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage />, errorElement: <Error /> },
  { path: "/register", element: <RegisterPage />, errorElement: <Error /> },
  { path: "/tc", element: <TermsAndConditions />, errorElement: <Error /> },

  {
    element: <ProtectedRoute />,
    children: [
      // Routes with Navbar
      {
        element: <LayoutWithNavbar />,
        children: [
          {
            path: "/admin-home",
            element: <AdminHomePage />,
            errorElement: <Error />,
          },
          {
            path: "/emp-home",
            element: <EmployeeHomePage />,
            errorElement: <Error />,
          },
          {
            path: "/view-profile",
            element: <ViewProfile />,
            errorElement: <Error />,
          },
        ],
      },
      // Routes without Navbar
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
