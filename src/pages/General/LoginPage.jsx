import React from "react";
import LoginForm from "../../components/General/LoginForm.jsx";
import { useSession } from "../../context/SessionContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userData) => {
    console.log("userdata: ", userData);
    login(userData);
    const isMFAActive = userData.isMFAActive;
    console.log("isMFAActive: ", isMFAActive);
    if (!isMFAActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
