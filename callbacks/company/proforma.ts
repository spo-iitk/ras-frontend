import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

export interface ProformaParams {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  company_name: string;
  job_description: string;
  nature_of_business: string;
  tentative_job_location: string;
  recruitment_cycle_id: number;
  package_details: string;
  cost_to_company: string;
  bond: boolean;
  bond_details: string;
  medical_requirements: string;
  eligibility_criteria: string;
  message: string;
  active_HR: string;
}

export interface NewProformaResponse {
  pid: number;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const proformaRequest = {
  post: (token: string, rid: string, body: ProformaParams) =>
    instance
      .post<
        NewProformaResponse,
        AxiosResponse<NewProformaResponse, ProformaParams>,
        ProformaParams
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        return { pid: 0 } as NewProformaResponse;
      }),
  put: (token: string, rid: string, body: ProformaParams) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, ProformaParams>,
        ProformaParams
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Updation", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Updation Failed", err.response?.data?.error);
        return false;
      }),
  get: (token: string, rid: string, pid: string) =>
    instance
      .get<ProformaParams>(
        `/application/rc/${rid}/proforma/${pid}`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { ID: 0 } as ProformaParams;
      }),
};
export default proformaRequest;
