import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import getStudents from "@callbacks/admin/rc/student/getStudents";
import useStore from "@store/store";

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

function Clarification({
  handleCloseNew,
  studentID,
  context,
}: {
  handleCloseNew: () => void;
  studentID: string;
  context: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { token } = useStore();
  const { rcid } = useRouter().query;
  const rid = (rcid || "").toString();

  const handleClarification = async (data: any) => {
    const message = `This is regarding ${context}.\nMessage: ${data.message}.\nYour POC is ${data.poc}.`;
    getStudents.clarify(token, message, rid, studentID);
    handleCloseNew();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Ask Clarification</h2>
        <TextField
          label="Message"
          id="message"
          multiline
          minRows={3}
          variant="standard"
          {...register("message", { required: true })}
          error={errors.message}
          helperText={errors.message && "Message is required"}
        />
        <TextField
          label="POC Details"
          id="poc"
          variant="standard"
          multiline
          minRows={3}
          {...register("poc", { required: true })}
          error={errors.poc}
          helperText={errors.poc && "POC Details is required"}
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

export default Clarification;
