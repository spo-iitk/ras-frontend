import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  SERVER_ERROR,
  setConfig,
  StatusResponse,
} from "@callbacks/constants";

export interface Emails {
  email: string[];
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const postEmails = {
  post: (token: string, rcid: string, body: Emails) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, Emails>, Emails>(
        `/${rcid}/student`,
        body,
        setConfig(token)
      )
      .then(responseBody),
};

export default postEmails;
