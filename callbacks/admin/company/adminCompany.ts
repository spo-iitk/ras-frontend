import axios, { AxiosResponse } from "axios";

import {
  ADMIN_COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface AddCompanyParams {
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
  post: (body: AddCompanyParams, token: string) =>
    adminCompanyInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, AddCompanyParams>,
        AddCompanyParams
      >("", body, setConfig(token))
      .then((res) => {
        successNotification("Company Registered", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Registration Failed", err.response?.data?.error);
        return false;
      }),
};

export default addCompanyRequest;
