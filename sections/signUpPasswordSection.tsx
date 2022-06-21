import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import {
  FieldError,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { useRouter } from "next/router";

import studentSignUpRequest, {
  SignUpStudentParams,
} from "@callbacks/auth/signupStudent";

interface Error {
  user_id?: FieldError | undefined;
  password?: FieldError | undefined;
  name?: FieldError | undefined;
  roll_no?: FieldError | undefined;
  user_otp?: FieldError | undefined;
  roll_no_otp?: FieldError | undefined;
  confirm_password?: FieldError | undefined;
}

interface Params {
  register: UseFormRegister<SignUpStudentParams>;
  handleSubmit: UseFormHandleSubmit<SignUpStudentParams>;
  errors: Error;
  getValues: UseFormGetValues<SignUpStudentParams>;
}

function SignUpPasswordSection({
  register,
  handleSubmit,
  errors,
  getValues,
}: Params) {
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (data: SignUpStudentParams) => {
    setLoading(true);
    const response = await studentSignUpRequest.post(data);
    if (response) {
      router.push("/login");
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
        <Typography variant="caption" sx={{ color: "#777" }}>
          Another OTP has been sent to your <b>&lt;roll_no&gt;@iitk.ac.in</b>,{" "}
          which is <b>not</b> same as before, to verify your Roll Number.
        </Typography>
        <TextField
          id="rollnoOTP"
          label="OTP"
          variant="outlined"
          {...register("roll_no_otp", {
            required: true,
            validate: {
              sameAsUserOTP: (value) => value !== getValues("user_otp"),
            },
          })}
          error={!!errors.roll_no_otp}
          helperText={
            errors.roll_no_otp
              ? "OTP is required and is not same as before!"
              : ""
          }
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
          error={!!errors.confirm_password}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="confirmPassword"
          error={!!errors.confirm_password}
          type={values.showConfirmPassword ? "text" : "password"}
          {...register("confirm_password", {
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
        {errors.confirm_password && (
          <FormHelperText error={!!errors.confirm_password}>
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
