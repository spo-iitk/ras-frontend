import axios, { AxiosResponse } from "axios";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Event {
  duration: string;
  label: string;
  name: string;
  ID: number;
  proforma_id: number;
  sequence: number;
}
const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const eventRequest = {
  put: (token: string, body: Event, rcid: string) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, Event>, Event>(
        `/application/rc/${rcid}/event`,
        body,
        setConfig(token)
      )
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
  post: (token: string, body: Event, rcid: string) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, Event>, Event>(
        `/application/rc/${rcid}/event`,
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
  getAll: (token: string, rcid: string, pid: string) =>
    instance
      .get<Event[]>(
        `/application/rc/${rcid}/proforma/${pid}/event`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Event[];
      }),
  delete: (token: string, rcid: string, eid: string) =>
    instance
      .delete<Event[]>(`/application/rc/${rcid}/event/${eid}`, setConfig(token))
      .then(() => {
        successNotification("Step deleted successfully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting step",
          err.response?.data?.error || err.message
        );
      }),
};
export default eventRequest;
