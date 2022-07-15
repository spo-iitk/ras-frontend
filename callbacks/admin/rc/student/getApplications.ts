import axios, { AxiosResponse } from "axios";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface ApplicationResponse {
  id: string;
  company_name: string;
  role: string;
  deadline: number;
  resume_id: string;
  resume: string;
  appplied_on: number;
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const getStudentApplication = {
  getAll: (token: string, rcid: string, sid: string) =>
    instance
      .get<ApplicationResponse[]>(`/rc/${rcid}/view/${sid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to get Student applications",
          err.response?.data?.error
        );
        return [] as ApplicationResponse[];
      }),
};

export default getStudentApplication;
