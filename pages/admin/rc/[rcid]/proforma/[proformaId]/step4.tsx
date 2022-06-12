import Meta from "@components/Meta";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import { useFieldArray, useForm } from "react-hook-form";
import iconMap from "@components/Utils/IconMap";
import { useRouter } from "next/router";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step5";

type Anchor = "top" | "left" | "bottom" | "right";

const style = {
  width: "100%",
  maxWidth: 360,
};

const textFieldColor = "#000000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

function Step4() {
  const router = useRouter();
  const { rcId } = router.query;
  const { register, handleSubmit, control, reset, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArray",
  });

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
    },
    {
      label: "Resume Shortlisting",
      duration: "0",
    },
    {
      label: "Group Discussion",
      duration: "0",
    },
    {
      label: "Technical Test",
      duration: "0",
    },
    {
      label: "Aptitude Test",
      duration: "0",
    },
    {
      label: "Technical Interview",
      duration: "0",
    },
    {
      label: "HR Interview",
      duration: "0",
    },
    {
      label: "Other",
      duration: "0",
    },
  ];

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

  const handleAdd = (id: number) => {
    append({
      label: tiles[id].label,
      duration: tiles[id].duration,
    });
    setActiveStep(fields.length + 1);
  };

  const handleDelete = (index: number) => {
    remove(index);
    setActiveStep(index);
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
                handleAdd(index);
              }}
              key={tile.label}
            >
              <ListItem sx={{ borderRadius: 5 }} button>
                <ListItemAvatar sx={{}}>{iconMap[tile.label]}</ListItemAvatar>
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
              <Step>
                <StepLabel>
                  <Card sx={{ padding: 2, width: "300px" }}>
                    <Stack spacing={3}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          {iconMap.Applications}

                          <TextField
                            variant="standard"
                            disabled
                            value="Applications"
                            sx={textFieldSX}
                          />
                        </Stack>
                      </Stack>
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
                        Continue
                      </Button>
                      <Button
                        disabled
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              {fields.map((step, index) => (
                <Step key={step.id}>
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
                            {iconMap[getValues(`fieldArray.${index}.label`)]}
                            {!iconMap[
                              getValues(`fieldArray.${index}.label`)
                            ] && <AttachFileIcon fontSize="large" />}
                            <TextField
                              variant="standard"
                              disabled={
                                getValues(`fieldArray.${index}.label`) !==
                                "Other"
                              }
                              sx={textFieldSX}
                              {...register(`fieldArray.${index}.label`)}
                            />
                          </Stack>
                          {index === activeStep - 1 ? (
                            <IconButton onClick={() => handleDelete(index)}>
                              <DeleteForeverIcon />
                            </IconButton>
                          ) : null}
                        </Stack>
                        <FormControl sx={{ mt: 1 }}>
                          <TextField
                            label="Duration"
                            defaultValue="0"
                            variant="outlined"
                            {...register(`fieldArray.${index}.duration`)}
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
                          {index === fields.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === fields.length + 1 && (
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
                <Card sx={{ padding: 3, width: "350px" }} key={tile.label}>
                  <Stack
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                  >
                    <div>
                      <Stack direction="row" spacing={3} alignItems="center">
                        {iconMap[tile.label]}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {tile.label}
                        </Typography>
                      </Stack>
                    </div>
                    <div>
                      <IconButton onClick={() => handleAdd(index)}>
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
          <Button
            variant="contained"
            sx={{ width: { xs: "50%", md: "20%" } }}
            onClick={handleSubmit((data) => {
              console.log(data);
              router.push({
                pathname: ROUTE,
                query: { rcId, proformaId: 1 },
              });
            })}
          >
            Next
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: "50%", md: "20%" } }}
            onClick={() =>
              reset({
                fieldArray: [],
              })
            }
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
Step4.layout = "companyPhaseDashboard";
export default Step4;
