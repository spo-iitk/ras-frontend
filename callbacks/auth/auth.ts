import axios, { AxiosResponse } from "axios";
import { AUTH_URL } from "../constants";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ29kQGlpdGsuYWMuaW4iLCJyb2xlX2lkIjoxMDEsImV4cCI6MTY1NTE0MjM0MiwiaWF0IjoxNjU1MTM2MzQyLCJpc3MiOiJyYXMifQ.dbnkT0Bai_PAtIqZBddYcaxp4S9ecoFt8vvPRNGmE4k";

export interface LoginOptions {
  user_id: string;
  role_id?: number;
  token?: string;
  password?: string;
  remember_me?: boolean;
}

export interface ErrorResponse {
  error: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: "Aww, snap! Server is not responding!",
  //   headers: { Authorization: `Bearer ${token}`},
});

// authInstance.interceptors.request.use((config) => {
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
// const errorResponseBody = (error: AxiosError<ErrorResponse>) =>
//   error.response?.data;

const LoginRequest = {
  post: (body: LoginOptions) =>
    authInstance.post<LoginOptions>("/login", body).then(responseBody),
  // .catch(errorResponseBody),
};

export default LoginRequest;
