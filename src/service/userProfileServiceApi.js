import { empServiceApi, userServiceApi } from "./api";

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
  return await userServiceApi.put(
    "/updateUserProfile",
    { firstName, lastName, mobileNo, emailId, address, userId },
    {
      withCredentials: true,
    }
  );
};

export const fetchEmployeeList = async (page = 1, limit = 25) => {
  return await empServiceApi.get("/fetchList", {
    params: {
      page,
      limit,
    },
    withCredentials: true,
  });
};

export const fetchEmployeeListByName = async (name, page = 1, limit = 25) => {
  return await empServiceApi.get("/fetchUserByName", {
    params: {
      page,
      limit,
      name,
    },
    withCredentials: true,
  });
};

export const fetchEmployeeListByCondition = async (
  departments = [],
  statuses = []
) => {
  console.log("API call here by name");
  const params = {
    departments: departments.join(","),
    statuses: statuses.join(","),
  };
  return await empServiceApi.get("/fetchUserListByCondition", {
    params,
    withCredentials: true,
  });
};

export const sendQRMail = async (qrCode, user) => {
  console.log("Inside sendQRMail");
  return await userServiceApi.post(
    "/sendQRMail",
    { qrCode, user },
    { withCredentials: true }
  );
};
