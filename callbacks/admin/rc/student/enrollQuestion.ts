import axios, { AxiosResponse } from "axios";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";
import { studentEnrollResponse } from "@callbacks/student/rc/enrollQuestion";

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const enrollQuestion = {
  getStudentQuestions: (token: string, rcid: string) =>
    instance
      .get(`/${rcid}/student/questions`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as studentEnrollResponse[];
      }),
  getStudentAnswers: (token: string, rcid: string, sid: string) =>
    instance
      .get(`/${rcid}/student/${sid}/question/answers`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as studentEnrollResponse[];
      }),
};

export default enrollQuestion;
