import { Card, Stack, TextField } from "@mui/material";
import React from "react";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styles from "@styles/adminPhase.module.css";
import { useForm } from "react-hook-form";
import { submit, NewRCParams } from "@callbacks/admin_rc";
import router from "next/router";

function RecruitmentCycle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRCParams>();
  const onSubmit = async (data: NewRCParams) => {
    const response = await submit(data);
    console.log(data);
    if (response.Status === 200) {
      router.push("addquestions");
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
                {errors.Type
                  ? "Type of Recruitment (Required Field)"
                  : "Type of Recruitment"}
              </InputLabel>
              <Select
                labelId="Types-of-Recruitment"
                label="Select Type of Recruitment"
                error={!!errors.Type}
                variant="standard"
                {...register("Type", {
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
                <MenuItem value="Phase - 1">Phase - 1</MenuItem>
                <MenuItem value="Phase - 2">Phase - 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <h3 style={{ margin: "10px 0px" }}>Policies</h3>
              <TextField
                label="Max Number of Applicants"
                helperText={
                  errors.application_count_cap ? "Required Field" : ""
                }
                error={!!errors.application_count_cap}
                variant="standard"
                {...register("application_count_cap", {
                  required: true,
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

RecruitmentCycle.layout = "adminPhaseDashBoard";
export default RecruitmentCycle;
