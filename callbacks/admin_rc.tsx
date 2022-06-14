/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from "axios";
import { ADMIN_RC_URL } from "./constants";

export interface NewRCParams {
    academic_year: string;
    Type: string;
    phase: string;
    application_count_cap:number;
}
interface Response {
  Payload: any;
  Status: any;
  Message: any;
  Token?: any;
}

axios.defaults.withCredentials = true

const submit = async (data: NewRCParams): Promise<Response> => {
  console.log(data);
  let payload;
  let status;
  let message;
  await axios
    .post(`${ADMIN_RC_URL}/new`, data)
    .then((res) => {
      payload = res.data;
      status = res?.status;
      message = res?.data?.status;
    })
    .catch((err) => {
      payload = err?.response?.data?.error;
      status = err?.response?.status;
      message = err?.response?.status;
    });

  const response: Response = {
    Payload: payload,
    Status: status,
    Message: message,
  };

  return response;
};

export { submit };
export type { Response };
