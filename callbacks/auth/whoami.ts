import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import { AUTH_URL, ErrorType, SERVER_ERROR, setConfig } from "../constants";

export interface WhoamiResponse {
  role_id: number;
  user_id: string;
}

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const whoami = {
  get: (token: string) =>
    authInstance
      .get<WhoamiResponse>("/whoami", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Unauthorized",
          err.response?.data?.error || err.message
        );
        return { user_id: "", role_id: 0 } as WhoamiResponse;
      }),
};

export default whoami;
