import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";
import { Student } from "@callbacks/admin/rc/student/getStudents";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

export interface Event {
  ID: number;
  proforma_id: number;
  name: string;
  date: string;
  duration: string;
  venue: string;
  start_time: number;
  end_time: number;
  description: string;
  main_poc: string;
  sequence: number;
  record_attendance: boolean;
}
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
  getStudents: (token: string, rcid: string, eventid: string) =>
    instance
      .get(
        `/application/rc/${rcid}/event/${eventid}/students`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Student[];
      }),
};
export default eventsRequest;
