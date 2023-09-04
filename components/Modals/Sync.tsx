import React from "react";
import { Box, Button, Stack } from "@mui/material";

import syncRequest from "@callbacks/admin/rc/student/syncStudents";
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

function Sync({ handleClose, rid }: { handleClose: () => void; rid: string }) {
  const { token } = useStore();
  const handleSync = async () => {
    await syncRequest.put(token, rid);
    handleClose();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Sync Student Data</h2>
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSync}
          >
            Sync
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

Sync.layout = "adminPhaseDashBoard";
export default Sync;
