import axios, { AxiosResponse } from "axios";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface RC {
  ID: number;
  is_active: boolean;
  academic_year: string;
  type: string;
  name: string;
  phase: string;
  application_count_cap: number;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const rcRequest = {
  getAll: (token: string) =>
    instance
      .get<RC[]>("/rc", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as RC[];
      }),
};

export default rcRequest;
