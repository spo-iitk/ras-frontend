import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";
import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { ProformaEvent, ProformaType } from "@callbacks/company/proforma";

export interface NewProformaResponse {
  pid: number;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sProformaRequest = {
  get: (token: string, rid: string, pid: string) =>
    instance
      .get<ProformaType>(
        `/application/rc/${rid}/proforma/${pid}`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { ID: 0 } as ProformaType;
      }),
  getEvent: (token: string, rid: string, pid: string) =>
    instance
      .get<ProformaEvent[]>(
        `/application/rc/${rid}/proforma/${pid}/event`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as ProformaEvent[];
      }),
};
export default sProformaRequest;
