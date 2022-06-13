import axios from "axios";
import { ADMIN_RC_URL } from "./constants";

interface Response {
  Payload: any;
  Status: any;
  Message: any;
  Token?: any;
}

export const admin_getrc = async (): Promise<Response> => {
  let payload;
  let status;
  let message;
  await axios
    .get(`${ADMIN_RC_URL}/rc`)
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

export default { admin_getrc };
