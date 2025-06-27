import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi.js";
import { toast } from "react-toastify";

const TwoFASetup = ({ onSetupComplete }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const copyClipboard = async () => {
    await navigator.clipboard.writeText(response.secret.base32);
    toast.success("Secret copied to clipboard");
  };

  const fetchQRCode = async () => {
    try {
      const { data } = await setup2FA();
      setResponse(data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight">
            Turn on 2FA Verification
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-3" />
        <p className="text-center text-gray-600 text-lg font-light pr-8 pl-8">
          Scan the QR code with your authenticator app.
        </p>
        <div className="p-6">
          <div className="flex justify-center">
            <img
              src={response?.qrCode ?? ""}
              alt="2FA QR Code"
              className="mb-4 border rounded-md"
            />
          </div>
          <div className="flex items-center mt-3 mb-3">
            <div className="border-t border-1 border-gray-200 flex-grow"></div>
            <div className="text-gray-600 text-sm pr-2 pl-2">
              Enter the QR Code manually
            </div>
            <div className="border-t border-1 border-gray-200 flex-grow"></div>
          </div>
          <div className="mb-6">
            {message && <p className="text-green-600 text-sm mb-3"></p>}
            <input
              readOnly
              defaultValue=""
              value={response ? response.secret.base32 : ""}
              className="w-full border rounded text-xs text-gray-600 p-4 mt-2 text-center"
              onClick={copyClipboard}
            />
          </div>
          <button
            onClick={onSetupComplete}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Proceed for Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFASetup;
