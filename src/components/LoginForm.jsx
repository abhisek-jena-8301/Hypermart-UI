import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authApi.js";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(username, password);
      console.log("Data from api call : ", data);
      if (data) {
        handleStateValuesRemoval();
        onLoginSuccess(data);
      } else {
        toast.error("Invalid Login Credentials");
        handleStateValuesRemoval();
      }
    } catch (error) {
      console.log("Error during login: ", error);
      toast.error("Oh no something went wrong!! ");
      handleStateValuesRemoval();
    }
  };

  const handleStateValuesRemoval = () => {
    setUsername("");
    setPassword("");
  };

  const handleRegister = async (e) => {
    navigate("/register");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        action=""
        className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto"
      >
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight text-[#213448]">
            Hypermart's waiting..
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-3" />
        <div className="p-6">
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
          <div className="mb-4 relative">
            <label className="text-sm text-gray-600">Password</label>
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
              className="absolute right-3 top-[42px] text-[#213448]"
            > 
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-[#213448] text-white py-2 mt-2 rounded-md cursor-pointer"
          >
            Login
          </button>
          {/* Register link */}
          <p className="mt-4 text-center">
            Don't have an account?
            <Link
              to=""
              className="text-[#213448] ml-1"
              onClick={handleRegister}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
