import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
});

export const userServiceApi = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL,
});

export const empServiceApi = axios.create({
  baseURL: import.meta.env.VITE_EMPLOYEE_SERVICE_URL,
});

export const productServiceApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_SERVICE_URL,
});
