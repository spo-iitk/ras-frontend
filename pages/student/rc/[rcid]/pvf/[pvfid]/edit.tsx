import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import { green } from "@mui/material/colors";
import styled from "@emotion/styled";

import Meta from "@components/Meta";
import useStore from "@store/store";
import pvfRequest, { PvfsParams } from "@callbacks/student/rc/pvf";
import { CDN_URL } from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";
import enrollmentRequest from "@callbacks/student/rc/enrollQuestion";
import { getDeptProgram } from "@components/Parser/parser";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};
const Input = styled("input")({
  display: "none",
});

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

function View() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid, pvfid } = router.query;
  //   const PID = router.query.pvfid;
  const rid = (rcid || "").toString();
  const pid = (pvfid || "").toString();
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pvfName, setPvfName] = useState<string>("");
  //   const ID = (PID || "").toString();
  // const [isFetched, setisFetched] = useState(false);
  const [row, setRow] = useState<PvfsParams>({
    ID: 0,
  } as PvfsParams);
  //   const [fetchData, setFetch] = useState<PvfsParams>({
  //     ID: 0,
  //   } as PvfsParams);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PvfsParams>({
    defaultValues: row,
  });
  useEffect(() => {
    let data: PvfsParams;
    if (!(rid && pid)) return;
    const fetchStudent = async () => {
      const student_data = await enrollmentRequest.getStudentRC(token, rid);
      if (student_data.ID) {
        const progdept = getDeptProgram(student_data.program_department_id);
        let filename = `${student_data.roll_no} ${student_data.name} ${progdept}`;
        filename = filename.replace(/[^\w]/gi, "_");
        filename = filename.toLowerCase();
        setPvfName(`${filename}.pdf`);
      }
    };
    const getPVFDetails = async () => {
      data = await pvfRequest.get(token, rid, pid);
      setRow(data);
      setLoading(false);
      reset(data);
    };
    getPVFDetails();
    fetchStudent();
  }, [rid, pid, token, reset]);

  const onSubmit = async (data: PvfsParams) => {
    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());
    if (fileSaved != null) {
      pvfRequest.editWithFile(token, rid, pid, formData, {
        ...data,
      } as PvfsParams);
    } else {
      pvfRequest.editWithoutFile(token, rid, pid, {
        ...data,
      } as PvfsParams);
    }

    setFileSaved(null);
    router.push(`/student/rc/${rid}/pvf`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    // if (
    //   allPvf.filter(
    //     (pvf) => !(pvf.verified.Valid && !pvf.verified.Bool)
    //   ).length >= 5
    // ) {
    //   errorNotification("You can only upload 5 pvf", "Cannot upload");
    //   setLoading(false);
    //   return;
    // }

    if (!(files && files.length > 0)) {
      setLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > 256000) {
      errorNotification("File size too large", "Max file size is about 200KB");
      setLoading(false);
      return;
    }

    if (file.name !== pvfName) {
      errorNotification(
        "File must follow the name constraint",
        `Expected File name: ${pvfName}`
      );
      setLoading(false);
      return;
    }

    setFileSaved(file);
    setSuccess(true);
    setLoading(false);
  };
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };

  //   useEffect(() => {
  //     const getPVFDetails = async () => {
  //       if (router.isReady) {
  //         let response = await pvfRequest.get(token, rid, ID);
  //         setRow(response);
  //         // setisFetched(true);
  //       }
  //     };
  //     getPVFDetails();
  //   }, [token, rid, ID, router.isReady, row.is_verified]);
  let content;
  content = (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title={`${pid} - PVF Details`} />
      {/* <h2>Manage PVF</h2> */}
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "320px", sm: "1000px", margin: "0px auto" },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Grid container spacing={2} margin={0}>
            <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
              <Grid item xs={12} md={12} key="pvf-details">
                <h2 style={{ textAlign: "center" }}>Edit PVF</h2>
              </Grid>
              <Grid item xs={12} md={6} key="comp_name" padding={0}>
                <h4>Company / University Name</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={
                    errors.company_university_name && "This field is required"
                  }
                  variant="standard"
                  {...register("company_university_name", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="role" padding={0}>
                <h4>Role</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={errors.role && "This field is required"}
                  variant="standard"
                  {...register("role", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="dur" padding={0}>
                <h4>Duration</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={errors.duration && "This field is required"}
                  variant="standard"
                  {...register("duration", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="name" padding={0}>
                <h4>Mentor Name</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={errors.mentor_name && "This field is required"}
                  variant="standard"
                  {...register("mentor_name", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="email" padding={0}>
                <h4>Mentor Email</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={errors.mentor_email && "This field is required"}
                  variant="standard"
                  {...register("mentor_email", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="designation" padding={0}>
                <h4>Mentor Designation</h4>
                <TextField
                  multiline
                  fullWidth
                  helperText={
                    errors.mentor_designation && "This field is required"
                  }
                  variant="standard"
                  {...register("mentor_designation", {
                    required: "This field is required",
                  })}
                  //   value={row.company_university_name}
                  //   InputProps={{
                  //     style: { textAlign: "center" },
                  //   }}
                  sx={textFieldSX}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} key="upload" padding={0} /> */}
              <Grid
                item
                xs={12}
                md={12}
                key="file"
                padding={0}
                marginTop={2}
                display="flex"
                gap="3rem"
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    const url = getURL(row?.filename_student ?? "");
                    window.open(url, "_blank");
                  }}
                  sx={{ height: 40, width: "30%" }}
                >
                  <CloudDownloadIcon sx={{ marginRight: "10px" }} />
                  <span>View Uploaded PVF</span>
                </Button>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="application/pdf"
                    id="icon-button-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    // color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      ...(success && {
                        bgcolor: green[500],
                        "&:hover": {
                          bgcolor: green[700],
                        },
                      }),
                      height: 40,
                      width: "100%",
                    }}
                    onClick={handleButtonClick}
                  >
                    {success ? (
                      <CheckIcon />
                    ) : (
                      <span style={{ alignItems: "center", display: "flex" }}>
                        <SaveIcon sx={{ marginRight: "10px" }} />
                        ReUpload PVF
                      </span>
                    )}
                    {loading && (
                      <CircularProgress
                        size={30}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          // top: -6,
                          // left: -6,
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} md={6} key="designation" padding={0}>
                <Typography variant="subtitle1">{fileSaved?.name}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                key="file"
                padding={0}
                marginTop={5}
                display="flex"
                justifyContent="center"
                alignContent="center"
                gap="3rem"
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ height: 60, width: "100%" }}
                >
                  <span>Confirm Changes</span>
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
              <Grid item xs={12} md={12} key="company-deets">
                <h2 style={{ textAlign: "center" }}>Internship Details</h2>
              </Grid>
              <Grid item xs={12} md={6} key="profile" padding={0}>
                <h4>Profile</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.profile}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="skills" padding={0}>
                <h4>Required Skill Set</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.skill_set}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="tjobloc" padding={0}>
                <h4>Tentative Job Location / online</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.tentative_job_location}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="min-hires" padding={0}>
                <h4>Minimum Number of Hires</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.min_hires}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="tot-hires" padding={0}>
                <h4>Expected Total Number of Hires</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.total_hires}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="int-per" padding={0}>
                <h4>Preferred period of Internship</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.internship_period}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={12} key="ctc">
                <h4>Job Description</h4>
                {isFetched && <RichText onChange={setJd} readOnly value={jd} />}
              </Grid>
            </Grid> */}
          </Grid>
        </Stack>
      </Card>
    </div>
  );
  return content;
}

View.layout = "studentPhaseDashboard";
export default View;
