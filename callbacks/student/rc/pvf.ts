import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";
import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
export interface PvfsParams {
  ID: number;
  company_university_name: string;
  role: string;
  // description: string;
  // duration: string;
  mentor_name: string;
  // mentor_designation: string;
  mentor_email: string;
  isVerifed: boolean;
}

export interface PvfsType {
  company_university_name: string;
  role: string;
  duration: string;
  description: string;
  mentor_name: string;
  mentor_designation: string;
  mentor_email: string;
}

const pvfRequest = {
  post: (token: string, rid: string, body: PvfsType) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, PvfsType>, PvfsType>(
        `/application/rc/${rid}/pvf`,
        body,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Submission Failed", err.response?.data?.error);
        // return { pid: 0 } as NewProformaResponse;
      }),
  getAll: (token: string, rcid: string) =>
    instance
      .get<PvfsParams[]>(`/application/rc/${rcid}/pvf`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams[];
      }),
};

export default pvfRequest;
