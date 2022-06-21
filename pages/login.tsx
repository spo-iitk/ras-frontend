import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import formstyles from "@styles/Form.module.css";
import Meta from "@components/Meta";
import loginRequest, { LoginParams } from "@callbacks/auth/login";
import useStore from "@store/store";
import theme from "@components/theme/theme";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginParams>();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const { setToken, setRole } = useStore();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();
  const onLogin = async (data: LoginParams) => {
    setLoading(true);
    const response = await loginRequest.post(data);
    if (response.token !== "") {
      setToken(response.token);
      setRole(response.role_id);
      reset({
        user_id: "",
        password: "",
      });
      switch (response.role_id) {
        case 1:
          router.push("/student");
          break;
        case 2:
          router.push("/company");
          break;
        case 100:
          router.push("/admin");
          break;
        case 101:
          router.push("/admin");
          break;
        default:
          router.push("/401");
          break;
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Meta title="Login - Recruitment Automation System" />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <div className={formstyles.image}>
          <Image
            src="/images/signin.gif"
            height={550}
            width={500}
            alt="loginPage"
          />
        </div>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h1>Welcome Back!</h1>
            <h2>Sign in to</h2>
            <Typography variant="subtitle1" color="text.secondary">
              Recruitment Portal IIT Kanpur
            </Typography>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <TextField
              id="Email ID"
              label="Email ID"
              variant="outlined"
              error={!!errors.user_id}
              helperText={errors.user_id ? "Incorrect Email ID" : ""}
              {...register("user_id", {
                required: true,
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
              })}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="password" error={!!errors.password}>
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              error={!!errors.password}
              type={values.showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && (
              <FormHelperText error={!!errors.password}>
                Incorrect password
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "37ch" }} variant="outlined">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                <Checkbox
                  size="small"
                  {...register("remember_me")}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Remember Me
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <span style={{ color: theme.palette.secondary.main }}>
                  <Link href="/reset-password">Forgot password?</Link>
                </span>
              </Typography>
            </Stack>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={handleSubmit(onLogin)}
            >
              Sign In
            </LoadingButton>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Typography>
              Don&apos;t have an account?{" "}
              <span style={{ color: theme.palette.secondary.main }}>
                <Link href="/signup">Sign Up</Link>
              </span>
            </Typography>
          </FormControl>
        </Stack>
      </Stack>
    </div>
  );
}

Login.layout = "Navigation";
export default Login;
