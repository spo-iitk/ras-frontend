import { Card, Grid, Stack, TextField } from "@mui/material";
import React from "react";

import MatrixExpanded from "@components/Utils/MatrixExpanded";
import StepperComp from "@components/Stepper/stepperComp";
import Meta from "@components/Meta";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

const info = [
  {
    label: "Company Name",
    value: "Paradime",
  },
  {
    label: "Nature of Business",
    value: "FrontEnd Engineer",
  },
  {
    label: "Tentative Job Location",
    value: "London",
  },
  {
    label: "Job Description",
    value: "Product Engineer in FrontEnd",
  },
  {
    label: "Cost to Company",
    value: "Not to be told",
  },
  {
    label: "Package Details",
    value: "Enough Money",
  },
  {
    label: "Bond Details",
    value: "Yes",
  },
  {
    label: "Medical Requirements",
    value: "None",
  },
];

const data = new Array(100 + 1).join("0");

function View() {
  return (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title="Software Intern - Proforma" />
      <h1>Proforma</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "320px", sm: "800px", margin: "0px auto" },
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {info.map((item) => (
              <Grid
                item
                xs={12}
                md={item.label === "Eligibility" ? 12 : 6}
                key={item.label}
              >
                <h3>{item.label}</h3>
                <TextField
                  multiline
                  fullWidth
                  value={item.value}
                  variant="standard"
                  disabled
                  sx={textFieldSX}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <h3>Eligibility</h3>
              <MatrixExpanded data={data} />
            </Grid>
            <Grid item xs={12}>
              <h3>Hiring Process</h3>
              <StepperComp />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

View.layout = "adminPhaseDashBoard";
export default View;
