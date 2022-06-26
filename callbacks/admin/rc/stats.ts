import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface StatType {
  student_recruitment_cycle_id: number;
  company_name: string;
  role: string;
  type: string;
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const statRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<StatType[]>(`rc/${rcid}/student/stats`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as StatType[];
      }),
};

export default statRequest;
