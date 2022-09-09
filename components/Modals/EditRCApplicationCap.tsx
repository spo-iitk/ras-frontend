import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import rcRequest from "@callbacks/admin/rc/rc";
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

function EditRCApplicationCap({ handleClose }: { handleClose: () => void }) {
  const { token } = useStore();
  const { rcid } = useRouter().query;
  const { register, handleSubmit } = useForm();

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Edit RC Application Cap</h2>
        <TextField
          type="number"
          label="Application Cap"
          variant="standard"
          {...register("application_count_cap", {
            setValueAs: (val) => parseInt(val, 10),
          })}
          onWheel={(event) => (event.target as HTMLTextAreaElement).blur()}
        />
        <Stack
          direction="row"
          spacing={2}
          style={{ justifyContent: "center", marginTop: 30 }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(async (data) => {
              if (rcid) {
                await rcRequest.put(token, {
                  ID: parseInt(rcid?.toString(), 10),
                  application_count_cap: data.application_count_cap,
                });
                handleClose();
              }
            })}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => handleClose()}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

EditRCApplicationCap.layout = "adminPhaseDashBoard";
export default EditRCApplicationCap;
