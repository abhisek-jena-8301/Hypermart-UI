import { userServiceApi } from "./api";

export const fetchUserDetails = async () => {
  return await userServiceApi.get("/fetchUserDetails", {
    withCredentials: true,
  });
};
