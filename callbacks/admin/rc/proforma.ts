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

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const requestProforma = {
  get: (token: string, rcid: string, cid: string) =>
    instance
      .get<ProformaType>(`/${rcid}/company/${cid}/proforma`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as ProformaType;
      }),

  post: (token: string, body: ProformaType, rid: string) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, ProformaType>,
        ProformaType
      >(`/${rid}/company`, body, setConfig(token))
      .then((res) => {
        successNotification("Company Registered", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
  getall: (token: string, rcid: string, cid: string) =>
    instance
      .get<ProformaType[]>(
        `/rc/${rcid}/company/${cid}/proforma`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as ProformaType[];
      }),
};

export default requestProforma;
