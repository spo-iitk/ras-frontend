import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";
import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
interface nullBool {
  Bool: boolean;
  Valid: boolean;
}
// export interface AllStudentPvfResponse {
//   pvfid: string;
//   CreatedAt: string;
//   UpdatedAt: string;
//   name: string;
//   email: string;
//   roll_no: string;
//   pvf: string;
//   verified: {
//     Bool: boolean;
//     Valid: boolean;
//   };
//   action_taken_by: string;
// }
export interface AllStudentPvfResponse {
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
  student_recruitment_cycle_id: string;
  roll_no: string;
  name: string;
  iitk_email: string;
  pvf_expiry: string;
}

const adminPvfRequest = {
  getAll: (token: string, rid: string) =>
    instance
      .get<AllStudentPvfResponse[]>(`/rc/${rid}/pvf`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as AllStudentPvfResponse[];
      }),
  getAllStudent: (token: string, rid: string, sid: string) =>
    instance
      .get<AllStudentPvfResponse[]>(
        `/rc/${rid}/pvf/student/${sid}`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as AllStudentPvfResponse[];
      }),
  get: (token: string, rid: string, pid: string) =>
    instance
      .get<AllStudentPvfResponse>(`/rc/${rid}/pvf/${pid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return {} as AllStudentPvfResponse;
      }),
  generateAuth: (token: string, rid: string, pid: string) =>
    instance
      .get<StatusResponse>(
        `/rc/${rid}/pvf/${pid}/verification/send`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        throw err;
      }),
  generateAuthForAllPVF: (token: string, rid: string, sid: string) =>
    instance
      .get<StatusResponse>(
        `/rc/${rid}/pvf/student/${sid}/verification/send`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        throw err;
      }),
  delete: (token: string, rid: string, pid: string) =>
    instance
      .delete<StatusResponse>(`/${rid}/pvf/${pid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        throw err;
      }),
  update: (token: string, rid: string, body: AllStudentPvfResponse) =>
    instance
      .put<StatusResponse>(`rc/${rid}/pvf`, body, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        throw err;
      }),
};

export default adminPvfRequest;
