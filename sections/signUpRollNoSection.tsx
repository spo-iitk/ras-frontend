import { Button, Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SignUpPasswordSection from "./signUpPasswordSection";

type inputType2 = {
  roll_no: string;
  email_otp: string;
};

function SignUpRollNoSection({
  info,
  setInfo,
  resetFirst,
  setEmailOtpStatus,
}: any) {
  const [rollnoOtpStatus, setRollnoOtpStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<inputType2>();

  const handleRollnoOtpStatus = (data: inputType2) => {
    setRollnoOtpStatus(true);
    setInfo({ ...data, ...info });
  };
  return (
    <Stack>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="userOTP"
          label="OTP"
          variant="outlined"
          {...register("email_otp", {
            required: true,
          })}
          disabled={rollnoOtpStatus}
          error={!!errors.email_otp}
          helperText={errors.email_otp ? "OTP is required!" : ""}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="rollNo"
          label="Roll Number"
          variant="outlined"
          type="number"
          {...register("roll_no", {
            required: true,
            minLength: 6,
            maxLength: 8,
          })}
          disabled={rollnoOtpStatus}
          error={!!errors.roll_no}
          helperText={errors.roll_no ? "Valid Roll No. is required!" : ""}
        />
      </FormControl>
      {!rollnoOtpStatus && (
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleRollnoOtpStatus)}
          >
            Next
          </Button>
        </FormControl>
      )}
      <Collapse in={rollnoOtpStatus}>
        <SignUpPasswordSection
          info={info}
          setInfo={setInfo}
          resetSecond={reset}
          resetFirst={resetFirst}
          setEmailOtpStatus={setEmailOtpStatus}
          setRollnoOtpStatus={setRollnoOtpStatus}
        />
      </Collapse>
    </Stack>
  );
}

export default SignUpRollNoSection;
