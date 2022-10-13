import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resumeDLModal>();
  const [resumeLink, setResumeLink] = useState<any>("");
  const onSubmit = async (data: resumeDLModal) => {
    const response = await zipResume(data);
    setResumeLink(response);
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Download Resume</h2>
        <InputLabel>Select Status</InputLabel>
        <Select
          labelId="status_type"
          error={!!errors.status}
          variant="outlined"
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
        {resumeLink.length > 0 && (
          <Button
            variant="contained"
            target="_blank"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            href={`https://placement.iitk.ac.in/cdn/zip/${resumeLink}`}
          >
            Click Here to Download Zip
          </Button>
        )}
      </Stack>
    </Box>
  );
}
DownloadResume.layout = "adminPhaseDashBoard";
export default DownloadResume;
