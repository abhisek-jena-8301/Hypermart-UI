import React, { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Info } from "lucide-react";
import { register } from "../../service/authApi.js";
import { useEffect } from "react";
import {
  fetchUserDetails,
  updateUserDetails,
} from "../../service/userProfileServiceApi.js";
import UpdateConfirmationDialog from "../dialog/UpdateConfirmationDialog.jsx";

const ViewProfileDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [originalData, setOriginalData] = useState({});

  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  // Handle Updation function
  const handleUpdation = async (e) => {
    console.log("in update function");
    e.preventDefault(); // prevent form reload

    const hasChanged =
      firstName !== originalData.firstName ||
      lastName !== originalData.lastName ||
      mobileNo !== originalData.mobileNo ||
      emailId !== originalData.emailId ||
      address !== originalData.address ||
      role !== originalData.role;

    if (!hasChanged) {
      toast.info("No changes detected.");
      return;
    }
    setShowDialog(true);
  };

  const confirmUpdate = async () => {
    setShowDialog(false);
    console.log("Proceeding with update userId : " + userId);
    const updateMsg = await updateUserDetails(
      firstName,
      lastName,
      mobileNo,
      emailId,
      address,
      userId
    );
    console.log(updateMsg.data);
    toast.success(updateMsg.data.message);
  };

  const cancelUpdate = () => {
    setShowDialog(false);
    console.log("Update cancelled.");
  };

  // Preloader - fetch and set user data on mount
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await fetchUserDetails();
        const data = response.data.user;

        console.log("Fetched user data:", data);

        setUserId(data.userId);
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setMobileNo(data.contact || "");
        setEmailId(data.emailId || "");
        setAddress(data.address || "");
        setRole(data.role || "");

        setOriginalData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          mobileNo: data.contact || "",
          emailId: data.emailId || "",
          address: data.address || "",
          role: data.role || "",
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        // setError("Failed to load user data.");
      } finally {
        // setLoading(false);
      }
    };

    loadUserDetails();
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleUpdation}
        action=""
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto"
      >
        <div className="pt-6 pl-6">
          <h2 className="text-3xl font-extralight text-[#213448]">
            Hi, {firstName}
          </h2>
          <p>{role}</p>
        </div>
        <hr className="text-gray-200 mt-6 mb-1" />
        <div className="p-6">
          <div className="flex space-x-6">
            <div className="w-1/2 relative">
              {/* firstname */}
              <div className="mb-4 relative">
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  label="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              {/* lastname */}
              <div className="mb-4 relative">
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  label="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
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
                  required
                />
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="w-full bg-[#213448] text-white py-2 px-2 mb-4 mt-8 relative rounded-md cursor-pointer"
              >
                Update
              </button>
              {showDialog && (
                <UpdateConfirmationDialog
                  message="Are you sure you want to update the changes?"
                  onConfirm={confirmUpdate}
                  onCancel={cancelUpdate}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewProfileDetails;
