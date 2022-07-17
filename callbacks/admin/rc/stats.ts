import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface StatType {
  student_recruitment_cycle_id: number;
  company_name: string;
  role: string;
  type: string;
}

export interface StudentStats {
  id: number;
  name: string;
  email: string;
  roll_no: string;
  program_department_id: number;
  secondary_program_department_id: number;
  company_name: string;
  role: string;
  type: string;
}

export interface BranchStats {
  program_department_id: number;
  total: number;
  pre_offer: number;
  recruited: number;
}

export interface Stats {
  student: StudentStats[];
  branch: BranchStats[];
}

const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const statRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<Stats>(`rc/${rcid}/stats`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { student: [], branch: [] } as Stats;
      }),
};

export default statRequest;
