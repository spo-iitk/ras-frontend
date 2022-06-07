import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

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

type formInput = {
  firstname: string;
  lastname: string;
  email: string;
  rollno: string;
  password: string;
  confirmPassword: string;
};

function SignUpStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<formInput>();
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [open, setOpen] = React.useState(false);
  //   const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        rollno: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const handleOpen = (data: formInput) => {
    console.log(data);
    setOpen(true);
    // setTimeout(() => router.push("/login"), 5000);
  };
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
  return (
    <div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            {...register("firstname", { required: true })}
            error={!!errors.firstname}
            helperText={errors.firstname ? "First Name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            {...register("lastname", { required: true })}
            error={!!errors.lastname}
            helperText={errors.lastname ? "Last Name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="emailId"
            label="IITK Email Id"
            variant="outlined"
            {...register("email", {
              required: true,
              pattern: /^[^@]+@iitk\.ac\.in$/,
            })}
            error={!!errors.email}
            helperText={errors.email ? "Invalid IITK Email Id" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="rollNo"
            label="Roll Number"
            variant="outlined"
            type="number"
            {...register("rollno", {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
            error={!!errors.rollno}
            helperText={errors.rollno ? "Valid Roll No. is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={!!errors.password}
          >
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
          {errors.password && (
            <FormHelperText error={!!errors.password}>
              Incorrect password
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={!!errors.confirmPassword}
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirmPassword"
            error={!!errors.confirmPassword}
            type={values.showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: true,
              validate: {
                sameAsPassword: (value) => value === getValues("password"),
              },
            })}
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
          {errors.confirmPassword && (
            <FormHelperText error={!!errors.confirmPassword}>
              Passowords don't match
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <Button variant="contained" onClick={handleSubmit(handleOpen)}>
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
