import React, { useEffect } from "react";
import {
  TextField,
  Typography,
  Stack,
  FormControl,
  Button,
} from "@mui/material";
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

type formInput = {
  companyname: string;
  name: string;
  designation: string;
  email: string;
  contact: string;
};

function SignUpRecruiter() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<formInput>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data: formInput) => {
    console.log(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        companyname: "",
        name: "",
        designation: "",
        email: "",
        contact: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="companyName"
            label="Company Name"
            variant="outlined"
            {...register("companyname", { required: true })}
            error={!!errors.companyname}
            helperText={errors.companyname ? "Company name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="Name"
            label="Name"
            variant="outlined"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="Designation"
            label="Designation"
            variant="outlined"
            {...register("designation", { required: true })}
            error={!!errors.designation}
            helperText={errors.designation ? "Designation is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="Email Id"
            label="Email Id"
            variant="outlined"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            error={!!errors.email}
            helperText={errors.email ? "Valid Email Id is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="Contact Number"
            label="Contact Number"
            variant="outlined"
            type="tel"
            {...register("contact", { required: true, pattern: /^[0-9]{10}$/ })}
            error={!!errors.contact}
            helperText={
              errors.contact ? "Valid Contact Number is required!" : ""
            }
          />
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
        </Box>
      </Modal>
    </div>
  );
}

export default SignUpRecruiter;
