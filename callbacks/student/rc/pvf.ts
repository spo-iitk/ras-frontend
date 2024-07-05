import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
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
  remarks: string;
  duration: string;
  mentor_name: string;
  mentor_designation: string;
  mentor_email: string;
  is_verified: nullBool;
  is_approved: nullBool;
  recruitment_cycle_id: number;
  filename_student: string;
  filename_mentor: string;
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
        const updatedBody = {
          ...body,
          filename_student: response.data.filename,
        };
        return instance
          .post<
            StatusResponse,
            AxiosResponse<StatusResponse, PvfsParams>,
            PvfsParams
          >(`/application/rc/${rid}/pvf`, updatedBody, setConfig(token))
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
  delete: (token: string, rcid: string, pid: string) =>
    instance
      .delete<PvfsParams>(
        `/application/rc/${rcid}/pvf/${pid}`,
        setConfig(token)
      )
      .then(() => {
        // cdn_instance.delete<De, AxiosResponse<PvfResponse, FormData>, FormData>(
        //   "/delete",
        //   {
        //     headers: {
        //       token,
        //       rcid,
        //     },
        //   }
        // );
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as PvfsParams;
      }),
  editWithoutFile: (
    token: string,
    rcid: string,
    pid: string,
    body: PvfsParams
  ) =>
    instance
      .put<
        StatusResponse,
        AxiosResponse<StatusResponse, PvfsParams>,
        PvfsParams
      >(`/application/rc/${rcid}/pvf/${pid}`, body, setConfig(token))
      .then(() => {
        successNotification("PVF Edited Succefully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("PVF Edit Failed", err.response?.data?.error);
        return false;
      }),
  editWithFile: (
    token: string,
    rid: string,
    pid: string,
    document: FormData,
    body: PvfsParams
  ) =>
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
          filename_student: response.data.filename,
        };
        return instance
          .put<
            StatusResponse,
            AxiosResponse<StatusResponse, PvfsParams>,
            PvfsParams
          >(`/application/rc/${rid}/pvf/${pid}`, updatedBody, setConfig(token))
          .then(() => {
            successNotification("PVF Edited Succefully", "");
            return true;
          })
          .catch((err: ErrorType) => {
            errorNotification("PVF Edit Failed", err.response?.data?.error);
            return false;
          });
      })
      .catch((err: ErrorType) => {
        errorNotification("Upload Failed", err.response?.data?.error);
        return { message: "", filename: "" } as PvfResponse;
      }),
};

export default pvfRequest;
