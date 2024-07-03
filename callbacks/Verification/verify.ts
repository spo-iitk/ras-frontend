import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  StatusResponse,
  VERIFICATION_URL,
  setConfig,
} from "@callbacks/constants";
import { PvfsParams, PvfsType } from "@callbacks/student/rc/pvf";

const instance = axios.create({
  baseURL: VERIFICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const pvfVerificationRequest = {
  get: (token: string, rcid: string, pid: string) =>
    instance
      .get<PvfsParams>(`/application/rc/${rcid}/pvf/${pid}`)
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams;
      }),
  // verify: (token: string, rcid: string, pid: string, verifyy: boolean) =>
  //   instance
  //     .put<
  //       StatusResponse,
  //       AxiosResponse<StatusResponse, PvfsParams>,
  //       PvfsParams
  //     >(
  //       `/application/rc/${rcid}/pvf/${pid}/verify`,
  //       { isVerifed: verifyy } as PvfsParams,
  //       setConfig(token)
  //     )
  //     .then((res) => {
  //       successNotification("Student Data Updated", res.data.status);
  //       return true;
  //     })
  //     .catch((err: ErrorType) => {
  //       errorNotification("Could Not Update", err.response?.data?.error);
  //       return false;
  //     }),
  put: (token: string, rcid: string, body: PvfsParams) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, PvfsParams>,
        PvfsParams
      >(`application/rc/${rcid}/pvf`, body, setConfig(token))
      .then((res) => {
        successNotification("Updated Proforma", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Updation Failed", err.response?.data?.error);
        return false;
      }),
};

export default pvfVerificationRequest;
