import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import { AUTH_URL, ErrorType, SERVER_ERROR, setConfig } from "../../constants";

export interface userDetailsType {
  ID: number;
  user_id: string;
  Password: string;
  role_id: number;
  name: string;
  is_active: boolean;
  last_login: string;
  refresh_token: string;
}
export interface returnUserDetailsType {
  users: userDetailsType[];
}

const instance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userDetailsRequest = {
  getAll: (token: string) =>
    instance
      .get<returnUserDetailsType>("users", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as returnUserDetailsType;
      }),
  get: (token: string, id: string) =>
    instance
      .get<userDetailsType>(`users/${id}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as userDetailsType;
      }),
};

export default userDetailsRequest;
