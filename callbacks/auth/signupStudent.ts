import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
} from "../constants";

export interface SignUpStudentParams {
  user_id: string;
  password: string;
  name: string;
  roll_no: string;
  user_otp: string;
  roll_no_otp: string;
  confirm_password: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const studentSignUpRequest = {
  post: (body: SignUpStudentParams) =>
    authInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, SignUpStudentParams>,
        SignUpStudentParams
      >("/signup", body)
      .then((res) => {
        successNotification("Registered on RAS", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "SignUp Failed",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default studentSignUpRequest;
