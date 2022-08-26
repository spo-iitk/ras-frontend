import axios, { AxiosResponse } from "axios";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

import { Student } from "../student/getStudents";

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

export interface EventDetails {
  name: string;
  start_time: number;
  end_time: number;
  venue: string;
  description: string;
  main_poc: string;
  proforma_id: number;
  label: string;
  ID: number;
  sequence: number;
  duration: string;
}
export interface RegisterStudentParams {
  emails: string[];
  event_id: number;
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const eventRequest = {
  put: (token: string, body: EventDetails, rcid: string, pid: string) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, EventDetails>,
        EventDetails
      >(`/rc/${rcid}/proforma/${pid}/event`, body, setConfig(token))
      .then((res) => {
        successNotification(
          `Step ${body.sequence / 5} Updated`,
          res?.data.status
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
  post: (token: string, body: Event, rcid: string, pid: string) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, Event>, Event>(
        `/rc/${rcid}/proforma/${pid}/event`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification(
          `Step ${body.sequence / 5} Added`,
          res?.data.status
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
  postStudents: (
    token: string,
    rcid: string,
    pid: string,
    eid: string,
    body: RegisterStudentParams
  ) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, RegisterStudentParams>,
        RegisterStudentParams
      >(
        `/rc/${rcid}/proforma/${pid}/event/${eid}/student`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Enrolled Students", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not fetch data",
          err.response?.data?.error || err.message
        );
        return false;
      }),
  getStudents: (token: string, rcid: string, pid: string, eid: string) =>
    instance
      .get<Student[]>(
        `/rc/${rcid}/proforma/${pid}/event/${eid}/student`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Student[];
      }),
  getAll: (token: string, rcid: string, pid: string) =>
    instance
      .get<Event[]>(`/rc/${rcid}/proforma/${pid}/event`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Event[];
      }),
  get: (token: string, rcid: string, eid: string) =>
    instance
      .get<EventDetails>(`/rc/${rcid}/event/${eid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as EventDetails;
      }),
};
export default eventRequest;
