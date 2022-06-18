import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Emails {
  email: string[];
}

export interface Student {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  comment: string;
  cpi: number;
  email: string;
  is_frozen: boolean;
  name: string;
  program_department_id: number;
  recruitment_cycle_id: number;
  secondary_program_department_id: number;
  student_id: number;
  type: string;
}
// CreatedAt: "2022-06-18T09:25:45.965335Z"
// DeletedAt: null
// ID: 3
// UpdatedAt: "2022-06-18T09:25:45.965335Z"
// comment: ""
// cpi: 0
// email: "harshitr20@iitk.ac.in"
// is_frozen: false
// name: "Harshit Raj"
// program_department_id: 0
// recruitment_cycle_id: 1
// secondary_program_department_id: 0
// student_id: 7
// type: "Available"

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const postEmails = {
  getAllStudents: (token: string, rcid: string) =>
    instance
      .get<Student[]>(`/${rcid}/student`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Failed to get students", err.response?.data?.error);
        return [] as Student[];
      }),
  post: (token: string, rcid: string, body: Emails) =>
    instance
      .post<StatusResponse, AxiosResponse<StatusResponse, Emails>, Emails>(
        `/${rcid}/student`,
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Students Enrolled successfully", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to Enroll Students",
          err.response?.data?.error
        );
        return false;
      }),
};

export default postEmails;
