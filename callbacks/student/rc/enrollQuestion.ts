import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

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
  roll_no: string;
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
      .get<StudentRC>(`/rc/${rcid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { ID: 0 } as StudentRC;
      }),
  getStudentEnrollment: (token: string, rcid: string) =>
    instance
      .get<studentEnrollResponse[]>(`/rc/${rcid}/enrollment`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as studentEnrollResponse[];
      }),
  postEnrollmentAnswer: (
    token: string,
    rcid: string,
    recruitment_cycle_question_id: number,
    answer: string
  ) =>
    instance
      .post(
        `/rc/${rcid}/enrollment/${recruitment_cycle_question_id}/answer`,
        { recruitment_cycle_question_id, answer },
        setConfig(token)
      )
      .then((res) => {
        successNotification(
          `Question Id: ${recruitment_cycle_question_id} answered!`,
          res.data.status
        );
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          `Failed to answer Question Id:${recruitment_cycle_question_id}`,
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default enrollmentRequest;
