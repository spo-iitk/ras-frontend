import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

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

function Unfreeze({ handleClose }: { handleClose: () => void }) {
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Unfreeze (Group)</h1>

        <TextField label="Enter Email Ids" id="emails" variant="standard" />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              handleClose();
            }}
          >
            Unfreeze
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("Hello");
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
