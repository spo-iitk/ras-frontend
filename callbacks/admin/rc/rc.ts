import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface RC {
  ID: number;
  is_active: boolean;
  academic_year: string;
  type: string;
  start_date: string;
  name: string;
  phase: string;
  application_count_cap: number;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export interface RCResponse {
  id: number;
}

export interface rcEdit {
  ID: number;
  inactive?: boolean;
  application_count_cap?: number;
}
export const rcRequest = {
  getAll: (token: string) =>
    instance
      .get<RC[]>("", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as RC[];
      }),
  get: (token: string, rcid: string) =>
    instance.get<RC>(`/${rcid}`, setConfig(token)).catch((err: ErrorType) => {
      errorNotification("Error", err.response?.data?.error || err.message);
      return [] as RC[];
    }),
  post: (token: string, body: RC) =>
    instance
      .post<RCResponse, AxiosResponse<RCResponse, RC>, RC>(
        "",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("New RC Created", `RC ${res.data.id} created`);
        return res.data.id;
      })
      .catch((err) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return 0;
      }),
  put: (token: string, body: rcEdit) =>
    instance
      .put<RCResponse, AxiosResponse<RCResponse, rcEdit>, rcEdit>(
        ``,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("RC Updated", `RC updated`);
        return res.data.id;
      })
      .catch((err) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return 0;
      }),
};

export default rcRequest;
