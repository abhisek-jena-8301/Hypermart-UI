import { authApi } from "./api";

export const register = async (
  username,
  password,
  firstName,
  lastName,
  mobileNo,
  emailId,
  address,
  role
) => {
  return await authApi.post("/register", {
    username,
    password,
    firstName,
    lastName,
    mobileNo,
    emailId,
    address,
    role,
  });
};

export const loginUser = async (
  username,
  password,
  firstName,
  lastName,
  mobileNo,
  emailId,
  address,
  role
) => {
  return await authApi.post(
    "/login",
    {
      username,
      password,
      firstName,
      lastName,
      mobileNo,
      emailId,
      address,
      role,
    },
    {
      withCredentials: true,
    }
  );
};

export const authStatus = async () => {
  return await authApi.get("/status", {
    withCredentials: true,
  });
};

export const logoutUser = async () => {
  return await authApi.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

export const setup2FA = async () => {
  return await authApi.post(
    "/2fa/setup",
    {},
    {
      withCredentials: true,
    }
  );
};

export const reset2FA = async () => {
  return await authApi.post(
    "/2fa/reset",
    {},
    {
      withCredentials: true,
    }
  );
};

export const verify2FA = async (otp) => {
  return await authApi.post(
    "/2fa/verify",
    { otp },
    {
      withCredentials: true,
    }
  );
};

