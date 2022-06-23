import { Box, Stack, TextField } from "@mui/material";
import * as React from "react";

import { NoticeParams } from "@callbacks/admin/rc/notice";

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
  overflowY: "scroll",
  maxHeight: "90vh",
};
function ViewNotice({ currentNotice }: { currentNotice: NoticeParams }) {
  let value = currentNotice.CreatedAt;
  const publishedDateAndTime = `${new Date(
    value
  ).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`;
  return (
    <Box sx={boxStyle} className="modalScroll">
      <Stack spacing={3}>
        <h1>Add Notice</h1>
        <TextField
          label="Title"
          defaultValue={currentNotice.title}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Published Date and Time"
          defaultValue={publishedDateAndTime}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          variant="standard"
          multiline
          label="Description"
          defaultValue={currentNotice.description}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
    </Box>
  );
}

export default ViewNotice;
