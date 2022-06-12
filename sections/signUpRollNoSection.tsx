import { Alert, Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { otp } from "@callbacks/auth";
import Snackbar from "@mui/material/Snackbar";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<inputType2>();

  const [rollnoOtpStatus, setRollnoOtpStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRollnoOtpStatus = async (data: inputType2) => {
    setLoading(true);
    await otp(data.roll_no);
    setOpen(true);
    setLoading(false);
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
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleRollnoOtpStatus)}
          >
            Next
          </LoadingButton>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          sx={{ minWidth: "330px" }}
          onClose={handleClose}
        >
          OTP sent
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default SignUpRollNoSection;
