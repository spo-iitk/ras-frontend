import axios, { AxiosResponse } from "axios";

import { AUTH_URL, ErrorType, SERVER_ERROR, responseBody } from "../constants";
import { errorNotification } from "../notifcation";

export interface LoginParams {
  user_id: string;
  password: string;
  remember_me: boolean;
  admin_id?: string;
}

export interface LoginResponse {
  token: string;
  role_id: number;
  user_id: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const loginRequest = {
  post: (body: LoginParams) =>
    authInstance
      .post<
        LoginResponse,
        AxiosResponse<LoginResponse, LoginParams>,
        LoginParams
      >("/login", body)
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Login Failed", err.response?.data?.error);
        return { user_id: "", token: "", role_id: 0 } as LoginResponse;
      }),
  god: (body: LoginParams) =>
    authInstance
      .post<
        LoginResponse,
        AxiosResponse<LoginResponse, LoginParams>,
        LoginParams
      >("/god/login", body)
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Login Failed", err.response?.data?.error);
        return { user_id: "", token: "", role_id: 0 } as LoginResponse;
      }),
};

export default loginRequest;
