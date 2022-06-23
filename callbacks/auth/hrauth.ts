import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import { AUTH_URL, ErrorType, SERVER_ERROR, setConfig } from "../constants";

export interface HRAuthParams {
  name: string;
  user_id: string;
  password: string;
}
export interface HRAuthResponse {
  password: string;
}

const instance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const HRAuth = {
  post: (token: string, hr: HRAuthParams) =>
    instance
      .post<HRAuthParams>(`/hr-signup`, hr, setConfig(token))
      .then(responseBody)
      .then(() => {
        successNotification("HR Authorised successfully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in authorising HR",
          err?.response?.data?.error || err.message
        );
      }),
};

export default HRAuth;
