import axios, { AxiosResponse } from "axios";

import {
  ADMIN_COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface CompanyHR {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
}

const adminCompanyHRInstance = axios.create({
  baseURL: ADMIN_COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const CompanyHRRequest = {
  getAll: (token: string) =>
    adminCompanyHRInstance
      .get<CompanyHR[]>("/hr", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return [] as CompanyHR[];
      }),
};

export default CompanyHRRequest;
