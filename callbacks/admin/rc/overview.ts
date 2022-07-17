import axios from "axios";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface Event {
  duration: number;
  name: string;
  ID: number;
  proforma_id: number;
  sequence: number;
  start_date: number;
  start_time: number;
  end_time: number;
  main_poc: string;
  description: string;
  record_attendance: boolean;
  venue: string;
  company_name: string;
  CreatedAt: string;
  UpdatedAt: string;
  role: string;
  recruitment_cycle_id: string;
}
const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const eventRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<Event[]>(`/rc/${rcid}/event`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Event[];
      }),
  getProforma: (token: string, rcid: string) =>
    instance
      .get<Event[]>(`/rc/${rcid}/proforma`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as Event[];
      }),
};
export default eventRequest;
