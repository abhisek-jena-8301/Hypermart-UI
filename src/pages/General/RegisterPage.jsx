import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/general/RegisterForm.jsx";

const RegisterPage = (userData) => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/login");
  };

  return <RegisterForm onRegisterSuccess={handleRegister} />;
};

export default RegisterPage;
