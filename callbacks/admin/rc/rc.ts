import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
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

const rcRequest = {
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
      .post<StatusResponse, AxiosResponse<StatusResponse, RC>, RC>(
        "",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("New RC Created", res.data.status);
        return true;
      })
      .catch((err) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
};

export default rcRequest;
