import React from "react";
import { Grid, Stack, TextField } from "@mui/material";
import Meta from "@components/Meta";
import Paper from "@mui/material/Paper";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

function Step1() {
  return (
    <div>
      <Meta title="Step 1/5 - Basic Details" />
      <h1 style={{ marginBottom: "2rem" }}>Internship 2022-23 Phase 1</h1>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "58vw" }}
      >
        <Stack justifyContent="center">
          <h2 style={{ textAlign: "left", marginLeft: "2rem" }}>
            Step 1/5 (Basic Details)
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
                Company Name
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="Cname"
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
              <h3 style={{ marginLeft: "2rem", textAlign: "center" }}>
                Nature of Business
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="NoB"
                  required
                  label="Enter Nature of Business"
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
                Tentative Job Location
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="TJobL"
                  required
                  label="Enter Tentative Job Location"
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
                Job Description
              </h3>
            </Grid>
            <Grid item xs={8}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="JD"
                  required
                  label="Enter Job Description"
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

Step1.layout = "companyPhaseDashboard";
export default Step1;
