import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  categoryOptions,
  COMPANY_NAME_REGEX,
  NAME_REGEX,
  PRICE_REGEX,
} from "../../constants";
import { addProduct } from "../../service/inventoryApi.js";

const CreateLabel = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isPerishable, setIsPerishable] = useState(false);

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

  const generateQR = async () => {
    console.log("In generateQR function");
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log("here inside handleSubmission");
    if (validateInputFields() == true) {
      try {
        const { data } = await addProduct(
          productName,
          price,
          category,
          companyName,
          remarks,
          isPerishable
        );
        console.log("data: ", data);
        if (data) {
          await generateQR(data.productId);
          handleStateValuesRemoval();
        } else {
          toast.error("Product couldn't be added. Please try again.");
          handleStateValuesRemoval();
        }
      } catch (error) {
        console.log("Error at handleSubmission : ", error);
        toast.error(error.response.data.message);
      }
    } else {
      handleStateValuesRemoval();
    }
  };

  const handleChange = (selectedOption) => {
    setCategory(selectedOption ? selectedOption.value : "");
    console.log("category : ", category);
  };

  return (
    <div className="h-full flex">
      <div className="w-1/2 mr-3 pr-3 pl-3 h-full">
        <form
          onSubmit={handleSubmission}
          action=""
          className="bg-white rounded-lg shadow-lg w-full mx-auto p-4 flex-col items-center justify-center"
        >
          <div className="pt-3">
            <h2 className="text-3xl text-center font-extralight text-[#213448]">
              Add product
            </h2>
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
            Add
          </button>
        </form>
      </div>
      <div className="w-1/2 ml-3">Here</div>
    </div>
  );
};

export default CreateLabel;
