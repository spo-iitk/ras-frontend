import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";
import { Event } from "@callbacks/admin/rc/proforma/event";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const eventsRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get(`/application/rc/${rcid}/event`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Event[];
      }),
  get: (token: string, rcid: string, eventid: string) =>
    instance
      .get(`/application/rc/${rcid}/event/${eventid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as Event;
      }),
};
export default eventsRequest;

// Haven't implemented this request, yet
