import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

interface nullBool {
  Bool: boolean;
  Valid: boolean;
}
export interface ProformaType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  eligibility: string;
  company_id: number;
  company_recruitment_cycle_id: number;
  recruitment_cycle_id: number;
  is_approved: nullBool;
  action_taken_by: string;
  deadline: number;
  hide_details: boolean;
  active_hr: string;
  role: string;
  profile: string;
  tentative_job_location: string;
  job_description: string;
  cost_to_company: string;
  package_details: string;
  bond_details: string;
  bond: boolean;
  medical_requirements: string;
  additional_eligibility: string;
  message_for_cordinator: string;
  company_name: string;
}
export interface ProformaEvent {
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
  post: (token: string, rid: string, body: ProformaType) =>
    instance
      .post<
        NewProformaResponse,
        AxiosResponse<NewProformaResponse, ProformaType>,
        ProformaType
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        return { pid: 0 } as NewProformaResponse;
      }),
  put: (token: string, rid: string, body: ProformaType) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, ProformaType>,
        ProformaType
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Updation", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Updation Failed", err.response?.data?.error);
        return false;
      }),
  delete: (token: string, rid: string, pid: string) =>
    instance
      .delete<StatusResponse>(
        `/application/rc/${rid}/proforma/${pid}`,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Proforma Deleted", res?.data?.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not delete proforma",
          err?.response?.data?.error || err?.message
        );
        return false;
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
  getAll: (token: string, rid: string) =>
    instance
      .get<ProformaType[]>(`/application/rc/${rid}/proforma`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching all proformas",
          err?.response?.data?.error || err?.message
        );
        return [] as ProformaType[];
      }),
};
export default proformaRequest;
