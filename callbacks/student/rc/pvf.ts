import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";
import {
  CDN_URL,
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

const cdn_instance = axios.create({
  baseURL: CDN_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

interface nullBool {
  Bool: boolean;
  Valid: boolean;
}

export interface PvfResponse {
  message: string;
  filename: string;
}

export interface PvfsParams {
  ID: number;
  company_university_name: string;
  role: string;
  description: string;
  duration: string;
  mentor_name: string;
  mentor_designation: string;
  mentor_email: string;
  is_verified: nullBool;
  is_approved: nullBool;
  recruitment_cycle_id: number;
  filename: string;
}

const pvfRequest = {
  post: (token: string, rid: string, document: FormData, body: PvfsParams) =>
    cdn_instance
      .post<PvfResponse, AxiosResponse<PvfResponse, FormData>, FormData>(
        "/upload",
        document,
        {
          headers: {
            token,
            rid,
          },
        }
      )
      .then((response) => {
        body.filename = response.data.filename;
        return instance
          .post<
            StatusResponse,
            AxiosResponse<StatusResponse, PvfsParams>,
            PvfsParams
          >(`/application/rc/${rid}/pvf`, body, setConfig(token))
          .then((res) => res.data)
          .catch((err: ErrorType) => {
            errorNotification("Submission Failed", err.response?.data?.error);
            throw err; // Throw error to handle it in the outer catch
          });
      })
      .catch((err: ErrorType) => {
        errorNotification("Upload Failed", err.response?.data?.error);
        return { message: "", filename: "" } as PvfResponse;
      }),
  getAll: (token: string, rcid: string) =>
    instance
      .get<PvfsParams[]>(`/application/rc/${rcid}/pvf`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams[];
      }),
  get: (token: string, rcid: string, pid: string) =>
    instance
      .get<PvfsParams>(`/application/rc/${rcid}/pvf/${pid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams;
      }),
};

export default pvfRequest;
