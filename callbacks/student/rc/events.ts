import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface events {
  id: number;
}
const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const eventsRequest = {
  getAll: (token: string) =>
    instance
      .get("/events", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as events[];
      }),
};
export default eventsRequest;

// Haven't implemented this request, yet
