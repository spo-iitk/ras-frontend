import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "@styles/adminPhase.module.css";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InactiveButton from "@components/Buttons/InactiveButton";

const columns: GridColDef[] = [
  { field: "resumeid", headerName: "Resume ID", width: 200 },
  {
    field: "StudentName",
    headerName: "Student Name",
    width: 200,
  },
  {
    field: "Rollno",
    headerName: "Roll No.",
    width: 200,
  },
  {
    field: "ViewResume",
    headerName: "View Resume",
    width: 200,
  },
  {
    field: "AskClarification",
    headerName: "Ask Clarification",
    width: 200,
    renderCell: () => (
      <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
    ),
  },
  {
    field: "Status",
    headerName: "Status",
    width: 300,
    renderCell: (cellValues) => {
      if (cellValues.row.Status === "ACCEPTED")
        return (
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <ActiveButton sx={{ height: 30 }}>
              {cellValues.row.Status}
            </ActiveButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        );
      // if (cellValues.row.Status === "REJECTED")
      return (
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <InactiveButton sx={{ height: 30 }}>
            {cellValues.row.Status}
          </InactiveButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    resumeid: 1687524,
    StudentName: "Name 1",
    Rollno: "190875",
    ViewResume: "Resume 1",
    Status: "ACCEPTED",
  },
  {
    id: 2,
    resumeid: 1687525,
    StudentName: "Name 2",
    Rollno: "190876",
    ViewResume: "Resume 2",
    Status: "REJECTED",
  },
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Resume Dashboard" />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Resume</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </div>
        </Grid>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridResume}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Grid>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
