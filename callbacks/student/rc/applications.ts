import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "../../constants";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

export interface ApplicationType {
  company_name: string;
  role: string;
  dealine: number;
  resume_id: string;
  resume: string;
}
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const applicationViewRequest = {
  get: (token: string, rcid: string) =>
    instance
      .get<ApplicationType[]>(`/application/rc/${rcid}/view`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as ApplicationType[];
      }),
};

export default applicationViewRequest;
