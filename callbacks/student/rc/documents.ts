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
export interface DocumentResponse {
  message: string;
  filename: string;
}

export interface DocumentsBackendParams {
  path: string;
}

// eslint-disable-next-line no-unused-vars
interface nullBool {
  Bool: boolean;
  Valid: boolean;
}

export interface AllStudentDocumentsResponse {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  student_recruitment_cycle_id: number;
  recruitment_cycle_id: number;
  resume: string;
  verified: boolean;
  action_taken_by: string;
}

const documentRequest = {
  post: (body: FormData, token: string) =>
    cdn_instance
      .post<
        DocumentResponse,
        AxiosResponse<DocumentResponse, FormData>,
        FormData
      >("/upload", body, {
        headers: {
          token,
        },
      })
      .then(
        // second api call to backend instance
        (response: AxiosResponse<DocumentResponse>) =>
          instance
            .post<
              StatusResponse,
              AxiosResponse<DocumentResponse, DocumentsBackendParams>,
              DocumentsBackendParams
            >(
              `/document`,
              {
                path: response.data.filename,
              },
              setConfig(token)
            )
            .then(() => {
              successNotification("Success", "Documents uploaded");
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
        return { message: "", filename: "" } as DocumentResponse;
      }),

  get: (token: string) =>
    instance
      .get<AllStudentDocumentsResponse[]>(`/documents`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as AllStudentDocumentsResponse[];
      }),
};

export default documentRequest;
