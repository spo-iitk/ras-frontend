import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import Meta from "@components/Meta";
import Paper from "@mui/material/Paper";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

function Step3() {
  const [bond, setBond] = useState(false);
  console.log({ bond });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBond(event.target.checked);
  };
  return (
    <div>
      <Meta title="Step 3/5 - Package Details" />
      <h1 style={{ marginBottom: "2rem" }}>Internship 2022-23 Phase 1</h1>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "58vw" }}
      >
        <Stack justifyContent="center">
          <h2 style={{ textAlign: "left", marginLeft: "2rem" }}>
            Step 3/5 (Package Details)
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
              <h3 style={{ marginLeft: "2rem  " }}>Cost to Company</h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="CtC"
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
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <h3 style={{ marginLeft: "2rem  " }}>Package Details</h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="PacDet"
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
              <h3 style={{ marginLeft: "2rem  " }}>Bond</h3>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                right: "13.5vw",
              }}
            >
              <FormControlLabel
                label=""
                control={<Checkbox checked={bond} onChange={handleChange} />}
              />
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
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <h3 style={{ marginLeft: "2rem  " }}>Bond Details</h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="BondDet"
                  required
                  label="Enter Bond Details"
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
              <h3 style={{ marginLeft: "2rem  " }}>Medical Requirement</h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="MedReq"
                  required
                  label="Enter Medical Requirement"
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                />
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
              <ActiveButton sx={{ width: 100 }}>Next</ActiveButton>
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

Step3.layout = "companyPhaseDashboard";
export default Step3;
