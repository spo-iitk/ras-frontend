import axios from "axios";

import { AUTH_URL, SERVER_ERROR } from "../constants";

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

export default authInstance;
