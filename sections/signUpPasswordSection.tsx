/* eslint-disable camelcase */
import { signupStudent } from "@callbacks/auth";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type inputType3 = {
  password: string;
  roll_no_otp: string;
  confirmPassword: string;
};

function SignUpPasswordSection({
  info,
  setInfo,
  resetFirst,
  resetSecond,
  setEmailOtpStatus,
  setRollnoOtpStatus,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<inputType3>();

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (data: inputType3) => {
    const user_info = { ...data, ...info };
    setInfo(user_info);
    setLoading(true);
    const response = await signupStudent(user_info);
    if (response.Status === 200) {
      resetFirst({
        name: "",
        user_id: "",
      });
      resetSecond({
        email_otp: "",
        roll_no: "",
      });
      reset({
        password: "",
        confirmPassword: "",
        roll_no_otp: "",
      });
      setEmailOtpStatus(false);
      setRollnoOtpStatus(false);
    }
    setLoading(false);
  };

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
    <Stack>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="rollnoOTP"
          label="OTP"
          variant="outlined"
          {...register("roll_no_otp", {
            required: true,
          })}
          error={!!errors.roll_no_otp}
          helperText={errors.roll_no_otp ? "OTP is required!" : ""}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={!!errors.password}
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          error={!!errors.password}
          type={values.showPassword ? "text" : "password"}
          {...register("password", { required: true })}
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
        {errors.password && (
          <FormHelperText error={!!errors.password}>
            Incorrect password
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={!!errors.confirmPassword}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="confirmPassword"
          error={!!errors.confirmPassword}
          type={values.showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: true,
            validate: {
              sameAsPassword: (value) => value === getValues("password"),
            },
          })}
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
        {errors.confirmPassword && (
          <FormHelperText error={!!errors.confirmPassword}>
            Passowords don't match
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit(handleSignUp)}
        >
          Sign Up
        </LoadingButton>
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <Typography>
          Already have an account?{" "}
          <span style={{ color: "blue" }}>
            <Link href="/login">Sign In</Link>
          </span>
        </Typography>
      </FormControl>
    </Stack>
  );
}

export default SignUpPasswordSection;
