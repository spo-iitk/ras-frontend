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

// let token = sessionStorage.getItem("token");
// authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const LoginRequest = {
  post: (body: LoginParams) =>
    authInstance
      .post<
        LoginResponse,
        AxiosResponse<LoginResponse, LoginParams>,
        LoginParams
      >("/login", body)
      .then(responseBody),
  // .catch(errorResponseBody),
};

export default LoginRequest;
