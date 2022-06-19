import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Emails {
  email: string[];
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const postEmails = {
  post: (token: string, rcid: string, body: Emails) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, Emails>, Emails>(
        `/${rcid}/student`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Enrolled Students", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not fetch data",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default postEmails;
