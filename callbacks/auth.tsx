/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from "axios";
import { AUTH_URL } from "./constants";

interface login_params {
  user_id: string;
  password: string;
  remember_me: boolean;
}
interface signup_params {
  user_id: string;
  password: string;
  name: string;
  otp: string;
  roll_no: string;
}

interface Response {
  Payload: any;
  Status: any;
  Token?: any;
}

const login = async (data: login_params): Promise<Response> => {
  let payload;
  let status;
  await axios
    .post(`${AUTH_URL}/login`, { params: data })
    .then((res) => {
      payload = res.data;
      status = res?.status;
    })
    .catch((err) => {
      payload = err?.response?.data.error;
      status = err?.response?.status;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
  };

  return response;
};

const signup = async (data: signup_params): Promise<Response> => {
  let payload;
  let status;
  await axios
    .post(`${AUTH_URL}/signup`, { params: data })
    .then((res) => {
      payload = res.data;
      status = res?.status;
    })
    .catch((err) => {
      payload = err?.response?.data.error;
      status = err?.response?.status;
    });
  const response: Response = {
    Payload: payload,
    Status: status,
  };

  return response;
};

const otp = async (user_id: string): Promise<Response> => {
  let payload;
  let status;
  await axios
    .post(`${AUTH_URL}/otp`, { user_id })
    .then((res) => {
      payload = res.data;
      status = res?.status;
    })
    .catch((err) => {
      payload = err?.response?.data.error;
      status = err?.response?.status;
    });
  const response: Response = {
    Payload: payload,
    Status: status,
  };

  return response;
};

export { login, signup, otp };
export type { login_params, signup_params, Response };
