/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from "axios";
import { AUTH_URL } from "./constants";

interface verif_param {
  user_id: string;
}

interface forgot_pass_param {
  user_id: string;
  otp: string;
  new_password: string;
  confirm_newPassword: string;
}
interface login_params {
  user_id: string;
  password: string;
  remember_me: boolean;
}
interface signupStudent_params {
  user_id: string;
  password: string;
  name: string;
  otp: string;
  roll_no: string;
}

interface Response {
  Payload: any;
  Status: any;
  Message: any;
  Token?: any;
}

interface signupCompany_params {
  company_name: string;
  name: string;
  phone: string;
  email: string;
  designation: string;
}

// const SendVerif = async (data: verif_param): Promise<Response> => {
//   console.log(data);
//   let payload;
//   let status;
//   let message;
//   await axios
//   .post(`${AUTH_URL}/otp`, data)
//   .then ((res) => {
//      payload = res.data;
//      status = res?.status;
//      message = res?.data?.status;
//   })
//   .catch((err) => {
//      payload = err?.response?.data?.error;
//      status = err?.response?.status;
//      message = err?.response?.status;
//   });
//   const response: Response = {
//    Payload: payload,
//    Status: status,
//    Message: message,
//   };
//    return response;
// };

const forgotPass = async (data: forgot_pass_param): Promise<Response> => {
  console.log(data);
  let payload;
  let status;
  let message;
  await axios
    .post(`${AUTH_URL}/reset-password`, data)
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.status;
    });
  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };
  return response;
};

const login = async (data: login_params): Promise<Response> => {
  console.log(data);
  let payload;
  let status;
  let message;
  await axios
    .post(`${AUTH_URL}/login`, data)
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.data?.error;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };

  return response;
};

const signupStudent = async (data: signupStudent_params): Promise<Response> => {
  let payload;
  let status;
  let message;
  await axios
    .post(`${AUTH_URL}/signup`, data)
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.status;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };

  return response;
};

const otp = async (user_id: string): Promise<Response> => {
  let payload;
  let status;
  let message;
  await axios
    .post(`${AUTH_URL}/otp`, { user_id })
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.status;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };

  return response;
};

const signupCompany = async (data: signupCompany_params): Promise<Response> => {
  let payload;
  let status;
  let message;
  await axios
    .post(`${AUTH_URL}/company-signup`, data)
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.status;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };

  return response;
};

export { login, signupStudent, signupCompany, otp, forgotPass };
export type {
  login_params,
  signupStudent_params,
  Response,
  signupCompany_params,
  verif_param,
  forgot_pass_param,
};
