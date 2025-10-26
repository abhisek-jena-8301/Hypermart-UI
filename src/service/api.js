import axios from "axios";
import {
  AUTH_SERVICE_URL,
  EMPLOYEE_SERVICE_URL,
  PRODUCT_SERVICE_URL,
  USER_SERVICE_URL,
} from "../constants";

export const authApi = axios.create({
  baseURL: AUTH_SERVICE_URL,
});

export const userServiceApi = axios.create({
  baseURL: USER_SERVICE_URL,
});

export const empServiceApi = axios.create({
  baseURL: EMPLOYEE_SERVICE_URL,
});

export const productServiceApi = axios.create({
  baseURL: PRODUCT_SERVICE_URL,
});
