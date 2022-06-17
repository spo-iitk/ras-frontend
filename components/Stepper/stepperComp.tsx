import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Card, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import iconMap from "@components/Utils/IconMap";

const steps = [
  {
    label: "Applications",
    duration: ``,
    venue: "NA",
    date: "NA",
    startTime: "NA",
    endTime: "NA",
  },
  {
    label: "Pre-Placement Talk",
    duration: "Duration: 1 hour",
    venue: "L20",
    date: "8/20/2022",
    startTime: "16:00",
    endTime: "17:00",
  },
  {
    label: "Technical Test",
    duration: `Duration: 1 hour`,
    venue: "L19",
    date: "8/20/2022",
    startTime: "11:00",
    endTime: "12:00",
  },
];

function StepperComp() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Card sx={{ padding: 2, width: { xs: "250px", md: "300px" } }}>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <div>{iconMap[step.label]}</div>
                      <div>
                        {!iconMap[step.label] && (
                          <AttachFileIcon fontSize="large" />
                        )}
                      </div>
                      <h3>{step.label}</h3>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Card sx={{ padding: 2, width: { xs: "250px", md: "300px" } }}>
                  <h5 style={{ fontWeight: 400 }}>Duration: {step.duration}</h5>
                  <h5 style={{ fontWeight: 400 }}>Date: {step.date}</h5>
                  <h5 style={{ fontWeight: 400 }}>Venue: {step.venue}</h5>
                  <h5 style={{ fontWeight: 400 }}>
                    Time: {step.startTime}-{step.endTime}
                  </h5>
                </Card>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>No more rounds to be held!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Stepper>
    </Box>
  );
}

export default StepperComp;
