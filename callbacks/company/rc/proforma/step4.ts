import axios, { AxiosResponse } from "axios";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Event {
  duration: number;
  label: string;
  proforma_id: number;
  sequence: number;
}
const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const proformaRequestStep4 = {
  post: (token: string, body: Event, rcid: string) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, Event>,
        Event
      >(`/application/rc/${rcid}/event`, body, setConfig(token))
      .then((res) => {
        successNotification(`Step ${body.sequence/5} Added`, res?.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
};
export default proformaRequestStep4;
