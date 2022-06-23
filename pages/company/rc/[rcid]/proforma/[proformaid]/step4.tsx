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
import * as React from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import iconMap from "@components/Utils/IconMap";
import Meta from "@components/Meta";
import eventRequest from "@callbacks/company/rc/proforma/event";
import useStore from "@store/store";
import { successNotification } from "@callbacks/notifcation";

const ROUTE = "/company/rc/[rcid]/proforma/[proformaid]/step5";

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
  const { rcid, proformaid } = router.query;
  const { token } = useStore();
  const [array, setArray] = useState<any>([]);

  const { register, handleSubmit, control, reset, getValues, setValue } =
    useForm();
  const { fields, append, remove } = useFieldArray<
    FieldValues,
    "fieldArray",
    "ID"
  >({
    control,
    name: "fieldArray",
  });
  useEffect(() => {
    const fetchStep4 = async () => {
      if (router.isReady) {
        const response = await eventRequest.getAll(
          token,
          (rcid || "").toString(),
          (proformaid || "").toString()
        );
        let arrays_temp: {
          label: string;
          duration: string;
          ID: number;
        }[] = [];
        for (let i = 0; i < response.length; i += 1) {
          const obj = {
            label: response[i].name,
            duration: (response[i].duration || "").toString(),
            ID: response[i].ID,
          };
          arrays_temp.push(obj);
        }
        setArray(arrays_temp);
        reset({ fieldArray: arrays_temp });
      }
    };
    fetchStep4();
  }, [token, proformaid, rcid, router.isReady, reset]);
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
      duration: "0 Min",
    },
    {
      label: "Resume Shortlisting",
      duration: "0 Min",
    },
    {
      label: "Group Discussion",
      duration: "0 Min",
    },
    {
      label: "Technical Test",
      duration: "0 Min",
    },
    {
      label: "Aptitude Test",
      duration: "0 Min",
    },
    {
      label: "Technical Interview",
      duration: "0 Min",
    },
    {
      label: "HR Interview",
      duration: "0 Min",
    },
    {
      label: "Other",
      duration: "0 Min",
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
      duratioresponsen: tiles[id].duration,
    });
    setActiveStep(fields.length + 1);
  };

  const handleDelete = async (index: number) => {
    if (fields[index].ID !== undefined) {
      const response = await eventRequest.delete(
        token,
        (rcid || "").toString(),
        fields[index].ID.toString()
      );
      if (response) {
        remove(index);
        setActiveStep(index);
        router.reload();
      }
    } else {
      successNotification("Step deleted successfully", "");
      remove(index);
      setActiveStep(index);
    }
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
    <div className="container" style={{ marginBottom: 20 }}>
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
                <Step key={step.ID}>
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
            onClick={handleSubmit(async (data) => {
              const { fieldArray } = data;
              let push = 1;
              let count = 0;
              // eslint-disable-next-line no-loop-func
              for (let i = 0; i < fieldArray.length; i += 1) {
                fieldArray[i].proforma_id = parseInt(
                  (proformaid || "").toString(),
                  10
                );
                fieldArray[i].sequence = 5 * (i + 1);
                fieldArray[i].name = fieldArray[i].label;

                let response = false;
                if (count < array.length) {
                  fieldArray[i].ID = array[i].ID;
                  setValue("fieldArray", [{ id: array[i].ID }]);
                  // eslint-disable-next-line no-await-in-loop
                  response = await eventRequest.put(
                    token,
                    fieldArray[i],
                    (rcid || "").toString()
                  );
                } else {
                  // eslint-disable-next-line no-await-in-loop
                  response = await eventRequest.post(
                    token,
                    fieldArray[i],
                    (rcid || "").toString()
                  );
                }
                count += 1;
                if (!response) {
                  push = 0;
                  break;
                }
              }
              if (push) {
                router.push({
                  pathname: ROUTE,
                  query: { rcid, proformaid },
                });
              }
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
