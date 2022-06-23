import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  StatusResponse,
  setConfig,
} from "../constants";

export interface Student {
  ID: number;
  roll_no: string;
  name: string;
  program: string;
  department: string;
  program_2: string;
  department_2: string;
  specialization: string;
  preference: string;
  gender: string;
  disability: string;
  dob: number;
  expected_graduation_year: number;
  iitk_email: string;
  personal_email: string;
  phone: string;
  alternate_phone: string;
  whatsapp_number: string;
  program_department_id: number;
  secondary_program_department_id: number;
  current_cpi: number;
  ug_cpi: number;
  tenth_board: string;
  tenth_year: number;
  tenth_marks: number;
  twelfth_board: string;
  twelfth_year: number;
  twelfth_marks: number;
  entrance_exam: string;
  entrance_exam_rank: number;
  category: string;
  category_rank: number;
  current_address: string;
  permanent_address: string;
  friend_name: string;
  friend_phone: string;
  is_editable: string;
  is_verified: boolean;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const studentRequest = {
  get: (token: string) =>
    instance
      .get<Student>("", setConfig(token))
      .then(responseBody)
      .catch((err) => {
        errorNotification(
          "Failed to get data",
          err.response?.data.message || err.message
        );
        return { ID: 0 } as Student;
      }),
  update: (token: string, body: Student) =>
    instance
      .put<StatusResponse, AxiosResponse<StatusResponse, Student>, Student>(
        "",
        body,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Data upadated Successfully", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Failed to update data",
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default studentRequest;
