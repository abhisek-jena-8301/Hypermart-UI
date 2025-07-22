import { userServiceApi } from "./api";

export const fetchUserDetails = async () => {
  return await userServiceApi.get("/fetchUserDetails", {
    withCredentials: true,
  });
};

export const updateUserDetails = async (
  firstName,
  lastName,
  mobileNo,
  emailId,
  address,
  userId
) => {
  console.log("APi call here");
  return await userServiceApi.put(
    "/updateUserProfile",
    { firstName, lastName, mobileNo, emailId, address, userId },
    {
      withCredentials: true,
    }
  );
};
