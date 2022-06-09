import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MonitorIcon from "@mui/icons-material/Monitor";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import {
  Card,
  Drawer,
  FormControl,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import styles from "@styles/internPhase.module.css";
import * as React from "react";
import Meta from "@components/Meta";

type Anchor = "top" | "left" | "bottom" | "right";

const style = {
  width: "100%",
  maxWidth: 360,
};

function Step4() {
  const stepping = [
    {
      label: "Applications",
      icon: <DocumentScannerIcon fontSize="large" />,
      duration: "NA",
    },
  ];
  const [steps, setSteps] = React.useState(stepping);
  const [activeStep, setActiveStep] = React.useState(0);

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
      label: "Pre-Placement Talk",
      duration: "0",
      icon: <MonitorIcon fontSize="large" />,
    },
    {
      label: "Resume Shortlisting",
      duration: "0",
      icon: <FeedIcon fontSize="large" />,
    },
    {
      label: "Group Discussion",
      duration: "0",
      icon: <GroupsIcon fontSize="large" />,
    },
    {
      label: "Technical Test",
      duration: "0",
      icon: <ScreenshotMonitorIcon fontSize="large" />,
    },
    {
      label: "Aptitude Test",
      duration: "0",
      icon: <AssignmentIcon fontSize="large" />,
    },
    {
      label: "Technical Interview",
      duration: "0",
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      label: "HR Interview",
      duration: "0",
      icon: <HandshakeIcon fontSize="large" />,
    },
    {
      label: "Other",
      duration: "0",
      icon: <AttachFileIcon fontSize="large" />,
    },
  ];

  const handleSubmit = (id: number) => {
    setSteps([
      ...steps,
      {
        label: tiles[id].label,
        icon: tiles[id].icon,
        duration: tiles[id].duration,
      },
    ]);
    setActiveStep(steps.length);
  };

  const handleDelete = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    setActiveStep(index - 1);
  };

  const [state, setState] = React.useState({
    bottom: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      padding="10px"
      height="70vh"
    >
      <Stack spacing={3}>
        <div style={{ height: 10 }} />
        <List sx={style} component="nav" aria-label="mailbox folders">
          {tiles.map((tile, index) => (
            <ListItemButton
              onClick={() => {
                handleSubmit(index);
              }}
              key={tile.label}
            >
              <ListItem sx={{ borderRadius: 5 }} button>
                <ListItemAvatar sx={{}}>{tile.icon}</ListItemAvatar>
                <ListItemText>
                  <h4>{tile.label}</h4>
                </ListItemText>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Box>
  );

  return (
    <div className={styles.container} style={{ marginBottom: 20 }}>
      <Meta title="Step 4/5 - Add Hiring Process" />
      <Stack spacing={4}>
        <h1>Step 4/5 - Add Hiring Process</h1>
        <Stack
          spacing={3}
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
          direction={{ xs: "column", md: "row" }}
        >
          <div>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Card sx={{ padding: 2, width: "300px" }}>
                      <Stack spacing={3}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <div>{step.icon}</div>

                            {step.label === "Other" ? (
                              <TextField
                                variant="standard"
                                label="Event Name"
                              />
                            ) : (
                              <div>{step.label}</div>
                            )}
                          </Stack>
                          {index === activeStep ? (
                            <IconButton
                              onClick={() => handleDelete(index)}
                              disabled={index === 0}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          ) : null}
                        </Stack>
                        <FormControl sx={{ mt: 1 }}>
                          <TextField
                            label="Duration"
                            defaultValue={step.duration}
                            disabled={index === 0}
                            variant="outlined"
                          />
                        </FormControl>
                      </Stack>
                    </Card>
                  </StepLabel>
                  <StepContent>
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
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
          <div>
            <Stack spacing={3} sx={{ display: { xs: "none", md: "block" } }}>
              {tiles.map((tile, index) => (
                <Card sx={{ padding: 3, width: "350px" }} key="">
                  <Stack
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                  >
                    <div>
                      <Stack direction="row" spacing={3} alignItems="center">
                        {tile.icon}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {tile.label}
                        </Typography>
                      </Stack>
                    </div>
                    <div>
                      <IconButton onClick={() => handleSubmit(index)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </div>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton
            onClick={toggleDrawer("bottom", true)}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Drawer
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("left")}
        </Drawer>
        <Stack spacing={3} justifyContent="center" direction="row">
          <Button variant="contained" sx={{ width: { xs: "50%", md: "20%" } }}>
            Next
          </Button>
          <Button variant="contained" sx={{ width: { xs: "50%", md: "20%" } }}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
Step4.layout = "companyPhaseDashboard";
export default Step4;
