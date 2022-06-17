import { Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  FieldError,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { SignUpStudentParams } from "@callbacks/auth/signupStudent";
import otpRequest, { OTPParams } from "@callbacks/auth/otp";

import SignUpPasswordSection from "./signUpPasswordSection";

interface Error {
  user_id?: FieldError | undefined;
  password?: FieldError | undefined;
  name?: FieldError | undefined;
  roll_no?: FieldError | undefined;
  user_otp?: FieldError | undefined;
  roll_no_otp?: FieldError | undefined;
}

interface Params {
  register: UseFormRegister<SignUpStudentParams>;
  handleSubmit: UseFormHandleSubmit<SignUpStudentParams>;
  setValue: UseFormSetValue<SignUpStudentParams>;
  errors: Error;
  getValues: UseFormGetValues<SignUpStudentParams>;
}

function SignUpRollNoSection({
  register,
  handleSubmit,
  setValue,
  errors,
  getValues,
}: Params) {
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm<OTPParams>();

  const [rollnoStatus, setRollnoStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRollnoOtpSubmit = async (data: OTPParams) => {
    setLoading(true);
    const response = await otpRequest.post(data);
    setRollnoStatus(response);
    setLoading(false);
  };

  return (
    <Stack>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="userOTP"
          label="OTP"
          variant="outlined"
          {...register("user_otp", {
            required: true,
          })}
          disabled={rollnoStatus}
          error={!!errors.user_otp}
          helperText={errors.user_otp ? "OTP is required!" : ""}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="rollNo"
          label="Roll Number"
          variant="outlined"
          type="number"
          {...registerOTP("user_id", {
            required: true,
            minLength: 6,
            maxLength: 8,
            setValueAs: (value: string) => {
              setValue("roll_no", value);
              return `${value}@iitk.ac.in`;
            },
          })}
          disabled={rollnoStatus}
          error={!!errorsOTP.user_id}
          helperText={errorsOTP.user_id ? "Valid Roll No. is required!" : ""}
        />
      </FormControl>

      {!rollnoStatus && (
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            onClick={handleSubmitOTP(handleRollnoOtpSubmit)}
          >
            Next
          </LoadingButton>
        </FormControl>
      )}
      <Collapse in={rollnoStatus}>
        <SignUpPasswordSection
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          getValues={getValues}
        />
      </Collapse>
    </Stack>
  );
}

export default SignUpRollNoSection;
