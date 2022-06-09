import React, { useState } from "react";
import Meta from "@components/Meta";
import {
  Stack,
  FormControl,
  TextField,
  Typography,
  Button,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

// interface State {
//   showPassword: boolean;
//   password: string;
//   confirmPassword: string;
//   showConfirmPassword: boolean;
// }

type formInput = {
  email: string;
};

type formPass = {
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
};
function ForgotPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();

  const {
    register: registerNew,
    handleSubmit: handleNew,
    formState: { errors: errorsNew },
    getValues: getValuesNew,
  } = useForm<formPass>();

  const [sent, setSent] = useState(false);

  const handleSent = (data: formInput) => {
    setSent(true);
    console.log(data);
  };

  const handleVerify = (data: formPass) => {
    console.log(data);
  };

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

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
    <div>
      <Meta title="Forgot Password - Recruitment Automation System" />
      {sent ? (
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h2>Verify Account</h2>
            <Typography variant="subtitle1" color="text.secondary">
              OTP has been sent to registered email Id
            </Typography>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField
              id="otp"
              label="OTP"
              variant="outlined"
              type="number"
              {...registerNew("otp", {
                required: true,
                value: "",
              })}
              error={!!errorsNew.otp}
              helperText={errorsNew.otp && "Enter valid IITK email Id"}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errorsNew.newPassword}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              {...registerNew("newPassword", { required: true })}
              error={!!errorsNew.newPassword}
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
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errorsNew.confirmNewPassword}
            >
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              {...registerNew("confirmNewPassword", {
                required: true,
                validate: {
                  sameAsPassword: (value) =>
                    value === getValuesNew("newPassword"),
                },
              })}
              error={!!errorsNew.confirmNewPassword}
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
            {errorsNew.confirmNewPassword && (
              <FormHelperText error={!!errorsNew.confirmNewPassword}>
                Passwords don't match
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Button variant="contained" onClick={handleNew(handleVerify)}>
              Confirm
            </Button>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Typography>
              Facing any issues?{" "}
              <span style={{ color: "blue" }}>
                <a
                  href="https://spo.iitk.ac.in/about_us.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </span>
            </Typography>
          </FormControl>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h2>Forgot Password</h2>
            <Typography variant="subtitle1" color="text.secondary">
              Recruitment Portal IIT Kanpur
            </Typography>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField
              id="email"
              label="Registered Email"
              variant="outlined"
              {...register("email", {
                required: true,
                pattern: /^[^@]+@iitk\.ac\.in$/,
              })}
              error={!!errors.email}
              helperText={errors.email && "Enter valid IITK email Id"}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Button variant="contained" onClick={handleSubmit(handleSent)}>
              Send Verification Code
            </Button>
          </FormControl>
        </Stack>
      )}
    </div>
  );
}

ForgotPass.layout = "Navigation";
export default ForgotPass;
