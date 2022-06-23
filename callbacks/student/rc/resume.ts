import axios, { AxiosResponse } from "axios";

import { errorNotification, successNotification } from "@callbacks/notifcation";

import {
  CDN_URL,
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  StatusResponse,
  responseBody,
  setConfig,
} from "../../constants";

const cdn_instance = axios.create({
  baseURL: CDN_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});
export interface ResumeResponse {
  message: string;
  filename: string;
}

export interface ResumeBackendParams {
  resume: string;
}

export interface AllStudentResumeResponse {
  resumes: string[];
}

const resumeRequest = {
  post: (body: FormData, token: string, rid: string) =>
    cdn_instance
      .post<ResumeResponse, AxiosResponse<ResumeResponse, FormData>, FormData>(
        "/upload",
        body,
        {
          headers: {
            token,
            rid,
          },
        }
      )
      .then(
        // second api call to backend instance
        (response: AxiosResponse<ResumeResponse>) =>
          instance
            .post<
              StatusResponse,
              AxiosResponse<ResumeResponse, ResumeBackendParams>,
              ResumeBackendParams
            >(
              `/rc/${rid}/resume`,
              {
                resume: response.data.filename,
              },
              setConfig(token)
            )
            .then(() => {
              successNotification("Success", "Resume uploaded");
              return responseBody;
            })
            .catch((err: ErrorType) => {
              errorNotification(
                "Error",
                err.response?.data?.error || err.message
              );
              return { status: "error" } as StatusResponse;
            })
      )
      .catch((err: ErrorType) => {
        errorNotification("Upload Failed", err.response?.data?.error);
        return { message: "", filename: "" } as ResumeResponse;
      }),

  get: (token: string, rid: string) =>
    instance
      .get<AllStudentResumeResponse>(`/rc/${rid}/resume`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return { resumes: [] } as AllStudentResumeResponse;
      }),
};

export default resumeRequest;
