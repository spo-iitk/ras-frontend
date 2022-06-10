import { Box, Stack, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

function ResumeClarification({
  handleCloseNew,
  resumeId,
}: {
  handleCloseNew: () => void;
  resumeId: string;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const handleClarification = (data: any) => {
    if (!data.message && !data.pocDetails) {
      setError("ErrorMessage", {
        type: "manual",
        message: "Either of the fields is required",
      });
    } else {
      console.log(data);
      console.log(resumeId);
      handleCloseNew();
    }
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Ask Clarification</h1>
        <TextField
          label="Message"
          id="message"
          multiline
          minRows={3}
          variant="standard"
          {...register("message")}
          error={errors.ErrorMessage}
          onChange={() => clearErrors("ErrorMessage")}
          helperText={errors.ErrorMessage && "Message is required"}
        />
        <h2 style={{ margin: "30px auto 10px auto" }}>OR</h2>
        <TextField
          label="POC Details"
          id="pocdetails"
          variant="standard"
          multiline
          minRows={3}
          {...register("pocDetails")}
          error={errors.ErrorMessage}
          onChange={() => clearErrors("ErrorMessage")}
          helperText={errors.ErrorMessage && "POC Details is required"}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(handleClarification)}
          >
            NOTIFY STUDENT
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              reset({ message: "", pocDetails: "" });
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ResumeClarification;
