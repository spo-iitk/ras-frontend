import axios, { AxiosResponse } from "axios";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface StudentType {
  questions: any;
  ID: number;
  name: string;
  email: string;
  roll_no: string;
  current_cpi: number;
  ug_cpi: number;
  program_department_id: number;
  secondary_program_department_id: number;
  specialization: string;
  preference: string;
  gender: string;
  disability: string;
  dob: number;
  expected_graduation_year: number;
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
  personal_email: string;
  current_address: string;
  permanent_address: string;
  friend_name: string;
  friend_phone: string;
  resume: string;
  frozen: boolean;
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const StudentRequest = {
  get: (token: string, rcid: string, pid: string) =>
    instance
      .get<StudentType[]>(
        `/rc/${rcid}/proforma/${pid}/students`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((error: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          error.response?.data.error || error.message
        );
        return [] as StudentType[];
      }),
};

export default StudentRequest;
