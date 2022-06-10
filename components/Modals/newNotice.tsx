import { Box, Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
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

const Input = styled("input")({
  display: "none",
});

function NewNotice({ handleCloseNew }: { handleCloseNew: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleNewNotice = (data: any) => {
    console.log(data);
    reset();
    handleCloseNew();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Add Notice</h1>
        <TextField
          label="Company Name"
          id="selectCompany"
          variant="standard"
          error={errors.companyName}
          helperText={errors.companyName && "Company Name is required"}
          {...register("companyName", { required: true })}
        />
        <TextField
          label="Subject"
          id="selectActiveHR"
          variant="standard"
          {...register("subject", { required: true })}
          error={errors.subject}
          helperText={errors.subject && "Subject is required"}
        />
        <TextField
          variant="standard"
          multiline
          rows={3}
          placeholder="Write your notice here"
          label="Message"
          {...register("message", { required: true })}
          error={errors.message}
          helperText={errors.message && "Message is required"}
        />
        <label
          htmlFor="contained-button-file"
          style={{ margin: "30px auto 10px auto" }}
        >
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            variant="outlined"
            component="span"
            sx={{ width: "200px", borderRadius: 5 }}
          >
            Upload
          </Button>
        </label>
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(handleNewNotice)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => reset({ companyName: "", subject: "", message: "" })}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NewNotice;
