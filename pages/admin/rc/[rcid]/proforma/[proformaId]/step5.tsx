import React from "react";
import { Grid, MenuItem, Stack, TextField } from "@mui/material";
import Meta from "@components/Meta";
import Paper from "@mui/material/Paper";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

const hrtype = [
  { id: 1, data: "HR1" },
  { id: 1, data: "HR2" },
  { id: 1, data: "HR3" },
];
function Step5() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(value);
  };
  return (
    <div>
      <Meta title="Step 5/5 - Additional Information" />
      <h1 style={{ marginBottom: "2rem" }}>Internship 2022-23 Phase 1</h1>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "58vw" }}
      >
        <Stack justifyContent="center">
          <h2 style={{ textAlign: "left", marginLeft: "2rem" }}>
            Step 5/5 (Additional Information)
          </h2>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignContent="center"
          >
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <h3 style={{ marginLeft: "2rem", textAlign: "center" }}>
                Additional Eligibilty Criteria
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30vw", marginLeft: "4vw" }}>
                <TextField
                  id="AddEligCrit"
                  required
                  label="Enter Company Name"
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <h3 style={{ marginLeft: "2rem", textAlign: "center" }}>
                Message for Placement Coordinator
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30vw", marginLeft: "4vw" }}>
                <TextField
                  id="Msg"
                  required
                  label="Enter Package Details"
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <h3 style={{ marginLeft: "2rem", textAlign: "center" }}>
                Select Active HR
              </h3>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                right: "1.5vw",
              }}
            >
              {/* <FormControlLabel
            label = ""
            control={<Checkbox checked = {bond} onChange = {handleChange} />}
            /> */}
              {/* <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="Cname"
                  required
                  // select
                  label="Enter Company Name"
                //   onChange={handleChange}
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                />
              </div> */}
              <div style={{ width: "30vw", marginLeft: "4vw" }}>
                <TextField
                  id="hrtype"
                  required
                  select
                  label="Select HR Type"
                  onChange={handleChange}
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  variant="standard"
                >
                  {hrtype.map((val) => (
                    <MenuItem value={val.data} key="q1">
                      {val.data}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <ActiveButton sx={{ width: 100 }}>Submit</ActiveButton>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <InactiveButton sx={{ width: 100 }}>Reset</InactiveButton>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </div>
  );
}

Step5.layout = "companyPhaseDashboard";
export default Step5;
