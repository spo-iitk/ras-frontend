import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

export interface Step1Params {
  companyn_ame: string;
  job_description: string;
  nature_of_business: string;
  tentative_job_location: string;
}

export interface Step3Params {
  package_details: string;
  cost_to_company: string;
  bond: boolean;
  bond_Details: string;
  medical_requirements: string;
}

export interface Step5Params {
  eligibility_riteria: string;
  message: string;
  active_HR: string;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});
const newProforma = {
  postStep1: (token: string, rid: string, body: Step1Params) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, Step1Params>,
        Step1Params
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Submitted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        return false;
      }),
  postStep3: (token: string, rid: string, body: Step3Params) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, Step3Params>,
        Step3Params
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Submitted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        return false;
      }),
  postStep5: (token: string, rid: string, body: Step5Params) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, Step5Params>,
        Step5Params
      >(`/application/rc/${rid}/proforma`, body, setConfig(token))
      .then((res) => {
        successNotification("Submitted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        return false;
      }),
};
export default newProforma;
