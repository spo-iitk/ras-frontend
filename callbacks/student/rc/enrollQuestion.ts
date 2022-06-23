import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface studentEnrollResponse {
  ID: number;
  type: string;
  question: string;
  recruitment_cycle_id: number;
  mandatory: boolean;
  options: string;
  answer: string;
}
export interface StudentRC {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  student_id: number;
  recruitment_cycle_id: number;
  program_department_id: number;
  secondary_program_department_id: number;
  cpi: number;
  email: string;
  name: string;
  type: string;
  is_frozen: boolean;
  is_verified: boolean;
  comment: string;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const enrollmentRequest = {
  getStudentRC: (token: string, rcid: string) =>
    instance
      .get(`/rc/${rcid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as StudentRC[];
      }),
  getStudentEnrollment: (token: string, rcid: string) =>
    instance
      .get(`/rc/${rcid}/enrollment`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as studentEnrollResponse[];
      }),
};

export default enrollmentRequest;
