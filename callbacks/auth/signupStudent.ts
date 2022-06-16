import axios, { AxiosResponse } from "axios";

import { AUTH_URL, SERVER_ERROR } from "../constants";

export interface SignUpStudentParams {
  user_id: string;
  password: string;
  name: string;
  otp: string;
  roll_no: string;
}

export interface SignUpResponse {
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

const studentSignUpRequest = {
  post: (body: SignUpStudentParams) =>
    authInstance
      .post<
        SignUpResponse,
        AxiosResponse<SignUpResponse, SignUpStudentParams>,
        SignUpStudentParams
      >("/signup", body)
      .then(responseBody),
};

export default studentSignUpRequest;
