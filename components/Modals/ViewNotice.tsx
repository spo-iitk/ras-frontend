import { Box, Stack, TextField } from "@mui/material";
import * as React from "react";

import { NoticeParams } from "@callbacks/admin/rc/notice";
import RichText from "@components/Editor/RichText";

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
  const value = currentNotice.CreatedAt;
  const publishedDateAndTime = `${new Date(value).toLocaleDateString(
    "en-GB"
  )} ${new Date(value).toLocaleTimeString()}`;
  const isOpeningTag = currentNotice.tags.includes("opening");
  function formatDeadline(deadline: string): string {
    return deadline === "0001-01-01T00:00:00Z"
      ? "N/A"
      : new Date(deadline).toLocaleString();
  }
  const deadlineDate = formatDeadline(currentNotice.deadline);
  return (
    <Box sx={boxStyle} className="modalScroll">
      <Stack spacing={3}>
        <h2>Notice</h2>
        <TextField
          label="Title"
          multiline
          defaultValue={currentNotice.title}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          multiline
          label="Published Date and Time"
          defaultValue={publishedDateAndTime}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          multiline
          label="Tags"
          defaultValue={currentNotice.tags}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        {isOpeningTag && (
          <TextField
            multiline
            label="Deadline"
            defaultValue={deadlineDate}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        <small style={{ fontWeight: 300 }}>Description</small>
        <RichText
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          readOnly
          value={currentNotice.description}
        />
      </Stack>
    </Box>
  );
}

export default ViewNotice;
