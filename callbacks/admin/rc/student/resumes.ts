import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

interface nullBool {
  Bool: boolean;
  Valid: boolean;
}

export interface AllStudentResumeResponse {
  name: string;
  email: string;
  sid: number;
  rsid: number;
  resume: string;
  verified: nullBool;
  action_taken_by: string;
}

export interface StudentResumeResponse {
  ID: number; // rsid
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  recruitment_cycle_id: number;
  student_recruitment_cycle_id: number;
  resume: string;
  verified: nullBool;
  action_taken_by: string;
}
export interface VerifyBody {
  verified: boolean;
}

export interface SuccessResponse {
  sucess: boolean;
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const adminResumeRequest = {
  getAll: (token: string, rid: string) =>
    instance
      .get<AllStudentResumeResponse[]>(`/${rid}/resume`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as AllStudentResumeResponse[];
      }),
  get: (token: string, rid: string, sid: string) =>
    instance
      .get<StudentResumeResponse[]>(
        `/${rid}/student/${sid}/resume`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as StudentResumeResponse[];
      }),
  putVerify: (token: string, rid: string, rsid: string, body: VerifyBody) =>
    instance
      .put<SuccessResponse, AxiosResponse<SuccessResponse>>(
        `/${rid}/resume/${rsid}/verify`,
        body,
        setConfig(token)
      )
      .then(() => {
        let stat = body.verified ? "accepted" : "rejected";
        successNotification("Success", `Resume ${stat}`);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
};

export default adminResumeRequest;
