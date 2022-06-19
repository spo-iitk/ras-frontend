import { Card, Stack, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import router from "next/router";

import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import rcRequest, { RC } from "@callbacks/admin/rc/rc";
import useStore from "@store/store";

function RecruitmentCycle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RC>();
  const { token } = useStore();
  const onSubmit = async (data: RC) => {
    const response = await rcRequest.post(token, data);
    if (response) {
      router.push("question");
    }
    console.log(response);
  };
  return (
    <div className={styles.container}>
      <Meta title="Create New Recruitment Cycle - Admin" />
      <div style={{ marginTop: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h1>Create New Recruitment Cycle</h1>
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
                helperText={
                  errors.application_count_cap ? "Required Field" : ""
                }
                type="number"
                error={!!errors.application_count_cap}
                variant="standard"
                {...register("application_count_cap", {
                  required: true,
                  setValueAs: (v) => parseInt(v, 10),
                })}
              />
            </FormControl>
            <ActiveButton
              sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
              onClick={handleSubmit(onSubmit)}
            >
              Create Recruitment Cycle
            </ActiveButton>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

RecruitmentCycle.layout = "adminDashBoard";
export default RecruitmentCycle;
