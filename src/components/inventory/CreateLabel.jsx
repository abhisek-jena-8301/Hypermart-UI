import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  categoryOptions,
  COMPANY_NAME_REGEX,
  NAME_REGEX,
  PRICE_REGEX,
  QR_FILE_NAME,
} from "../../constants";
import { addProduct, createQR } from "../../service/inventoryApi.js";
import { motion, AnimatePresence } from "framer-motion";
import { sendQRMail } from "../../service/userProfileServiceApi.js";

const CreateLabel = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isPerishable, setIsPerishable] = useState(false);
  // const [storeId, setStoreId] = useState("");
  const [firstResponse, setFirstResponse] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [qrCode, setQRCode] = useState("");
  const [productCode, setProductCode] = useState("");

  const handleStateValuesRemoval = () => {
    setProductName("");
    setPrice("");
    setCategory("");
    setCompanyName("");
    setRemarks("");
    setIsPerishable(false);
  };

  const validateInputFields = () => {
    //validate input data
    if (!productName.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!NAME_REGEX.test(productName)) {
      toast.error(
        "Product name must be 2-50 characters (letters, numbers, spaces only)"
      );
      return false;
    }

    if (!companyName.trim()) {
      toast.error("Company name is required");
      return false;
    }
    if (!COMPANY_NAME_REGEX.test(companyName)) {
      toast.error(
        "Company name must be 2-50 characters (letters, numbers, &, . allowed)"
      );
      return false;
    }

    if (!price.trim()) {
      toast.error("Price is required");
      return false;
    }
    if (!PRICE_REGEX.test(price)) {
      toast.error("Enter a valid price (e.g., 25 or 25.50)");
      return false;
    }

    if (!category.trim()) {
      toast.error("Please select a category");
      return false;
    }
    return true;
  };

  const createFileName = () => {
    const date = Date.now();
    console.log(date);
    const fileName = productCode + "_" + date + QR_FILE_NAME;
    return fileName;
  };

  const handleDownload = () => {
    try {
      if (!qrCode) {
        toast.error("No QR code available to download!");
        return;
      }

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = qrCode; // This should be your base64 image data (e.g., "data:image/png;base64,...")
      link.download = createFileName();
      //link.download = "product_qrcode.jpg"; // Desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("QR Code download started.");
    } catch (error) {
      console.error("Error while downloading QR code:", error);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    console.log("Inside the handleSendEmail");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user?.username;
    try {
      const { data } = await sendQRMail(qrCode, username);
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error at send Email: ", error);
      toast.error("Email couldn't be sent with QR details");
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("here inside handleFormSubmission");
    if (validateInputFields() == true) {
      try {
        const { data } = await createQR(productName, price);
        console.log("data: ", data);
        if (data) {
          setProductCode(data.productCode);
          setQRCode(data.qrCode);
          setFirstResponse(true);
          // toast.success(data.message);
          //   handleStateValuesRemoval();
        } else {
          toast.error(
            "QR code couldn't be generated for the product. Please try again."
          );
          handleStateValuesRemoval();
        }
      } catch (error) {
        console.log("Error at handleFormSubmission : ", error);
        toast.error(error.response.data.message);
      }
    } else {
      handleStateValuesRemoval();
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("inside handleAddProduct");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user?.username;
    try {
      const { data } = await addProduct(
        productName,
        productCode,
        price,
        category,
        companyName,
        remarks,
        isPerishable,
        qrCode,
        username
      );
      console.log("data at handleAddProduct : ", handleAddProduct);
      if (data) {
        setIsReady(true);
        toast.success(data.message);
        handleStateValuesRemoval();
      } else {
        toast.error("Couldn't add product, Please try again");
        handleStateValuesRemoval();
      }
    } catch (error) {
      console.log("Error at handleAddProduct");
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (selectedOption) => {
    setCategory(selectedOption ? selectedOption.value : "");
    console.log("category : ", category);
  };

  return (
    <div className="flex items-stretch">
      <div className="w-1/2 mr-3 pr-3 pl-3">
        <form
          onSubmit={handleFormSubmission}
          action=""
          className="bg-white rounded-lg shadow-lg w-full h-full mx-auto p-4 flex-col items-center justify-center"
        >
          <div className="pt-3">
            <h2 className="text-3xl text-center text-[#213448]">Add product</h2>
          </div>
          <hr className="text-gray-200 mt-6 mb-6" />
          {/* Product name field*/}
          <div className="mb-4 mt-2">
            <label className="text-sm text-gray-600">Product name</label>
            <input
              label="Product Name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter product name"
              disabled={!!firstResponse}
              required
            />
          </div>
          <div className="flex space-x-3">
            {/* Price field */}
            <div className="mb-4 mt-2 w-2/5 relative">
              <label className="text-sm text-gray-600">Price</label>
              <input
                label="Price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter price"
                disabled={!!firstResponse}
                required
              />
            </div>
            <div className="mb-4 mt-2 w-3/5 relative">
              <label className="text-sm text-gray-600">Category</label>
              <div className="mt-2">
                <Select
                  value={
                    categoryOptions.find((opt) => opt.value === category) ||
                    null
                  }
                  onChange={handleChange}
                  options={categoryOptions}
                  placeholder="Select or search category..."
                  isClearable
                  disabled={!!firstResponse}
                  classNamePrefix="react-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      minHeight: "42px", // same as input height
                      borderRadius: "0.375rem", // Tailwind rounded-md
                      borderColor: state.isFocused ? "blue-500" : "gray-300", // blue-500 / gray-300
                      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                      "&:hover": {
                        borderColor: "#3b82f6", // focus color on hover
                      },
                      paddingLeft: "4px", // adds slight left padding
                      fontSize: "0.95rem", // consistent with inputs
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af", // Tailwind gray-400
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 50,
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 mt-2">
            <label className="text-sm text-gray-600">Manufacturer</label>
            <input
              label="Manufacturer Name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter Manufacturer name"
              required
            />
          </div>
          {/* Remarks field */}
          <div className="mb-4 mt-2">
            <label className="text-sm test-gray-600">Remarks</label>
            <textarea
              label="Remarks"
              value={remarks}
              disabled={!!firstResponse}
              placeholder="Enter remarks (max. 50 characters)"
              rows="3"
              onChange={(e) => {
                if (e.target.value.length <= 50) setRemarks(e.target.value);
              }}
              className="w-full p-2 border rounded-md mt-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* Perishable checkbox */}
          <div className="mb-4 mt-2">
            <input
              type="checkbox"
              id="isPerishable"
              checked={isPerishable}
              onChange={(e) => setIsPerishable(e.target.checked)}
              disabled={!!firstResponse}
              className="h-4 w-4 mt-2 accent-[#213448] cursor-pointer border-gray-300 rounded focus:bg-[#213448]"
            />
            <label
              htmlFor="isPerishable"
              className="text-sm test-gray-600 ml-3"
            >
              Perishable Product
            </label>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-[#213448] text-white py-2 mt-2 rounded-md cursor-pointer hover:bg-[#2b4560] transition"
          >
            Generate QR
          </button>
        </form>
      </div>
      <AnimatePresence>
        {firstResponse && (
          <motion.div
            className="w-1/2 h-full ml-3 bg-white rounded-lg shadow-lg mx-auto p-4 flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="mt-3 mb-3 text-xl text-center font-bold text-[#213448]">
              Generated label
            </h2>
            <p className="text-md text-center mt-4 text-gray-700">
              Succesfully generated the label for {productName} : {companyName}
            </p>
            <p className="text-md text-center mt-2 text-gray-700">
              Get your new label — download, print, or send it by email.
            </p>
            <div className="p-6">
              <div className="flex justify-center">
                <img
                  src={qrCode ? qrCode : ""}
                  alt="Product label"
                  className="mb-4 border rounded-md"
                />
              </div>
            </div>

            <div className="flex">
              <button
                type="submit"
                onClick={handleAddProduct}
                disabled={isReady}
                className="w-full relative bg-[#213448] text-white py-2 mt-2 rounded-md cursor-pointer hover:bg-[#2b4560] transition"
              >
                Proceed to Add Product
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                onClick={handleDownload}
                disabled={!isReady}
                className={`w-1/2 relative py-2 mt-2 rounded-md transition
                ${
                  isReady
                    ? "bg-[#213448] text-white hover:bg-[#2b4560] cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
                }
                `}
              >
                Download
              </button>

              <button
                type="submit"
                disabled={!isReady}
                onClick={handleSendEmail}
                className={`w-1/2 relative py-2 mt-2 rounded-md transition
                ${
                  isReady
                    ? "bg-[#213448] text-white hover:bg-[#2b4560] cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
                }
                `}
              >
                Send email
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateLabel;
