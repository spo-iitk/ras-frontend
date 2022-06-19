import axios, { AxiosResponse } from "axios";

import {
  ADMIN_COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Company {
  ID: number;
  name: string;
  tags: string;
  website: string;
  description: string;
}

const adminCompanyInstance = axios.create({
  baseURL: ADMIN_COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const addCompanyRequest = {
  post: (body: Company, token: string) =>
    adminCompanyInstance
      .post<StatusResponse, AxiosResponse<StatusResponse, Company>, Company>(
        "",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Company Registered", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
  getall: (token: string) =>
    adminCompanyInstance
      .get<Company[]>("", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data.error || err.message
        );
        return [] as Company[];
      }),
  get: (token: string, cid: string) =>
    adminCompanyInstance
      .get<Company>(`/${cid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data.error || err.message
        );
        return { ID: 0 } as Company;
      }),
  update: (token: string, body: Company) =>
    adminCompanyInstance
      .put<StatusResponse, AxiosResponse<StatusResponse, Company>, Company>(
        "",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Updated Company", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to update",
          err.response?.data.error || err.message
        );
        return false;
      }),
};

export default addCompanyRequest;

// get compnay, edit company, bulk add company
// delete
