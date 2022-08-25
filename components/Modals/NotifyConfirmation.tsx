import React from "react";
import { Box, Button, Stack } from "@mui/material";

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

function NotifyConfirmation({
  handleClose,
  setConfirmation,
}: {
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  setConfirmation: (arg0: boolean) => void;
}) {
  return (
    <Box sx={boxStyle}>
      <h3>Are you sure you want to Notify?</h3>
      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={() => {
            setConfirmation(true);
            handleClose();
          }}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={() => {
            setConfirmation(false);
            handleClose();
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default NotifyConfirmation;
