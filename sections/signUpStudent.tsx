import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
  FormHelperText,
  Collapse,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type inputType1 = {
  name: string;
  user_id: string;
};

type inputType2 = {
  rollno: string;
  email_otp: string;
};

type inputType3 = {
  password: string;
  roll_no_otp: string;
  confirmPassword: string;
};

function SignUpStudent() {
  const {
    register: registerFirst,
    handleSubmit: handleNextFirst,
    formState: { errors: errorsFirst },
    // reset: resetFirst,
  } = useForm<inputType1>();

  const {
    register: registerSecond,
    handleSubmit: handleNextSecond,
    formState: { errors: errorsSecond },
    // reset: resetFirst,
  } = useForm<inputType2>();

  const {
    register: registerThird,
    handleSubmit,
    formState: { errors: errorsThird },
    getValues: getValuesThird,
  } = useForm<inputType3>();
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [open, setOpen] = useState(false);
  const [emailOtpStatus, setEmailOtpStatus] = useState(false);
  const [rollnoOtpStatus, setRollnoOtpStatus] = useState(false);
  const [info, setInfo] = useState({});

  const handleClose = () => setOpen(false);

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

  const handleEmailOtpStatus = (data: inputType1) => {
    setEmailOtpStatus(true);
    setInfo({ ...data, ...info });
  };
  const handleRollnoOtpStatus = (data: inputType2) => {
    setRollnoOtpStatus(true);
    setInfo({ ...data, ...info });
  };
  const handleSignUp = (data: inputType3) => {
    setInfo({ ...data, ...info });
    setOpen(true);
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
            {...registerFirst("name", { required: true })}
            error={!!errorsFirst.name}
            helperText={errorsFirst.name ? "Name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="user_id"
            label="IITK Email Id"
            variant="outlined"
            disabled={emailOtpStatus}
            {...registerFirst("user_id", {
              required: true,
              pattern: /^[^@]+@iitk\.ac\.in$/,
            })}
            error={!!errorsFirst.user_id}
            helperText={errorsFirst.user_id ? "Invalid IITK Email Id" : ""}
          />
        </FormControl>
        {!emailOtpStatus && (
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextFirst(handleEmailOtpStatus)}
            >
              Next
            </Button>
          </FormControl>
        )}
        <Collapse in={emailOtpStatus}>
          <Stack>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
              <TextField
                id="userOTP"
                label="OTP"
                variant="outlined"
                {...registerSecond("email_otp", {
                  required: true,
                })}
                disabled={rollnoOtpStatus}
                error={!!errorsSecond.email_otp}
                helperText={errorsSecond.email_otp ? "OTP is required!" : ""}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
              <TextField
                id="rollNo"
                label="Roll Number"
                variant="outlined"
                type="number"
                {...registerSecond("rollno", {
                  required: true,
                  minLength: 6,
                  maxLength: 8,
                })}
                disabled={rollnoOtpStatus}
                error={!!errorsSecond.rollno}
                helperText={
                  errorsSecond.rollno ? "Valid Roll No. is required!" : ""
                }
              />
            </FormControl>
            {!rollnoOtpStatus && (
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextSecond(handleRollnoOtpStatus)}
                >
                  Next
                </Button>
              </FormControl>
            )}
            <Collapse in={rollnoOtpStatus}>
              <Stack>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <TextField
                    id="rollnoOTP"
                    label="OTP"
                    variant="outlined"
                    {...registerThird("roll_no_otp", {
                      required: true,
                    })}
                    error={!!errorsThird.roll_no_otp}
                    helperText={
                      errorsThird.roll_no_otp ? "OTP is required!" : ""
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={!!errorsThird.password}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    error={!!errorsThird.password}
                    type={values.showPassword ? "text" : "password"}
                    {...registerThird("password", { required: true })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("password")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errorsThird.password && (
                    <FormHelperText error={!!errorsThird.password}>
                      Incorrect password
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={!!errorsThird.confirmPassword}
                  >
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    error={!!errorsThird.confirmPassword}
                    type={values.showConfirmPassword ? "text" : "password"}
                    {...registerThird("confirmPassword", {
                      required: true,
                      validate: {
                        sameAsPassword: (value) =>
                          value === getValuesThird("password"),
                      },
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            handleClickShowPassword("confirmPassword")
                          }
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
                  {errorsThird.confirmPassword && (
                    <FormHelperText error={!!errorsThird.confirmPassword}>
                      Passowords don't match
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <Button
                    variant="contained"
                    onClick={handleSubmit(handleSignUp)}
                  >
                    Sign Up
                  </Button>
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
            </Collapse>
          </Stack>
        </Collapse>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registration Successful!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have successfully registered for the IIT Kanpur Recruitment
            Portal.
          </Typography>
          <Typography>
            Contact your Student Coordinator for your login credentials.
          </Typography>
          <Typography>You will be redirected to the login page.</Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SignUpStudent;
