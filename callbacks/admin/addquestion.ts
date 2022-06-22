import axios, { AxiosResponse } from "axios";
import router from "next/router";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "@callbacks/constants";
import { errorNotification, successNotification } from "@callbacks/notifcation";

export interface QuestionType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  type: string;
  question: string;
  recruitment_cycle_id: number;
  mandatory: boolean;
  options: string;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const UpdateQuestion = {
  get: (token: string, rcid: string) =>
    instance
      .get<QuestionType[]>(`/${rcid}/student/questions`, setConfig(token))
      .then(responseBody)
      .catch((error: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          error.response?.data.error || error.message
        );
        return [] as QuestionType[];
      }),
  post: (body: QuestionType, token: string, rcid: string) =>
    instance
      .post<QuestionType>(`/${rcid}/student/question`, body, setConfig(token))
      .then(responseBody)
      .then((res) => {
        successNotification("Successfully added", `Created with id: ${res.ID}`);
        return true;
      })
      .catch((error) => {
        errorNotification("Error", error.response?.data.error || error.message);
        return false;
      }),
  deleteQues: (token: string, rcid: string, qid: string) => {
    instance
      .delete(`/${rcid}/student/question/${qid}`, setConfig(token))
      .then((res) => {
        successNotification(`Question ${qid} deleted`, res.data.status);
        router.push(`/admin/rc/${rcid}/question`);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          `Error in deleting question ${qid}`,
          err.response?.data?.error || err.message
        );
        return false;
      });
  },
};

export default UpdateQuestion;
