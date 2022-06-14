export const BASE_URL = "https://placement.iitk.ac.in";

export const AUTH_URL = `${BASE_URL}/api/auth`;
export const RAS_URL = `${BASE_URL}/api/ras`;

export const STUDENT_URL = `${BASE_URL}/api/student`;
export const COMPANY_URL = `${BASE_URL}/api/company`;

export const ADMIN_RC_URL = `${BASE_URL}/api/admin/rc`;
export const ADMIN_STUDENT_URL = `${BASE_URL}/api/admin/student`;
export const ADMIN_COMPANY_URL = `${BASE_URL}/api/admin/company`;
export const ADMIN_APPLICATION_URL = `${BASE_URL}/api/admin/application`;

export const SERVER_ERROR = "Aw, Snap! Server maybe down.";

export interface ErrorResponse {
  error: string;
}

export interface StatusResponse {
  status: string;
}

export const setConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
