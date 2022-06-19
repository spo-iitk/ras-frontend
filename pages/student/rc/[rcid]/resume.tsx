import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Grid, IconButton, Modal, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";

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

const divStyle = {
  margin: "15px 0 auto 0",
  padding: "0",
  width: "100%",
};

const boxbuttonStyle = {
  width: "100%",
  height: "40px",
  border: "inherit solid 2px",
  borderRadius: "10px",
};

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    align: "center",
    headerAlign: "center",
    width: 100,
  },
  {
    field: "resumeLink",
    headerName: "Resume Link",
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActiveButton sx={{ height: 30, width: "100%" }}>
        {params.value}
      </ActiveButton>
    ),
    width: 200,
  },
  {
    field: "uploadTime",
    headerName: "Upload Time",
    align: "center",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "comments",
    headerName: "Comments from SPO",
    align: "center",
    headerAlign: "center",
    width: 300,
  },
  {
    field: "status",
    headerName: "Verification Status",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <div>
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          {params.value}
        </ActiveButton>
      </div>
    ),
    width: 190,
  },
];
const rows = [
  {
    id: 1,
    resumeLink: "VIEW",
    uploadTime: "12:00AM 31 May 2022",
    comments: "Hello World",
    status: "True",
  },
];

function submitResume() {
  return 0;
}
function Resume() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="container">
        <Meta title="Manage Resume - Intern Season" />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h1>Manage Resume</h1>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Stack>
          <DataGrid rows={rows} columns={columns} />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <h1 style={{ margin: "0 auto 25px auto", padding: "0 auto" }}>
            Upload Resume
          </h1>
          <TextField
            name="upload-pdf"
            type="file"
            aria-hidden="true"
            title=""
          />
          <div style={divStyle}>
            <Button
              style={boxbuttonStyle}
              variant="contained"
              onClick={submitResume}
            >
              Submit File
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
Resume.layout = "studentPhaseDashboard";
export default Resume;
