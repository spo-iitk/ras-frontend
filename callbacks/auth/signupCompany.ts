import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
} from "../constants";

export interface SignUpCompanyParams {
  ID?: number;
  company_name: string;
  name: string;
  phone: string;
  email: string;
  designation: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const companySignUpRequest = {
  post: (body: SignUpCompanyParams) =>
    authInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, SignUpCompanyParams>,
        SignUpCompanyParams
      >("/company-signup", body)
      .then((res) => {
        successNotification("Registeration requested", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "SignUp request Failed",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default companySignUpRequest;
