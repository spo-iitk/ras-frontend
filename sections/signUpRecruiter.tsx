import React, { useState } from "react";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

import companySignUpRequest, {
  SignUpCompanyParams,
} from "@callbacks/auth/signupCompany";
import theme from "@components/theme/theme";

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

function SignUpRecruiter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpCompanyParams>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = async (data: SignUpCompanyParams) => {
    setLoading(true);
    const response = await companySignUpRequest.post(data);
    if (response) {
      setOpen(true);
      reset({
        company_name: "",
        name: "",
        designation: "",
        email: "",
        phone: "",
      });
    }
    setLoading(false);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            id="company_name"
            label="Company Name"
            variant="outlined"
            {...register("company_name", { required: true })}
            error={!!errors.company_name}
            helperText={errors.company_name ? "Company name is required!" : ""}
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
            id="phone Number"
            label="Contact Number"
            variant="outlined"
            type="tel"
            {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
            error={!!errors.phone}
            helperText={errors.phone ? "Valid Contact Number is required!" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit(handleOpen)}
          >
            Sign Up
          </LoadingButton>
        </FormControl>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <Typography>
            Already have an account?{" "}
            <span style={{ color: theme.palette.secondary.main }}>
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
            phone your Student Coordinator for your login credentials.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SignUpRecruiter;
