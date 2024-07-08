/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Input,
  Modal,
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

import studentRequest, { Student } from "@callbacks/student/student";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import documentRequest, {
  AllStudentDocumentsResponse,
} from "@callbacks/student/rc/documents";
import { CDN_URL } from "@callbacks/constants";
import { errorNotification } from "@callbacks/notifcation";
import { getDeptProgram } from "@components/Parser/parser";

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
    headerName: "Document ID",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "type",
    headerName: "Document Type",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "path",
    headerName: "Document Link",
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
      params.row.verified?.Valid ? (
        params.row.verified?.Bool ? (
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
  // {
  //   field: "remove",
  //   headerName: "Remove Document",
  //   align: "center",
  //   headerAlign: "center",
  //   renderCell: () => (
  //     <Button variant="outlined" sx={{ color: "red" }}>
  //       DELETE
  //     </Button>
  //   ),
  // },
];

const FileInput = styled("input")({
  display: "none",
});

const fileNames = [
  "10th_marks",
  "12th_marks",
  "pingala",
  "mains",
  "advanced",
  "others",
];

const modalHeaders = [
  "10th Marksheet",
  "12th Marksheet",
  "Pingala Transcript",
  "JEE Mains Result",
  "JEE Advanced  Result",
  "Others",
];

function Documents() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [currentHeading, setCurrentHeading] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<string>("");
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [studentData, setStudent] = useState<Student>({ ID: 0 } as Student);
  const { token } = useStore();
  const [allDocuments, setAllDocuments] = useState<
    AllStudentDocumentsResponse[]
  >([]);
  const [open, setOpen] = useState(false);
  const [UploadOpen, setUploadOpen] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = (event: any) => {
    if (typeModal) {
      let error = false;
      allDocuments.forEach((doc) => {
        if (doc.type === currentHeading) error = true;
      });
      if (error) {
        errorNotification(
          "Duplicate Document",
          "You have already uploaded this document"
        );
        return;
      }
      setOpen(true);
      return;
    }
    if (event.target.id === "5") {
      setTypeModal(true);
      return;
    }
    let name = `${fileNames[parseInt(event.target.id, 10)]}_${fileName}.pdf`;
    let heading = modalHeaders[parseInt(event.target.id, 10)];
    setCurrentFile(name);
    setCurrentHeading(heading);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setFileSaved(null);
    setLoading(false);
    setCurrentFile("");
    setCurrentHeading("");
  };

  const handleTypeChange = (event: { target: { value: string } }) => {
    let name = event.target.value;
    name = name.toLowerCase().split(" ").join("_");
    if (name.length !== 0) setCurrentFile(`${name}_${fileName}.pdf`);
    else setCurrentFile("");
    setCurrentHeading(event.target.value);
  };

  const handleTypeClose = () => {
    setTypeModal(false);
  };

  const handleUploadOpen = () => setUploadOpen(true);
  const handleUploadClose = () => setUploadOpen(false);

  const isDisabled = (name: string) => {
    if (name === "Others") {
      return false;
    }
    let result = false;
    allDocuments.forEach((doc) => {
      if (doc.type === name) {
        if (doc.verified.Valid) {
          if (doc.verified.Bool) {
            result = true;
          }
        } else {
          result = true;
        }
      }
    });
    return result;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: { target: { files: any } }) => {
    const { files } = event.target;

    if (!(files && files.length > 0)) {
      setLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > 1280000) {
      errorNotification("File size too large", "Max file size is about 1MB");
      setLoading(false);
      return;
    }

    if (file.name !== currentFile) {
      errorNotification(
        "File must follow the name constraint",
        `Expected File Name: ${currentFile}`
      );
      setLoading(false);
      return;
    }

    setFileSaved(file);
    setSuccess(true);
    setLoading(false);
  };

  const fetchData = React.useCallback(async () => {
    const data = await documentRequest.get(token);
    setAllDocuments(data);
  }, [token]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let doc = { ID: 0 } as AllStudentDocumentsResponse;
    doc.sid = studentData.ID;
    doc.type = currentHeading;
    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());

    await documentRequest.post(formData, token, doc, studentData.ID);
    setFileSaved(null);
    handleClose();
    fetchData();
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const student = await studentRequest
        .get(token)
        .catch(() => ({ ID: 0 } as Student));
      if (student.ID) {
        const progdept = getDeptProgram(student.program_department_id);
        let name = `${student.roll_no.split("@")[0]} ${
          student.name
        } ${progdept}`;
        name = name.replace(/[^\w]/gi, "_");
        name = name.toLowerCase();
        setFileName(name);
        setStudent(student);
      }
    };

    if (router.isReady) {
      fetchData();
      fetchStudent();
    }

    setLoading(false);
    setSuccess(false);
  }, [fetchData, token, router.isReady]);

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

  return (
    <>
      <div>
        <Meta title="Manage Documents " />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>Manage Documents</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleUploadOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div>
          <Typography>Instructions for submitting your resume:</Typography>
          <ol>
            <li>
              Documents should be in <b>PDF</b> format only.
            </li>
            <li>
              The maximum permissible file size is <b>1MB</b>.{" "}
            </li>
            <li>
              Be careful while uploading documents because you can only upload a
              document <b>once</b> before being verified.{" "}
            </li>
            <li>
              You have to upload the following documents:
              <ol>
                <li>10th Marksheet</li>
                <li>12th Marksheet</li>
                <li>Pingala Verification</li>
                <li>JEE Mains Result</li>
                <li>JEE Advanced Result</li>
                <li>Any other necessary document</li>
              </ol>
            </li>
          </ol>
        </div>
        <Stack>
          <DataGrid
            rows={allDocuments}
            getRowId={(row) => row.ID}
            columns={columns}
          />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <h2
            style={{
              margin: "0 auto 25px auto",
              padding: "0 auto",
              textTransform: "capitalize",
            }}
          >
            Upload {currentHeading}
          </h2>
          <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>
            File Name: {currentFile}
          </p>
          <form onSubmit={handleSubmit}>
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
                  <FileInput
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
              disabled={!success}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={UploadOpen} onClose={handleUploadClose}>
        <Box sx={boxStyle}>
          <h2>Documents to upload: </h2>
          <Box
            sx={{
              m: 5,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {modalHeaders.map((name, index) => (
              <Button
                variant="contained"
                sx={{ m: 1 }}
                fullWidth
                id={index.toString()}
                onClick={handleOpen}
                disabled={isDisabled(name)}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>
      <Modal open={typeModal} onClose={handleTypeClose}>
        <Box sx={boxStyle}>
          <h2>Specify Document Type: </h2>
          <Box
            sx={{
              m: 5,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Input
              type="text"
              onChange={handleTypeChange}
              sx={{ textTransform: "capitalize" }}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            disabled={!currentFile.length}
            onClick={handleOpen}
          >
            Upload
          </Button>
        </Box>
      </Modal>
    </>
  );
}
Documents.layout = "studentDashboard";
export default Documents;
