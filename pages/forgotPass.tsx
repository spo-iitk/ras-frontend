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
import { otp, forgotPass } from "@callbacks/auth";
import { useRouter } from "next/router";

// interface State {
//   showPassword: boolean;
//   password: string;
//   confirmPassword: string;
//   showConfirmPassword: boolean;
// }

type formInput = {
  user_id: string;
};

type formPass = {
  otp: string;
  new_password: string;
  confirm_newPassword: string;
};
function ForgotPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formInput>();

  const {
    register: registerNew,
    handleSubmit: handleNew,
    formState: { errors: errorsNew },
    getValues: getValuesNew,
    reset: resetNew,
  } = useForm<formPass>();

  const ROUTE = "/login";
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [uid, setUid] = useState({ user_id: "" });
  const handleSent = async (data: formInput) => {
    setUid({ ...uid, ...data });
    // setLoading(true);
    const response = await otp(data.user_id);
    if (response.Status === 200) {
      reset({
        user_id: "",
      });
      setSent(true);
    }
    // setLoading(false);
    console.log(data);
  };
  const handleVerify = async (data: formPass) => {
    const newInfo = { ...data, ...uid };
    const response = await forgotPass(newInfo);
    console.log(response);
    if (response.Status === 200) {
      resetNew({
        new_password: "",
        otp: "",
        confirm_newPassword: "",
      });
      router.push({
        pathname: ROUTE,
      });

      // setSent(true);
    }
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
              error={!!errorsNew.new_password}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              {...registerNew("new_password", {
                required: true,
                minLength: {
                  value: 8,
                  message:
                    "Use 8 or more characters with a mix of letters, numbers & symbols",
                },
              })}
              error={!!errorsNew.new_password}
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
            {errorsNew.new_password && (
              <FormHelperText error={!!errorsNew.new_password}>
                {errorsNew.new_password.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errorsNew.confirm_newPassword}
            >
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              {...registerNew("confirm_newPassword", {
                required: true,
                validate: {
                  sameAsPassword: (value) =>
                    value === getValuesNew("new_password"),
                },
              })}
              error={!!errorsNew.confirm_newPassword}
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
            {errorsNew.confirm_newPassword && (
              <FormHelperText error={!!errorsNew.confirm_newPassword}>
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
              {...register("user_id", {
                required: true,
                pattern: /^[^@]+@iitk\.ac\.in$/,
              })}
              error={!!errors.user_id}
              helperText={errors.user_id && "Enter valid IITK email Id"}
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
// function reset(arg0: { user_id: string }) {
//   throw new Error("Function not implemented.");
// }

// function FinVerif(data: formPass) {
//   throw new Error("Function not implemented.");
// }
