import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import router from "next/router";

import rcRequest, { RC } from "@callbacks/admin/rc/rc";
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

function AddRC({ handleClose }: { handleClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RC>();
  const { token } = useStore();
  const onSubmit = async (data: RC) => {
    const response = await rcRequest.post(token, data);
    if (response) {
      router.push(`rc/${response}/question`);
    }
    handleClose();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Create New Recruitment Cycle</h2>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="Academic-Year">
            {errors.academic_year
              ? "Select Academic Year (Required Field)"
              : "Select Academic Year"}
          </InputLabel>
          <Select
            labelId="Academic-Year"
            label="Select Academic Year"
            error={!!errors.academic_year}
            variant="standard"
            {...register("academic_year", {
              required: true,
            })}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="2021-22">2021 - 2022</MenuItem>
            <MenuItem value="2022-23">2022 - 2023</MenuItem>
            <MenuItem value="2023-24">2023 - 2024</MenuItem>
            <MenuItem value="2024-25">2024 - 2025</MenuItem>
            <MenuItem value="2025-26">2025 - 2026</MenuItem>
            <MenuItem value="2026-27">2026 - 2027</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="Types-of-Recruitment">
            {errors.type
              ? "Type of Recruitment (Required Field)"
              : "Type of Recruitment"}
          </InputLabel>
          <Select
            labelId="Types-of-Recruitment"
            label="Select Type of Recruitment"
            error={!!errors.type}
            variant="standard"
            {...register("type", {
              required: true,
            })}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="Phase">
            {errors.phase ? "Phase (Required Field)" : "Phase"}
          </InputLabel>
          <Select
            labelId="Phase"
            label="Select Phase"
            variant="standard"
            error={!!errors.phase}
            {...register("phase", {
              required: true,
            })}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Phase 1">Phase - 1</MenuItem>
            <MenuItem value="Phase 2">Phase - 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <TextField
            type="date"
            helperText="Select Start Date"
            error={!!errors.start_date}
            {...register("start_date", {
              required: true,
              setValueAs: (date) => {
                const d = new Date(date);
                const epoch = d.getTime();
                return epoch;
              },
            })}
          />
        </FormControl>
        <FormControl>
          <h3 style={{ margin: "10px 0px" }}>Policies</h3>
          <TextField
            label="Max Number of Applicants"
            helperText={errors.application_count_cap ? "Required Field" : ""}
            type="number"
            error={!!errors.application_count_cap}
            variant="standard"
            {...register("application_count_cap", {
              required: true,
              setValueAs: (v) => parseInt(v, 10),
            })}
            onWheel={(event) => (event.target as HTMLTextAreaElement).blur()}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Create Recruitment Cycle
        </Button>
      </Stack>
    </Box>
  );
}

AddRC.layout = "adminDashBoard";
export default AddRC;
