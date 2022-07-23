import axios, { AxiosResponse } from "axios";
// import { showNotification } from "@mantine/notifications";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface HR {
  name: string;
  hr1: string;
  hr2: string;
  hr3: string;
}

export interface ComapnyWhoami {
  name: string;
  email: string;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const companyRequest = {
  getHR: (token: string, rid: string) =>
    instance
      .get<HR>(`/rc/${rid}/hr`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as HR;
      }),
  get: (token: string) =>
    instance
      .get<ComapnyWhoami>("/whoami", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not fetch company Meta data",
          err?.response?.data?.error || err?.message
        );
        if (err.response?.status === 401) {
          return { name: "error401", email: "error401" } as ComapnyWhoami;
        }
        return { name: "", email: "" } as ComapnyWhoami;
      }),
};

export default companyRequest;
