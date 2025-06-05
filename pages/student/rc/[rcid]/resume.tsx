/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";

import { getDeptProgram } from "@components/Parser/parser";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import resumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/student/rc/resume";
import { CDN_URL } from "@callbacks/constants";
import enrollmentRequest from "@callbacks/student/rc/enrollQuestion";
import { errorNotification } from "@callbacks/notifcation";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "Resume ID",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "resume",
    headerName: "Resume Link",
    sortable: false,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => getURL(params?.value),
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => {
          window.open(params.value, "_blank");
        }}
      >
        {transformName(params.value)}
      </Button>
    ),
  },
  {
    field: "CreatedAt",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
    headerName: "Upload Time",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "verified",
    headerName: "Verification Status",
    align: "center",
    headerAlign: "center",
    renderCell: (params) =>
      params.row.verified.Valid ? (
        params.row.verified.Bool ? (
          <Button
            variant="outlined"
            sx={{ borderRadius: "10px", width: "80%", color: "green" }}
            color="success"
            startIcon={<CheckIcon sx={{ color: "green" }} />}
          >
            Accepted
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ borderRadius: "10px", width: "80%", color: "red" }}
            color="error"
            startIcon={<CloseIcon sx={{ color: "red" }} />}
          >
            Rejected
          </Button>
        )
      ) : (
        <Button
          variant="outlined"
          sx={{ borderRadius: "10px", width: "80%" }}
          startIcon={<AvTimerIcon />}
        >
          Pending by SPO
        </Button>
      ),
  },
  {
    field: "resume_type",
    headerName: "Resume Type",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "resume_tag",
    headerName: "Resume Tag",
    align: "center",
    headerAlign: "center",
  },
];

const Input = styled("input")({
  display: "none",
});

function Resume() {
  const router = useRouter();
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [allResumes, setAllResumes] = useState<AllStudentResumeResponse[]>([]);
  const [resumeName, setResumeName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeType, setResumeType] = useState<string>("SINGLE");
  const [resumeTag, setResumeTag] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setFileSaved(null);
    setLoading(false);
    setResumeTag("");
  };

  const handleChange = (event: { target: { files: any } }) => {
    const { files } = event.target;

    const verifiedOrPendingResumes = allResumes.filter(
      (resume) => !(resume.verified.Valid && !resume.verified.Bool)
    );
    const singleResumes = verifiedOrPendingResumes.filter(
      (resume) => resume.resume_type === "SINGLE"
    );

    const masterResumes = verifiedOrPendingResumes.filter(
      (resume) => resume.resume_type === "MASTER"
    );

    if (resumeType === "SINGLE" && singleResumes.length >= 5) {
      errorNotification(
        "You can only upload 5 Single resumes",
        "Cannot upload"
      );
      setLoading(false);
      return;
    }

    if (resumeType === "MASTER" && masterResumes.length >= 1) {
      errorNotification(
        "You can only upload one MASTER resume unless the existing one is rejected",
        "Cannot upload"
      );
      setLoading(false);
      return;
    }

    if (!resumeTag) {
      errorNotification("No role selected", "Please select a role.");
      setLoading(false);
      return;
    }

    if (resumeType === "SINGLE" && !resumeTag) {
      errorNotification("No role selected", "Please select a role.");
      setLoading(false);
      return;
    }

    // Proceed if all conditions are satisfied
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

    if (file.name !== resumeName) {
      errorNotification(
        "File must follow the name constraint",
        `Expected File name: ${resumeName}`
      );
      setLoading(false);
      return;
    }

    setFileSaved(file);
    setSuccess(true);
    setLoading(false);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!fileSaved) {
      errorNotification("No file selected", "Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileSaved);
    formData.append("resumeType", resumeType);
    formData.append("resumeTag", resumeTag);

    try {
      await resumeRequest.post(formData, token, rid);
      setFileSaved(null);
      handleClose();
      window.location.reload();
    } catch (error: any) {
      errorNotification("Upload Failed", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await resumeRequest.get(token, rid);
      setAllResumes(data);
    };

    const fetchStudent = async () => {
      const data = await enrollmentRequest.getStudentRC(token, rid);
      if (data.ID) {
        const progdept = getDeptProgram(data.program_department_id);
        let filename = `${data.roll_no} ${data.name} ${progdept}`;
        filename = filename.replace(/[^\w]/gi, "_");
        filename = filename.toLowerCase();
        setResumeName(`${filename}.pdf`);
      }
    };

    if (router.isReady) {
      fetchData();
      fetchStudent();
    }

    setLoading(false);
    setSuccess(false);
  }, [token, rid, router.isReady]);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleResumeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResumeType(event.target.value);
  };

  const handleResumeTagChange = (event: SelectChangeEvent<string>) => {
    setResumeTag(event.target.value);
  };

  return (
    <>
      <div>
        <Meta title="RC - Manage Resume " />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>Manage Resume</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div>
          <Typography>Instructions for submitting your resume:</Typography>
          <ol>
            <li>
              Resume should be in <b>PDF</b> format only.
            </li>
            <li>
              The maximum permissible file size is <b>200KB</b>.
            </li>
            <li>
              You can have at most 5 verified (including pending) resumes.
            </li>
            <li>
              Each of your resume names should be <b>{resumeName}</b>
            </li>
            <li>
              Select the appropriate <b>Role</b> before uploading.
            </li>
          </ol>
        </div>
        <Stack>
          <DataGrid
            rows={allResumes}
            getRowId={(row) => row.ID}
            columns={columns}
          />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <h2 style={{ margin: "0 auto 25px auto", padding: "0 auto" }}>
            Upload Resume
          </h2>
          <form onSubmit={handleSubmit}>
            <RadioGroup
              aria-label="resume-type"
              name="resume-type"
              value={resumeType}
              onChange={handleResumeTypeChange}
              row
            >
              <FormControlLabel
                value="SINGLE"
                control={<Radio />}
                label="Single Resume"
              />
              <FormControlLabel
                value="MASTER"
                control={<Radio />}
                label="Master Resume"
              />
            </RadioGroup>

            {resumeType === "SINGLE" && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="resume-tag-label">Role</InputLabel>
                <Select
                  labelId="resume-tag-label"
                  id="resume-tag-select"
                  value={resumeTag}
                  label="Role"
                  onChange={handleResumeTagChange}
                  required
                >
                  <MenuItem value="ME Core">Mechanical Core</MenuItem>
                  <MenuItem value="EE Core">Electrical Core</MenuItem>
                  <MenuItem value="Analyst">Analyst</MenuItem>
                  <MenuItem value="Product Management">Product Management</MenuItem>
                  <MenuItem value="SDE">SDE</MenuItem>
                  <MenuItem value="Consulting">Consulting</MenuItem>
                  <MenuItem value="MSE Core">MSE Core</MenuItem>
                  <MenuItem value="CHE Core">CHE Core</MenuItem>
                  <MenuItem value="AE Core">AE Core</MenuItem>
                  <MenuItem value="Quant">Quant</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                  <MenuItem value="BSBE Core">BSBE Core</MenuItem>
                  <MenuItem value="CE Core">CE Core</MenuItem>
                </Select>
              </FormControl>
            )}

            <Box
              sx={{
                m: 5,
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2} justifyContent="center" alignItems="center">
                <label htmlFor="icon-button-file">
                  <Input
                    accept="application/pdf"
                    id="icon-button-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <Fab
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                  >
                    {success ? <CheckIcon /> : <SaveIcon />}
                    {loading && (
                      <CircularProgress
                        size={68}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: -6,
                          left: -6,
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Fab>
                </label>
                <Typography variant="subtitle1">{fileSaved?.name}</Typography>
              </Stack>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!success || !resumeTag}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
Resume.layout = "studentPhaseDashboard";
export default Resume;
