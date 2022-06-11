/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from "axios";
import AUTH_URL from "./constants";

type login_params = {
  user_id: string;
  password: string;
  remember_me: boolean;
};
type signup_params = {
  user_id: string;
  password: string;
  name: string;
  otp: string;
  roll_no: string;
};

export const login = async (data: login_params) => {
  console.log(data);
  axios
    .post(`${AUTH_URL}/login`, { params: data })
    .then((res) => console.log(res.data?.status))
    .catch((err) => console.log(err));
};

export const signup = async (data: signup_params) => {
  console.log(data);
  axios
    .post(`${AUTH_URL}/signup`, { params: data })
    .then((res) => console.log(res.data?.status))
    .catch((err) => console.log(err));
};

export const otp = async (user_id: string) => {
  await axios
    .post(`${AUTH_URL}/otp`, { user_id })
    .then((res) => console.log(res.data?.status))
    .catch((err) => console.log(err));
};
export default { login, signup, otp };
