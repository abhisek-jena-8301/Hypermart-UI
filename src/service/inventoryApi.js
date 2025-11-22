import { productServiceApi } from "./api";

export const addProduct = async (
  productName,
  productCode,
  price,
  category,
  companyName,
  remarks,
  isPerishable,
  qrCode,
  username
) => {
  console.log("Here 1");
  return await productServiceApi.post(
    "/addProduct",
    {
      productName,
      productCode,
      price,
      category,
      companyName,
      remarks,
      isPerishable,
      qrCode,
      username,
    },
    { withCredentials: true }
  );
};

export const createQR = async (productName, price) => {
  console.log("Inside createQR");
  return await productServiceApi.post(
    "/createQR",
    { productName, price },
    { withCredentials: true }
  );
};
