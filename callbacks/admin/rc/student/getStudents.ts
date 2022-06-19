import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

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
};

export default getStudents;
