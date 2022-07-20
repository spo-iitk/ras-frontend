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
export interface ProformaParams {
  ID: number;
  company_name: string;
  role: string;
  profile: string;
  set_deadline: number;
  resume: string;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const SProformaRequest = {
  getAllProforma: (token: string, rid: string) =>
    instance
      .get<ProformaParams[]>(
        `/application/rc/${rid}/proforma`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as ProformaParams[];
      }),
  getAllOpenings: (token: string, rid: string) =>
    instance
      .get<ProformaParams[]>(`/application/rc/${rid}/opening`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as ProformaParams[];
      }),
  get: (token: string, rid: string, pid: string) =>
    instance
      .get<ProformaType>(
        `/application/rc/${rid}/proforma/${pid}`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {
          ID: 0,
          cost_to_company: "",
          job_description: "",
          package_details: "",
          eligibility: "0",
        } as ProformaType;
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
export default SProformaRequest;
