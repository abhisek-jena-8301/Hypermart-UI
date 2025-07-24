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

export const fetchEmployeeListByCondition = async (
  departments = [],
  statuses = []
) => {
  console.log("API call here by name");
  const params = {
    departments: departments.join(","),
    statuses: statuses.join(","),
  };
  return await empServiceApi.get("/fetchEmpListCondition", {
    params,
    withCredentials: true,
  });
};
