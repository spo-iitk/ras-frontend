import axios, { AxiosResponse } from "axios";

import {
  ADMIN_STUDENT_URL,
  ErrorType,
  SERVER_ERROR,
  StatusResponse,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface Student {
  ID: number;
  roll_no: string;
  name: string;
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
  baseURL: ADMIN_STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const AdminStudentRequest = {
  delete: (token: string, id: number) =>
    instance
      .delete<StatusResponse, AxiosResponse<StatusResponse, Student>>(
        `/${id}`,
        setConfig(token)
      )
      .then((res) => {
        successNotification("Student Data Deleted", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Could Not Delete", err.response?.data?.error);
        return false;
      }),
  getAll: (token: string) =>
    instance
      .get<Student[]>("", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Could Not Fetch Data", err.response?.data?.error);
        return [] as Student[];
      }),
  get: (token: string, id: number) =>
    instance
      .get<Student>(`/${id}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Could Not Fetch Data", err.response?.data?.error);
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
        successNotification("Student Data Updated", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("Could Not Update", err.response?.data?.error);
        return false;
      }),
};

export default AdminStudentRequest;
