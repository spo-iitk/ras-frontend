import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  CDN_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  VERIFICATION_URL,
  setConfig,
} from "@callbacks/constants";
import { PvfResponse, PvfsParams } from "@callbacks/student/rc/pvf";

const instance = axios.create({
  baseURL: VERIFICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});
const cdn_instance = axios.create({
  baseURL: CDN_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const pvfVerificationRequest = {
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
        const updatedBody = {
          ...body,
          filename: response.data.filename,
        };
        instance
          .put<
            StatusResponse,
            AxiosResponse<StatusResponse, PvfsParams>,
            PvfsParams
          >(`/pvf`, updatedBody, setConfig(token))
          .then(() => {
            successNotification("Succefully Verified PVF", "");
            return true;
          })
          .catch((err: ErrorType) => {
            errorNotification("Verification Failed", err.response?.data?.error);
            return false;
          });
      }),
  get: (token: string) =>
    instance
      .get<PvfsParams>(`/pvf`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams;
      }),
  put: (token: string, body: PvfsParams) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, PvfsParams>,
        PvfsParams
      >(`/pvf`, body, setConfig(token))
      .then(() => {
        successNotification("Succefully Verified PVF", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Verification Failed", err.response?.data?.error);
        return false;
      }),
};

export default pvfVerificationRequest;
