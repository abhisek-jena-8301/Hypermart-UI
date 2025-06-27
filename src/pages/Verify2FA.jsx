import React from "react";
import { useNavigate } from "react-router-dom";
import TwoFAVerification from "../components/TwoFAVerification";

const Verify2FA = () => {
  const navigate = useNavigate();
  const handleVerification = async (data) => {
    if (data) {
      console.log("data at verify 2FA: ", data);
      if (data.role === "Admin") navigate("/admin-home");
      else navigate("/emp-home");
    }
  };

  const handleTwoFAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <TwoFAVerification
      onVerifySuccess={handleVerification}
      onResetSuccess={handleTwoFAReset}
    />
  );
};

export default Verify2FA;
