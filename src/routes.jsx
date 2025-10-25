import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/General/LoginPage.jsx";
import Error from "./pages/General/Error.jsx";
import Setup2FA from "./pages/General/Setup2FA.jsx";
import Verify2FA from "./pages/General/Verify2FA.jsx";
import ProtectedRoute from "./components/General/ProtectedRoute.jsx";
import RegisterPage from "./pages/General/RegisterPage";
import TermsAndConditions from "./pages/General/T&C.jsx";
import AdminHomePage from "./pages/Admin/AdminHomePage.jsx";
import LayoutWithNavbar from "./components/shared/LayoutWithNavbar.jsx";
import EmployeeHomePage from "./pages/Employee/EmployeeHomePage.jsx";
import Home from "./pages/General/HomePage.jsx";
import ViewProfile from "./pages/Admin/ViewProfilePage.jsx";
import EmployeeListPage from "./pages/Employee/EmployeeListPage.jsx";
import InventoryControlHomePage from "./pages/InventoryControl/InventoryControlHomePage.jsx";

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
          {
            path: "/emp-list",
            element: <EmployeeListPage />,
            errorElement: <Error />,
          },
          {
            path: "/inventory/*",
            element: <InventoryControlHomePage />,
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
