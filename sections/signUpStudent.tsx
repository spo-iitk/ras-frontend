import { otp } from "@callbacks/auth";
import { showNotification } from "@mantine/notifications";
import LoadingButton from "@mui/lab/LoadingButton";
import { Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
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

  const handleEmailOtpStatus = async (data: inputType1) => {
    setLoading(true);
    const response = await otp(data.user_id);
    if (response.Status === 200) {
      setEmailOtpStatus(true);
      setInfo({ ...data, ...info });
      showNotification({
        title: "OTP Sent!",
        message: "An OTP has ben sent to your IITK email!",
        color: "green",
        icon: <CheckIcon />,
      });
    } else {
      showNotification({
        title: "Error!",
        message: "Failed to send OTP to your mail!",
        color: "red",
        icon: <CloseIcon />,
      });
    }
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
      </Stack>
    </div>
  );
}

export default SignUpStudent;
