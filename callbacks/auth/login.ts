import { AxiosResponse } from "axios";

import authInstance from ".";
import { ErrorType, responseBody } from "../constants";
import { errorNotification } from "../notifcation";

export interface LoginParams {
  user_id: string;
  password: string;
  remember_me: boolean;
}

export interface LoginResponse {
  token: string;
  role_id: number;
  user_id: string;
}

const loginRequest = {
  post: (body: LoginParams) =>
    authInstance
      .post<
        LoginResponse,
        AxiosResponse<LoginResponse, LoginParams>,
        LoginParams
      >("/login", body)
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Login Failed", err.response?.data?.error);
        return { user_id: "", token: "", role_id: 0 } as LoginResponse;
      }),
};

export default loginRequest;
