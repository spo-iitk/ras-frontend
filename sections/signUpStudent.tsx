import { Alert, Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { otp } from "@callbacks/auth";
import Snackbar from "@mui/material/Snackbar";
import SignUpRollNoSection from "./signUpRollNoSection";

type inputType1 = {
  name: string;
  user_id: string;
};

function SignUpStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<inputType1>();

  const [emailOtpStatus, setEmailOtpStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleEmailOtpStatus = async (data: inputType1) => {
    setLoading(true);
    const response = await otp(data.user_id);
    if (response.Status === 200) {
      setEmailOtpStatus(true);
      setOpen(true);
      setInfo({ ...data, ...info });
    } else {
      setFail(true);
    }
    setLoading(false);
  };

  const handleFail = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setFail(false);
  };

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            disabled={emailOtpStatus}
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="user_id"
            label="IITK Email Id"
            variant="outlined"
            disabled={emailOtpStatus}
            {...register("user_id", {
              required: true,
              pattern: /^[^@]+@iitk\.ac\.in$/,
            })}
            error={!!errors.user_id}
            helperText={errors.user_id ? "Invalid IITK Email Id" : ""}
          />
        </FormControl>
        {!emailOtpStatus && (
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleEmailOtpStatus)}
            >
              Next
            </LoadingButton>
          </FormControl>
        )}
        <Collapse in={emailOtpStatus}>
          <SignUpRollNoSection
            info={info}
            setInfo={setInfo}
            resetFirst={reset}
            setEmailOtpStatus={setEmailOtpStatus}
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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={fail}
          autoHideDuration={6000}
          onClose={handleFail}
        >
          <Alert
            severity="error"
            sx={{ minWidth: "330px" }}
            onClose={handleFail}
          >
            Failed to send OTP. Please try again.
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default SignUpStudent;
