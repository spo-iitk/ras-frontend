import axios, { AxiosResponse } from "axios";

import { Stats } from "@callbacks/admin/rc/stats";
import { errorNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "../../constants";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const statRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<Stats>(`/application/rc/${rcid}/stats`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { student: [], branch: [] } as Stats;
      }),
};

export default statRequest;
