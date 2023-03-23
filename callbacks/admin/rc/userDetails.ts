import axios, { AxiosResponse } from "axios";

import { successNotification,errorNotification } from "@callbacks/notifcation";

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
export interface returnUsersDetailsType {
  users: userDetailsType[];
}
export interface returnUserDetailsType {
  user: userDetailsType;
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
      .get<returnUsersDetailsType>("admins", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as returnUsersDetailsType;
      }),
  get: (token: string, user_id: number) =>
    instance
      .get<returnUserDetailsType>(`admins/${user_id}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as returnUserDetailsType;
      }),
  updateRole: (token: string, user_id: number, new_role_id: number) =>
    instance
      .put<returnUserDetailsType>(
        `admins/${user_id}/role`,
        {
          user_id: user_id,
          new_role_id: new_role_id,
        },
        setConfig(token)
      )
      .then(() => {
        successNotification("Success", "Role updated successfully");
        return true
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
  toggleActive: (token: string, user_id: number) =>
    instance
      .put(`admins/${user_id}/active`, { user_id: user_id }, setConfig(token))
      .then(() => {
        successNotification("Success", "Active status updated successfully");
        return true
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
};

export default userDetailsRequest;
