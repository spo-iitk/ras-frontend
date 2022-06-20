import axios, { AxiosResponse } from "axios";

import { NoticeParams } from "@callbacks/admin/rc/notice";
import { errorNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "../../constants";

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const NoticeSReq = {
  getSAll: (token: string, rcid: string) =>
    instance
      .get<NoticeParams[]>(`/rc/${rcid}/notice`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in fetching data",
          err.response?.data?.error || err.message
        );

        return [] as NoticeParams[];
      }),
};

export default NoticeSReq;
