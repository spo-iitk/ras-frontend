import axios, { AxiosResponse } from "axios";

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
} from "../constants";
import { errorNotification, pushNotification } from "../notifcation";

export interface OTPParams {
  user_id: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const otpRequest = {
  post: (body: OTPParams) =>
    authInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, OTPParams>,
        OTPParams
      >("/otp", body)
      .then((res) => {
        pushNotification("OTP sent!", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("OTP request Failed", err.response?.data?.error);
        return false;
      }),
};

export default otpRequest;
