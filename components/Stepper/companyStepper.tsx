import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

function CompanyStepper() {
  const stepping = [
    {
      label: "Select campaign settings",
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
      duration: "1hr",
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
      duration: "1hr",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      duration: "1hr",
    },
  ];
  const [steps, setSteps] = React.useState(stepping);
  const [activeStep, setActiveStep] = React.useState(0);

  const [time, setTime] = React.useState(["", ""]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const tiles = [
    {
      label: "Techincal",
      desc: "Testing cpdeing",
    },
    {
      label: "Test",
      desc: "aptitude test",
    },
  ];

  const handleSubmit = (id: any) => {
    setSteps([
      ...steps,
      {
        label: tiles[id].label,
        description: tiles[id].desc,
        duration: time[id],
      },
    ]);
    setTime([""]);
    setActiveStep(steps.length);
  };

  const handleDelete = (index: any) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Typography>{step.duration}</Typography>
              <Box sx={{ mb: 2 }}>
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
                  <Button
                    onClick={() => handleDelete(index)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}

      {tiles.map((tile, index) => (
        <Box sx={{ mb: 2 }} key="">
          <Typography variant="h6">{tile.label}</Typography>
          <Typography variant="body1">{tile.desc}</Typography>
          <TextField
            label="duration"
            value={time[index]}
            onChange={(e) => {
              const newTime = [...time];
              newTime[index] = e.target.value;
              setTime(newTime);
            }}
          />
          <Button variant="contained" onClick={() => handleSubmit(index)}>
            Add content
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default CompanyStepper;
