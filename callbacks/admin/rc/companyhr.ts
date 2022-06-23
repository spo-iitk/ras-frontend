import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface HR {
  name: string;
  hr1: string;
  hr2: string;
  hr3: string;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requestCompanyHR = {
  getHR: (token: string, rcid: string, crid: number) =>
    instance
      .get<HR>(`/${rcid}/company/${crid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return { hr1: "", hr2: "", hr3: "" } as HR;
      }),
};

export default requestCompanyHR;
