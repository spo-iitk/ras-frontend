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
  frozen: boolean;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const freezeRequest = {
  put: (token: string, rcid: string, body: Emails) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, Emails>, Emails>(
        `/${rcid}/student/freeze`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Students freezed", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Could not freeze students",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default freezeRequest;
