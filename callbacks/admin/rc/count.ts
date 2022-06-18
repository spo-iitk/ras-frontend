import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ADMIN_APPLICATION_URL,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface RCCount {
  registered_student: number;
  registered_company: number;
}
export interface APPCount {
  roles: number;
  ppo_pio: number;
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
      .then(responseBody),
  getApplications: (token: string, rcid: string) =>
    appinstance
      .get<APPCount>(`/rc/${rcid}/count`, setConfig(token))
      .then(responseBody),
};

export default countData;
