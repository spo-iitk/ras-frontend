import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SliderValueLabel,
  Stack,
  TextField,
} from "@mui/material";
import useStore from "@store/store";
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
function DownloadResume({ Events }: any, {zipResume} : {zipResume: (data:resumeDLModal) => void}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resumeDLModal>();
  // const onSubmit = async () => {
  //       window.location.reload();
  //     }
  //   };
  const onSubmit = async (data: resumeDLModal) => {
    console.log("Form Submitted");
    console.log(data);
    zipResume(data);
    //handleClose();
  }
  console.log("Printing");
  console.log(Events);

  const { token } = useStore();
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
            <MenuItem value={value.ID}>{value.name}</MenuItem>
          ))}
          <MenuItem value="0">Any Stage</MenuItem>
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
