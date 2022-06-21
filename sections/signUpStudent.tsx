import LoadingButton from "@mui/lab/LoadingButton";
import {
  CircularProgress,
  Collapse,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Link from "next/link";

import { SignUpStudentParams } from "@callbacks/auth/signupStudent";
import otpRequest, { OTPParams } from "@callbacks/auth/otp";
import theme from "@components/theme/theme";

const SignUpRollNoSection = dynamic(() => import("./signUpRollNoSection"), {
  suspense: true,
});

function SignUpStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SignUpStudentParams>();

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<OTPParams>();

  const [emailStatus, setEmailStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailOtpSubmit = async (data: OTPParams) => {
    setValue("user_id", data.user_id);
    setLoading(true);
    const response = await otpRequest.post(data);
    setEmailStatus(response);
    setLoading(false);
  };

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            disabled={emailStatus}
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required!" : ""}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="user_id"
            label="IITK Email ID"
            variant="outlined"
            disabled={emailStatus}
            {...registerOTP("user_id", {
              required: true,
              pattern: /^[^@]+@iitk\.ac\.in$/,
            })}
            error={!!errorsOTP.user_id}
            helperText={errorsOTP.user_id ? "Invalid IITK Email ID" : ""}
          />
        </FormControl>

        {!emailStatus && (
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              onClick={handleSubmitOTP(handleEmailOtpSubmit)}
            >
              Next
            </LoadingButton>
          </FormControl>
        )}

        <Collapse in={emailStatus}>
          <Suspense fallback={<CircularProgress />}>
            <SignUpRollNoSection
              register={register}
              handleSubmit={handleSubmit}
              setValue={setValue}
              errors={errors}
              getValues={getValues}
            />
          </Suspense>
        </Collapse>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <Typography>
            Already have an account?{" "}
            <span style={{ color: theme.palette.secondary.main }}>
              <Link href="/login">Sign In</Link>
            </span>
          </Typography>
        </FormControl>
      </Stack>
    </div>
  );
}

export default SignUpStudent;
