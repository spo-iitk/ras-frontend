import { Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { otp } from "@callbacks/auth";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { showNotification } from "@mantine/notifications";
import SignUpPasswordSection from "./signUpPasswordSection";

type inputType2 = {
  roll_no: string;
  user_otp: string;
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

  const handleRollnoOtpStatus = async (data: inputType2) => {
    setLoading(true);
    const response = await otp(`${data.roll_no}@iitk.ac.in`);
    if (response.Status === 200) {
      setRollnoOtpStatus(true);
      setInfo({ ...data, ...info });
      showNotification({
        title: "OTP Sent!",
        message:
          "An OTP has ben sent to your IITK email <your-rollNo>@iitk.ac.in!",
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
    <Stack>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <TextField
          id="userOTP"
          label="OTP"
          variant="outlined"
          {...register("user_otp", {
            required: true,
          })}
          disabled={rollnoOtpStatus}
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
    </Stack>
  );
}

export default SignUpRollNoSection;
