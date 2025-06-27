import React, { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Info } from "lucide-react";
import { register } from "../service/authApi.js";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  // const [isFirstPage, setIsFirstPage] = useState();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(
        username,
        password,
        firstName,
        lastName,
        mobileNo,
        emailId,
        address,
        role
      );

      if (data) {
        toast.success("Registration successful! Please log in.");
        onRegisterSuccess(data);
        handleStateValuesRemoval();
      } else {
        toast.error("Registration failed. Please try again.");
        handleStateValuesRemoval();
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      toast.error(error.response.data.message);
      handleStateValuesRemoval();
    }
  };

  const handleStateValuesRemoval = () => {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmailId("");
    setMobileNo("");
    setRole("Admin");
    setAddress("");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleRegistration}
        action=""
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto"
      >
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight text-[#213448]">
            Get Started – Your Storefront Awaits!
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-1" />
        <div className="p-6">
          <div className="flex space-x-6">
            <div className="w-1/2 relative">
              <div className="flex space-x-3">
                {/* firstname */}
                <div className="mb-4 w-1/2 relative">
                  <label className="text-sm text-gray-600">First Name</label>
                  <input
                    label="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                {/* lastname */}
                <div className="mb-4 w-1/2 relative">
                  <label className="text-sm text-gray-600">Last Name</label>
                  <input
                    label="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              {/* username */}
              <div className="mb-4">
                <label className="text-sm text-gray-600">Username</label>
                <input
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              {/* password */}
              <div className="mb-4 relative ">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  Password
                  <button
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-[#213448] focus:outline-none relative"
                  >
                    <Info size={16} />
                  </button>
                </label>
                {showTooltip && (
                  <div className="absolute top-0 left-22 bg-white border border-gray-300 shadow-md p-2 text-xs text-gray-700 rounded w-64 z-10">
                    Password must contain at least:
                    <ul className="list-disc list-inside mt-1">
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One digit</li>
                      <li>One special character (no spaces)</li>
                    </ul>
                  </div>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-4 text-[#213448]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* address */}
              <div className="mb-4">
                <label className="text-sm text-gray-600">Address</label>
                <input
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>
            <div className="w-1/2 relative">
              {/* mobileNo */}
              <div className="mb-4">
                <label className="text-sm text-gray-600">Mobile number</label>
                <input
                  label="moblieNo"
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your mobile no."
                  required
                />
              </div>
              {/* emailid */}
              <div className="mb-4 relative">
                <label className="text-sm text-gray-600">Email id</label>
                <input
                  type="text"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full p-2 border rounded mt-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your email id"
                  required
                />
              </div>
              {/* Role */}
              <div className="mb-4 mt-5 relative">
                <label className="block text-sm text-gray-600 mb-2">
                  Select Role
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="radio"
                      name="role"
                      value="Admin"
                      checked={role === "Admin"}
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2"
                    />
                    Admin
                  </label>
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="radio"
                      name="role"
                      value="Employee"
                      checked={role === "Employee"}
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2"
                    />
                    Employee
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-x-3">
                {/* Terms and conditions */}
                <div className="mb-4 mt-2">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      required
                      className="mr-2"
                      name="tc"
                    />
                    I agree to the
                    <a href="/tc" className="text-[#213448] ml-1">
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                {/* submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#213448] text-white py-2 px-2 mt-2 rounded-md cursor-pointer"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
