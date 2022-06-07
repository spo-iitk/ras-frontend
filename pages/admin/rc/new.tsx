import { Card, Stack, TextField } from "@mui/material";
import React from "react";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styles from "@styles/adminPhase.module.css";

function RecruitmentCycle() {
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
              <InputLabel id="Academic-Year">Select Academic Year</InputLabel>
              <Select
                labelId="Academic-Year"
                label="Select Academic Year"
                variant="standard"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="Types-of-Recruitment">
                Type of Recruitment
              </InputLabel>
              <Select
                labelId="Types-of-Recruitment"
                label="Select Type of Recruitment"
                variant="standard"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={10}>Intern</MenuItem>
                <MenuItem value={20}>Placement</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="Phase">Phase</InputLabel>
              <Select labelId="Phase" label="Select Phase" variant="standard">
                <MenuItem value="">None</MenuItem>
                <MenuItem value={10}>Intern</MenuItem>
                <MenuItem value={20}>Placement</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <h3 style={{ margin: "10px 0px" }}>Policies</h3>
              <TextField label="Max Number of Applicants" variant="standard" />
            </FormControl>
            <FormControl>
              <h3 style={{ margin: "10px 0px" }}>Additional Questions</h3>
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="Type-of-Ques">Type of Question</InputLabel>
                <Select
                  labelId="Type-of-Ques"
                  label="Type of Question"
                  variant="standard"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={10}>MCQ</MenuItem>
                  <MenuItem value={20}>Fill in the blanks</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField label="Question" variant="standard" />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField label="Option 1" variant="standard" />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField label="Option 2" variant="standard" />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField label="Option 3" variant="standard" />
              </FormControl>
            </FormControl>
            <ActiveButton
              sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
              onClick={() => {
                console.log("Clicked");
              }}
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
