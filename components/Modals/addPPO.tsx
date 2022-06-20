import * as React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import PioPPO, { PPOResponse } from "@callbacks/admin/rc/pio-ppo";
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
function AddPPO({
  handleCloseNew,
  cname,
}: {
  handleCloseNew: () => void;
  cname: string;
}) {
  const router = useRouter();
  const CID = router.query.companyId;
  const ID = (CID || "").toString();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PPOResponse>();
  const handlePPO = (data: PPOResponse) => {
    const addPPO = async () => {
      const finData = { cid: ID, email: data.email };
      const response = await PioPPO.post(token, rid, finData);
      if (response) {
        reset({ email: "" });
      }
    };
    addPPO();
    handleCloseNew();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Add PPO/PIO</h1>
        <TextField
          disabled
          label="Company Name"
          id="selectCompany"
          variant="standard"
          defaultValue={cname}
        />
        <TextField
          label="Emails"
          id="selectActiveHR"
          variant="standard"
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "Email is required"}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(handlePPO)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => reset({ email: "" })}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
export default AddPPO;
