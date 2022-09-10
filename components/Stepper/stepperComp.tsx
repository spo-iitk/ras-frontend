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
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import iconMap from "@components/Utils/IconMap";
import { ProformaEvent } from "@callbacks/company/proforma";
import { Event } from "@callbacks/admin/rc/proforma/event";
// import useStore from "@store/store";

function StepperComp({
  steps,
  rcid,
}: {
  steps: ProformaEvent[] | Event[];
  rcid: string;
}) {
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

  const router = useRouter();

  const [showViewEventButton, setShowViewEventButton] = useState(false);

  useEffect(() => {
    if (router.isReady && router.pathname.startsWith("/admin")) {
      setShowViewEventButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
                    Venue: {step.venue === "" ? "Not set" : step.venue}
                  </h5>
                  {step.end_time === 0 || step.start_time === 0 ? (
                    <h5 style={{ fontWeight: 400 }}>Time: Not set</h5>
                  ) : (
                    <h5 style={{ fontWeight: 400 }}>
                      Time:{" "}
                      {new Date(step.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      -
                      {new Date(step.end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h5>
                  )}
                  {showViewEventButton && (
                    <Button
                      href={`/admin/rc/${rcid}/event/${step.ID}`}
                      variant="contained"
                      target="_blank"
                    >
                      View Event
                    </Button>
                  )}
                </Card>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Next"}
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
