import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import { Event } from "@callbacks/admin/rc/proforma/event";

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
export interface resumeDLModal {
  status: string;
  frozen: boolean;
}
function DownloadResume({
  Events,
  zipResume,
}: {
  Events: any;
  /* eslint-disable no-unused-vars */
  zipResume: (data: resumeDLModal) => void;
  /* eslint-enable no-unused-vars */
}) {
  const { register, handleSubmit } = useForm<resumeDLModal>();
  const onSubmit = async (data: resumeDLModal) => {
    zipResume(data);
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Download Resume</h2>
        <Select
          label="Select Status"
          {...register("status", {
            required: true,
          })}
        >
          {Events.map((value: Event) => (
            <MenuItem value={value.name}>{value.name}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
              {...register("frozen")}
            />
          }
          label="Download Frozen Resumes"
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Download Resumes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
DownloadResume.layout = "adminPhaseDashBoard";
export default DownloadResume;
