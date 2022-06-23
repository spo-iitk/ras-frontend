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
// import { useRouter } from "next/router";

import iconMap from "@components/Utils/IconMap";
import { ProformaEvent } from "@callbacks/company/proforma";
// import useStore from "@store/store";

function StepperComp({ steps }: { steps: ProformaEvent[] }) {
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
          <Step key={step.name}>
            <StepLabel>
              <Card sx={{ padding: 2, width: { xs: "250px", md: "300px" } }}>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <div>{iconMap[step.name]}</div>
                      <div>
                        {!iconMap[step.name] && (
                          <AttachFileIcon fontSize="large" />
                        )}
                      </div>
                      <h3>{step.name}</h3>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Card sx={{ padding: 2, width: { xs: "250px", md: "300px" } }}>
                  <h5 style={{ fontWeight: 400 }}>Duration: {step.duration}</h5>
                  <h5 style={{ fontWeight: 400 }}>
                    Date: {step?.date ? step?.date : ""}
                  </h5>
                  <h5 style={{ fontWeight: 400 }}>Venue: {step.venue}</h5>
                  <h5 style={{ fontWeight: 400 }}>
                    Time: {step.start_time}-{step.end_time}
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
