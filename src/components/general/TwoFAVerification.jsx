import React, { useState } from "react";
import { reset2FA, verify2FA } from "../../service/authApi";
import { toast } from "react-toastify";

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      sessionStorage.setItem("role", data.role);
      toast.success("Login Successfull!!");
      onVerifySuccess(data);
    } catch (error) {
      console.log("Error at verifyOTP : ", error);
      toast.error("Wrong OTP, Login Failed!!");
      setOtp("");
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await reset2FA();
      toast.success("2FA Reset Success");
      onResetSuccess(data);
    } catch (error) {
      console.log("Error at reset 2FA: ", error);
      toast.error("Oh no something went wrong!!");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <form
        onSubmit={handleTokenVerification}
        action=""
        className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto"
      >
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight">
            Validate TOTP
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-3" />
        <p className="text-center text-gray-600 text-lg font-light">
          Please enter your time based OTP for authentication
        </p>
        <div className="p-6">
          <div className="mb-4">
            <label className="text-sm text-gray-600">OTP</label>
            <input
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your otp"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-md cursor-pointer mb-3"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-full bg-slate-600 text-white py-2 mt-2 rounded-md cursor-pointer"
            onClick={handleReset}
          >
            Reset 2FA
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFAVerification;
