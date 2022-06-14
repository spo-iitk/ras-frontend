import axios, { AxiosResponse } from "axios";

import { AUTH_URL, SERVER_ERROR } from "../constants";

export interface LoginParams {
  user_id: string;
  password: string;
  remember_me: boolean;
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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const loginRequest = {
  post: (body: LoginParams) =>
    authInstance
      .post<
        LoginResponse,
        AxiosResponse<LoginResponse, LoginParams>,
        LoginParams
      >("/login", body)
      .then(responseBody),
};

export default loginRequest;
