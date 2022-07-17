import axios, { AxiosResponse } from "axios";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface studentApplicationQuestions {
  ID: number;
  proforma_id: number;
  type: string;
  question: string;
  options: string;
  answer: string;
}

export interface answerApplication {
  application_question_id: number;
  answer: string;
}

export interface studentApplicationResponse {
  resume_id: number;
  answers: answerApplication[];
}
const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const applicationRequest = {
  getApplicationQuestion: (token: string, rcid: string, pid: string) =>
    instance
      .get(`/application/rc/${rcid}/opening/${pid}`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as studentApplicationQuestions[];
      }),
  postApplicationAnswer: (
    token: string,
    rcid: string,
    pid: string,
    answer: studentApplicationResponse
  ) =>
    instance
      .post(`/application/rc/${rcid}/opening/${pid}`, answer, setConfig(token))
      .then((res) => {
        successNotification(`Questions  answered!`, res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          `Failed to answer!`,
          err.response?.data?.error || err.message
        );
        return false;
      }),
};

export default applicationRequest;
