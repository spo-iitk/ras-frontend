import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

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

function AddCompany({ handleCloseNew }: { handleCloseNew: () => void }) {
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Add Company</h1>
        <Typography>
          Note: If company is not listed here then it might be not listed in the
          master database. Add it there first.
        </Typography>
        <TextField
          label="Select Company"
          id="selectCompany"
          variant="standard"
        />
        <TextField
          label="Select Active HR"
          id="selectActiveHR"
          variant="standard"
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              console.log("Hello");
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              handleCloseNew();
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

AddCompany.layout = "adminPhaseDashBoard";
export default AddCompany;
