import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useStore from "@store/store";
import eventRequest, {
  RegisterStudentParams,
} from "@callbacks/admin/rc/proforma/event";

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

function Enroll({
  handleClose,
  pid,
  eid,
}: {
  handleClose: () => void;
  pid: string;
  eid: string;
}) {
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
    const tosend: RegisterStudentParams = {
      emails: [
        ...data.email
          .replace(/,\s+/g, ",")
          .split(/[\n,\s+]/)
          .map((x) => x.trim()),
      ],
      event_id: parseInt(eid, 10),
    };

    const response = await eventRequest.postStudents(
      token,
      rid,
      pid,
      eid,
      tosend
    );
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
        <h2>Enroll (Group)</h2>
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
