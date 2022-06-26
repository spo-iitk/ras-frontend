import axios from "axios";

import {
  COMPANY_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface ApplicantsCompanySide {
  ID: number;
  Name: string;
  Email: string;
  CPI: number;
  ProgramDepartmentID: number;
  SecondaryProgramDepartmentID: number;
  Resume: string;
  StatusName: string;
  Frozen: boolean;
}

const instance = axios.create({
  baseURL: COMPANY_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const companySideApplicantsRequest = {
  get: (token: string, rcid: string, pid: string) =>
    instance
      .get<ApplicantsCompanySide[]>(
        `/application/rc/${rcid}/proforma/${pid}/students`,
        setConfig(token)
      )
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in getting applicants",
          err.response?.data?.error || err.message
        );
      }),
};

export default companySideApplicantsRequest;
