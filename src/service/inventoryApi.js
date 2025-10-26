import { productServiceApi } from "./api";

export const addProduct = async (
  productName,
  price,
  category,
  companyName,
  remarks,
  isPerishable
) => {
  console.log("Here 1");
  return await productServiceApi.post(
    "/addProduct",
    { productName, price, category, companyName, remarks, isPerishable },
    { withCredentials: true }
  );
};
