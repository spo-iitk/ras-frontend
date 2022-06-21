import axios, { AxiosResponse } from "axios";
// import { showNotification } from "@mantine/notifications";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface HR {
  hr1: string;
  hr2: string;
  hr3: string;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const getCompanyHR = {
  get: (token: string, rid: string) =>
    instance
      .get<HR>(`/rc/${rid}/hr`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as HR;
      }),
};

export default getCompanyHR;
