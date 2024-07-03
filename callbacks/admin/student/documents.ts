import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";
import {
  ADMIN_STUDENT_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";

const instance = axios.create({
  baseURL: ADMIN_STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

// eslint-disable-next-line no-unused-vars
interface nullBool {
  Bool: boolean;
  Valid: boolean;
}

export interface AllStudentDocumentsResponse {
  name: string;
  email: string;
  sid: number;
  rsid: number;
  path: string;
  verified: boolean;
  action_taken_by: string;
}

export interface StudentDocumentsResponse {
  ID: number; // rsid
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  recruitment_cycle_id: number;
  student_recruitment_cycle_id: number;
  path: string;
  verified: boolean;
  action_taken_by: string;
}
export interface VerifyBody {
  verified: boolean;
}

export interface SuccessResponse {
  sucess: boolean;
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const adminDocumentsRequest = {
  getAll: (token: string) =>
    instance
      .get<AllStudentDocumentsResponse[]>(`/documents`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as AllStudentDocumentsResponse[];
      }),
  get: (token: string, sid: string) =>
    instance
      .get<StudentDocumentsResponse[]>(`/${sid}/documents`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return [] as StudentDocumentsResponse[];
      }),
  putVerify: (token: string, docid: string, body: VerifyBody) =>
    instance
      .put<SuccessResponse, AxiosResponse<SuccessResponse>>(
        `/documents/${docid}/verify`,
        body,
        setConfig(token)
      )
      .then(() => {
        let stat = body.verified ? "accepted" : "rejected";
        successNotification("Success", `Documents ${stat}`);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return false;
      }),
};

export default adminDocumentsRequest;
