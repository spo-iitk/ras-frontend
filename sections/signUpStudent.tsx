import { Button, Collapse, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

  const [info, setInfo] = useState({});

  const handleEmailOtpStatus = (data: inputType1) => {
    setEmailOtpStatus(true);
    setInfo({ ...data, ...info });
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleEmailOtpStatus)}
            >
              Next
            </Button>
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
