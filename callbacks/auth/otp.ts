import { AxiosResponse } from "axios";

import authInstance from ".";
import { ErrorType, StatusResponse } from "../constants";
import { errorNotification, pushNotification } from "../notifcation";

export interface OTPParams {
  user_id: string;
}

const otpRequest = {
  post: (body: OTPParams) =>
    authInstance
      .post<
        StatusResponse,
        AxiosResponse<StatusResponse, OTPParams>,
        OTPParams
      >("/otp", body)
      .then((res) => {
        pushNotification("OTP sent!", res.data.status);
        return true;
      })
      .catch((err: ErrorType) => {
        errorNotification("OTP request Failed", err.response?.data?.error);
        return false;
      }),
};

export default otpRequest;
