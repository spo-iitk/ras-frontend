import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import postEmails, { Emails } from "@callbacks/admin/rc/student/enrollStudents";
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

interface EnrollForm {
  email: string;
}

function Enroll({ handleClose }: { handleClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnrollForm>();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const { token } = useStore();
  const onSubmit = async (data: EnrollForm) => {
    const tosend: Emails = {
      email: [...data.email.split(",").map((x) => x.trim())],
    };

    const response = await postEmails.post(token, rid, tosend);
    if (response) {
      reset({
        email: "",
      });
    }
    handleClose();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Enroll (Group)</h1>
        <TextField
          multiline
          error={errors.email !== undefined}
          label="Enter Email Ids"
          id="emails"
          variant="standard"
          {...register("email", { required: true })}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Enroll
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              reset({
                email: "",
              });
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

Enroll.layout = "adminPhaseDashBoard";
export default Enroll;
