import axios, { AxiosResponse } from "axios";
// import { showNotification } from "@mantine/notifications";

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
export interface HR {
  company_id: number;
  ID: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
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
          err.response?.data?.error || err.message
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
          err.response?.data?.error || err.message
        );
        return { ID: 0 } as Company;
      }),
  getLimited: (token: string, pageSize: number, lastFetchId: number) =>
    adminCompanyInstance
      .get<Company[]>(
        `/limited?pageSize=${pageSize}&lastFetchedId=${lastFetchId}`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as Company[];
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
          err.response?.data?.error || err.message
        );
        return false;
      }),
  addHR: (body: HR, token: string) =>
    adminCompanyInstance
      .post<StatusResponse, AxiosResponse<StatusResponse, HR>, HR>(
        "/hr",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("HR Registered", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("HR Registration Failed", err.response?.data?.error);
        return false;
      }),
  getAllHR: (token: string, company_id: string) =>
    adminCompanyInstance
      .get<HR[]>(`/${company_id}/hr`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching HR Data",
          err.response?.data?.error || err.message
        );
        return [] as HR[];
      }),
  delete: (token: string, cid: string) => {
    adminCompanyInstance
      .delete(`${cid}`, setConfig(token))
      .then((res) => {
        successNotification("Company deleted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting company",
          err.response?.data?.error || err.message
        );
        return false;
      });
  },
  deleteHR: (token: string, hrid: string) => {
    adminCompanyInstance
      .delete(`/hr/${hrid}`, setConfig(token))
      .then((res) => {
        successNotification("HR deleted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting HR",
          err.response?.data?.error || err.message
        );
        return false;
      });
  },
};

export default addCompanyRequest;

// get compnay, edit company, bulk add company
// delete
