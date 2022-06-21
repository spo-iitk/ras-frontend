import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  ADMIN_APPLICATION_URL,
  ErrorType,
  SERVER_ERROR,
  setConfig,
} from "../../constants";

export interface PPOParams {
  cid: number;
  emails: string[];
}
export interface PPOResponse {
  emails: string;
}
const instance = axios.create({
  baseURL: ADMIN_APPLICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const PioPPO = {
  post: (token: string, rcid: string, body: PPOParams) =>
    instance
      .post(`rc/${rcid}/pio-ppo`, body, setConfig(token))
      .then(responseBody)
      .then(() => {
        successNotification("PPO/PIO added successfully", "");
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification(
          "Error in adding PPO/PIO",
          err?.response?.data?.error || err.message
        );
      }),
};

export default PioPPO;
