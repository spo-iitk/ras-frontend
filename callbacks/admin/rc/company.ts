import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  AUTH_URL,
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
  recruitment_cycle_id: number;
  hr1: string;
  hr2: string;
  hr3: string;
  comments: string;
}

interface RecentCompany {
  companies: string[];
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const recentInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});
const requestCompany = {
  get: (token: string, rcid: string, cid: string) =>
    instance
      .get<CompanyRc>(`/${rcid}/company/${cid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as CompanyRc;
      }),

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
  update: (token: string, body: CompanyRc, rcid: string) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, CompanyRc>, CompanyRc>(
        `/${rcid}/company`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Changed Company Details", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to update",
          err.response?.data?.error || err.message
        );
        return false;
      }),
  deleteCompany: (token: string, rcid: string, cid: string) =>
    instance
      .delete(`/${rcid}/company/${cid}`, setConfig(token))
      .then((res) => {
        successNotification("Company details deleted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting company details",
          err.response?.data?.error || err.message
        );
        return false;
      }),
  getRecent: (token: string) =>
    recentInstance
      .get<RecentCompany>(`new-companies`, setConfig(token))
      .then((res) => res.data.companies)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as string[];
      }),
};

export default requestCompany;
