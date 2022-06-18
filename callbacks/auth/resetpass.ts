import axios, { AxiosResponse } from "axios";

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
} from "../constants";
import { errorNotification, successNotification } from "../notifcation";

export interface ResetPassParams {
  user_id: string;
  new_password: string;
  confirm_password: string;
  otp: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const resetPassRequest = {
  post: (body: ResetPassParams) =>
    authInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, ResetPassParams>,
        ResetPassParams
      >("/reset-password", body)
      .then((res) => {
        successNotification("Success", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Failed", err.response?.data?.error || err.message);
        return false;
      }),
};

export default resetPassRequest;
