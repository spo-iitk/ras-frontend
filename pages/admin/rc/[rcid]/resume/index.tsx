import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Meta from "@components/Meta";
import ResumeClarification from "@components/Modals/resumeClarification";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Modal, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "@styles/adminPhase.module.css";
import * as React from "react";
import { useState } from "react";

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
    renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [openNew, setOpenNew] = useState(false);
      const handleOpenNew = () => {
        setOpenNew(true);
      };
      const handleCloseNew = () => {
        setOpenNew(false);
      };
      return (
        <div>
          <Modal open={openNew} onClose={handleCloseNew}>
            <ResumeClarification
              handleCloseNew={handleCloseNew}
              resumeId={params.row.resumeid}
            />
          </Modal>
          <ActiveButton sx={{ height: 30 }} onClick={handleOpenNew}>
            CLICK HERE
          </ActiveButton>
        </div>
      );
    },
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
        <h1>Internship 2022-23 Phase 1</h1>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h2>Resume</h2>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
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
