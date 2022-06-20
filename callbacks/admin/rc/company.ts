import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface CompanyRc {
  ID: number;
  CreatedAt: string;
  company_id: number;
  company_name: string;
  recuritment_cycle_id: string;
  hr1: string;
  hr2: string;
  hr3: string;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const requestCompany = {
  post: (token: string, body: CompanyRc, rid: string) =>
    instance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, CompanyRc>,
        CompanyRc
      >(`/${rid}/company`, body, setConfig(token))
      .then((res) => {
        successNotification("Company Registered", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
  getall: (token: string, rid: string) =>
    instance
      .get<CompanyRc[]>(`/${rid}/company`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as CompanyRc[];
      }),
};

export default requestCompany;
