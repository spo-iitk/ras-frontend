import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  ADMIN_RC_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface NoticeParams {
  ID: number;
  recruitment_cycle_id: number;
  title: string;
  description: string;
  tags: string;
  attachment: string;
  created_by: string;
  CreatedAt: string;
  last_reminder_at: number;
}
export interface NoticeResponse {
  title: string;
  description: string;
  subject: string;
  tags: string;
  recruitment_cycle_id: number;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const noticeRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<NoticeParams[]>(`/${rcid}/notice`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );

        return [] as NoticeParams[];
      }),
  get: (token: string, rcid: string) =>
    instance
      .get<NoticeParams>(`/${rcid}/notice`, setConfig(token))
      .then(responseBody),
  post: (token: string, rcid: string, notice: NoticeResponse) =>
    instance
      .post<NoticeResponse>(`/${rcid}/notice`, notice, setConfig(token))
      .then(responseBody)
      .then(() => {
        successNotification("Notice created successfully", "");
        return true;
      })
      .catch((err) => {
        errorNotification(
          "Error in creating notice",
          err?.response.data.message || err.message
        );
      }),
  delete: (token: string, rcid: string, nid: string) =>
    instance
      .delete(`/${rcid}/notice/${nid}`, setConfig(token))
      .then(() => {
        successNotification("Notice deleted successfully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in deleting notice",
          err.response?.data?.error || err.message
        );
      }),
  notify: (token: string, rcid: string, nid: string) =>
    instance
      .post(`/${rcid}/notice/${nid}/reminder  `, {}, setConfig(token))
      .then(() => {
        successNotification("Notification sent successfully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in sending notification",
          err?.response?.data?.error || err.message
        );
      }),
};

export default noticeRequest;
