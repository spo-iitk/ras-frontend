import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const deregisterRequest = {
  put: (token: string, rcid: string) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse>>(
        `/${rcid}/student/deregister`,
        {},
        setConfig(token)
      )
      .then((res) => {
        successNotification(
          "Successfully Deregistered all studnets",
          res.data.status
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deregistering",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default deregisterRequest;
