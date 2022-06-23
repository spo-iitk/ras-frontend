import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import freezeRequest, {
  Emails,
} from "@callbacks/admin/rc/student/freezeStudents";
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

interface unfreezeStudent {
  email: string;
}
function Unfreeze({
  handleClose,
  rid,
}: {
  handleClose: () => void;
  rid: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<unfreezeStudent>();

  const { token } = useStore();
  const onSubmit = async (data: unfreezeStudent) => {
    const tosend: Emails = {
      email: [...data.email.split(",").map((x) => x.trim())],
      frozen: false,
    };
    const response = await freezeRequest.put(token, rid, tosend);
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
        <h1>Unfreeze (Group)</h1>
        <TextField
          multiline
          error={errors.email !== undefined}
          label="Enter Email Ids (CV format)"
          id="emails"
          variant="standard"
          {...register("email", { required: true })}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Unfreeze
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

Unfreeze.layout = "adminPhaseDashBoard";
export default Unfreeze;
