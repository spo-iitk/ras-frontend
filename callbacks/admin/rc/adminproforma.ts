import axios, { AxiosResponse } from "axios";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

interface nullBool {
  Bool: boolean;
  Valid: boolean;
}
export interface AdminProformaType {
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
  postal_address: string;
  establishment_date: string;
  total_employees: string;
  social_media: string;
  website: string;
  turnover: string;
  type_of_org: string;
  head_office: string;
  min_hires: string;
  total_hires: string;
  skill_set: string;
  pwd: string;
  cpi_criteria: string;
  backlog_eligibility: string;
  ctc_inr: string;
  ctc_fr: string;
  gross: string;
  take_home: string;
  base: string;
  joining_bonus: string;
  relocation_bonus: string;
  first_ctc: string;
  medical_allowance: string;
  retention_bonus: string;
  deductions: string;
  perks: string;
  accommodation: string;
  ppo_confirming_date: string;
  internship_period: string;
}

export interface ProformaResponse {
  pid: number;
}

export interface ProformaEmailRequest {
  event_id: number;
  subject: string;
  body: string;
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requestProforma = {
  get: (token: string, rcid: string, pid: string) =>
    instance
      .get<AdminProformaType>(`/rc/${rcid}/proforma/${pid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as AdminProformaType;
      }),
  getAll: (token: string, rcid: string) =>
    instance
      .get<AdminProformaType[]>(`/rc/${rcid}/proforma`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as AdminProformaType[];
      }),

  post: (token: string, rcid: string, body: AdminProformaType) =>
    instance
      .post<
        ProformaResponse,
        AxiosResponse<ProformaResponse, AdminProformaType>,
        AdminProformaType
      >(`/rc/${rcid}/proforma`, body, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return { pid: 0 } as ProformaResponse;
      }),
  put: (token: string, rcid: string, body: AdminProformaType) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, AdminProformaType>,
        AdminProformaType
      >(`/rc/${rcid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Updated Proforma", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Updation Failed", err.response?.data?.error);
        return false;
      }),
  hide: (token: string, rcid: string, ID: number, hide_details: boolean) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, AdminProformaType>,
        AdminProformaType
      >(
        `/rc/${rcid}/proforma/hide`,
        { ID, hide_details } as AdminProformaType,
        setConfig(token)
      )
      .then((res) => {
        successNotification(
          hide_details
            ? "Details Hidden From company"
            : "Company can see details now",
          res.data.status
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Updation Failed", err.response?.data?.error);
        return false;
      }),
  email: (
    token: string,
    rcid: string,
    pid: string,
    body: ProformaEmailRequest
  ) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, ProformaEmailRequest>,
        ProformaEmailRequest
      >(`/rc/${rcid}/proforma/${pid}/email`, body, setConfig(token))
      .then((res) => {
        successNotification("Email Send Successfully", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Email Send Failed", err.response?.data?.error);
        return false;
      }),
};

export default requestProforma;
