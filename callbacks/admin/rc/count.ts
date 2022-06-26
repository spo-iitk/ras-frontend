import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";
import {
  ADMIN_APPLICATION_URL,
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";

export interface RCCount {
  registered_student: number;
  registered_company: number;
}
export interface APPCount {
  roles: number;
  recruited: number;
}

const companyinstance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const appinstance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const countData = {
  getRC: (token: string, rcid: string) =>
    companyinstance
      .get<RCCount>(`/${rcid}/count`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not fetch data",
          err.response?.data?.error || err.message
        );
        return { registered_student: 0, registered_company: 0 } as RCCount;
      }),
  getApplications: (token: string, rcid: string) =>
    appinstance
      .get<APPCount>(`/rc/${rcid}/count`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not fetch data",
          err.response?.data?.error || err.message
        );
        return { roles: 0, recruited: 0 } as APPCount;
      }),
};

export default countData;
