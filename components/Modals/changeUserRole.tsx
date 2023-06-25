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

function ChangeUserRole({
  role,
  handleClose,
}: {
  role: number;
  // eslint-disable-next-line no-unused-vars
  handleClose: (newRole: number) => void;
}) {
  const [newRole, setNewRole] = React.useState(role);
  return (
    <Box sx={boxStyle}>
      <h3>Change User Role:</h3>
      <TextField
        id="role"
        label="User Role"
        variant="standard"
        value={newRole}
        onChange={(e) => setNewRole(parseInt(e.target.value, 10))}
      />
      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={() => handleClose(newRole)}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={() => {
            handleClose(-1);
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default ChangeUserRole;
