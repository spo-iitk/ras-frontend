import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Student {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  comment: string;
  cpi: number;
  email: string;
  is_frozen: boolean;
  is_verified: boolean;
  name: string;
  program_department_id: number;
  recruitment_cycle_id: number;
  secondary_program_department_id: number;
  student_id: number;
  type: string;
  roll_no?: string;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const getStudents = {
  getAllStudents: (token: string, rcid: string) =>
    instance
      .get<Student[]>(`/${rcid}/student`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Failed to get students", err.response?.data?.error);
        return [] as Student[];
      }),
  getStudent: (token: string, rcid: string, ID: string) =>
    instance
      .get<Student>(`/${rcid}/student/${ID}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Failed to get students", err.response?.data?.error);
        return {} as Student;
      }),
  update: (token: string, body: Student, rcid: string) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, Student>, Student>(
        `/${rcid}/student`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Updated Student Details", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to update",
          err.response?.data?.error || err.message
        );
        return false;
      }),
  deleteStudent: (token: string, rcid: string, sid: string) =>
    instance
      .delete(`/${rcid}/student/${sid}`, setConfig(token))
      .then((res) => {
        successNotification("Student details deleted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting student details",
          err.response?.data?.error || err.message
        );
        return false;
      }),
  clarify: (
    token: string,
    clarification: string,
    rcid: string,
    studentid: string
  ) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, any>, any>(
        `/${rcid}/student/${studentid}/clarification`,
        { clarification },
        setConfig(token)
      )
      .then((res) => {
        successNotification("Message sent!", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to send message!",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default getStudents;
