import axios from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";

export interface CompanyRC {
  company_id: number;
  company_name: string;
  recruitment_cycle_id: number;
  hr1: string;
  hr2: string;
  hr3: string;
  comments: string;
}
const adminCompanyInstance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const addCompanyRequestRC = {
  get: (token: string, rcid: string, cid: string) =>
    adminCompanyInstance
      .get<CompanyRC>(`/${rcid}/company/${cid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );
        return {} as CompanyRC;
      }),
};

export default addCompanyRequestRC;

// get compnay, edit company, bulk add company
// delete
