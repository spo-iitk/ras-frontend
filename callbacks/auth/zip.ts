import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import { CDN_URL, ErrorType, SERVER_ERROR } from "../constants";

export interface ZipParams {
  files: string[];
  rid: string;
  outfile: string;
}

export interface ZipResponse {
  filename: string;
  message: string;
}

const zipInstance = axios.create({
  baseURL: CDN_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const zip = {
  post: (req: ZipParams) =>
    zipInstance
      .post<ZipResponse, AxiosResponse<ZipResponse, ZipParams>>("/zip", req)
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification(
          "Cannot Zip Files",
          err.response?.data?.error || err.message
        );
        return { filename: "", message: "" } as ZipResponse;
      }),
};

export default zip;
