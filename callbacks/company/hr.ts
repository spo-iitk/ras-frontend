import axios, { AxiosResponse } from "axios";
// import { showNotification } from "@mantine/notifications";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface HR {
  company_id: number;
  ID: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
}

export interface CompanyRC {
  ID: number;
  company_name: string;
  hr1: string;
  hr2: string;
  hr3: string;
}

const companyHRInstance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const companyHRRequest = {
  get: (token: string) =>
    companyHRInstance
      .get<HR[]>("/hr", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as HR[];
      }),
  post: (body: HR, token: string) =>
    companyHRInstance
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
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
  enroll: (body: CompanyRC, token: string, rid: string) =>
    companyHRInstance
      .post<CompanyRC>(`rc/${rid}/enrollment`, body, setConfig(token))
      .then((res) => {
        successNotification(
          "Company Registered",
          `Enrolled with id ${res.data?.ID}`
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
};

export default companyHRRequest;
