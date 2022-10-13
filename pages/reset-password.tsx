import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import otpRequest, { OTPParams } from "@callbacks/auth/otp";
import resetPassRequest, { ResetPassParams } from "@callbacks/auth/resetpass";

function ForgotPass() {
  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    formState: { errors: errorsOTP },
    reset: resetOTP,
  } = useForm<OTPParams>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<ResetPassParams>();

  const router = useRouter();

  const [sent, setSent] = useState(false);
  const handleSendOTP = async (data: OTPParams) => {
    setValue("user_id", data.user_id);
    const response = await otpRequest.post(data);
    if (response) {
      resetOTP({
        user_id: "",
      });
      setSent(true);
    }
  };

  const handleResetPassword = async (data: ResetPassParams) => {
    const response = await resetPassRequest.post(data);
    if (response) {
      reset({
        user_id: "",
        new_password: "",
        otp: "",
        confirm_password: "",
      });
      router.push("/login");
    }
  };

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = (pass: string) => {
    if (pass === "password") {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    } else {
      setValues({
        ...values,
        showConfirmPassword: !values.showConfirmPassword,
      });
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Meta title="Forgot Password - Recruitment Automation System" />
      {sent ? (
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h2>Verify Account</h2>
            <Typography variant="subtitle1" color="text.secondary">
              OTP has been sent to registered email Id
            </Typography>
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField
              id="otp"
              label="OTP"
              variant="outlined"
              {...register("otp", {
                value: "",
                required: true,
                maxLength: 6,
                minLength: 6,
              })}
              error={!!errors.otp}
              helperText={errors.otp && "Enter valid 6 digit OTP"}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errors.new_password}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              {...register("new_password", {
                required: true,
                minLength: {
                  value: 8,
                  message:
                    "Use 8 or more characters with a mix of letters, numbers & symbols",
                },
              })}
              error={!!errors.new_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.new_password && (
              <FormHelperText error={!!errors.new_password}>
                {errors.new_password.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errors.confirm_password}
            >
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              {...register("confirm_password", {
                required: true,
                validate: {
                  sameAsPassword: (value: string) =>
                    value === getValues("new_password"),
                },
              })}
              error={!!errors.confirm_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {errors.confirm_password && (
              <FormHelperText error={!!errors.confirm_password}>
                Passwords don't match
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Button
              variant="contained"
              onClick={handleSubmit(handleResetPassword)}
            >
              Confirm
            </Button>
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Typography>
              Facing any issues?{" "}
              <span style={{ color: "blue" }}>
                <a
                  href="https://spo.iitk.ac.in/placement-coordinators"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </span>
            </Typography>
          </FormControl>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h2>Forgot Password</h2>
            <Typography variant="subtitle1" color="text.secondary">
              Recruitment Portal IIT Kanpur
            </Typography>
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField
              id="email"
              label="Registered Email"
              variant="outlined"
              {...registerOTP("user_id", {
                required: true,
                // pattern: /^[^@]+@iitk\.ac\.in$/,
              })}
              error={!!errorsOTP.user_id}
              helperText={errorsOTP.user_id && "Enter valid IITK email Id"}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Button
              variant="contained"
              onClick={handleOTPSubmit(handleSendOTP)}
            >
              Send Verification Code
            </Button>
          </FormControl>
        </Stack>
      )}
    </div>
  );
}

ForgotPass.layout = "Navigation";
export default ForgotPass;
