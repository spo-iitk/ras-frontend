import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Meta from "@components/Meta";
import { Card, FormControl, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "@styles/adminPhase.module.css";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columns: GridColDef[] = [
  {
    field: "Name",
    headerName: "Student Name",
    width: 300,
  },
  {
    field: "Roll_no",
    headerName: "Roll No.",
    width: 280,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 250,
    renderCell: (params) => {
      if (params.row.Status === "Present")
        return (
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <ActiveButton sx={{ height: 30, width: "60%" }}>
              {params.row.Status}
            </ActiveButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        );
      return (
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <InactiveButton sx={{ height: 30, width: "60%" }}>
            {params.row.Status}
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
    Name: "Student 1",
    Roll_no: "78462",
    Status: "Present",
  },
  {
    id: 2,
    Name: "Student 2",
    Roll_no: "78463",
    Status: "Absent",
  },
];

function Event() {
  return (
    <div className={styles.container}>
      <Meta title="Event Details" />
      <h1 style={{ marginBottom: "4rem" }}>Internship 2022-23 Phase 1</h1>

      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "500px", sm: "900px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>View Event Details</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Name</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Name</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Date</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Start Time</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event End Time</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Venue</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Description</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              minRows={4}
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Main POC</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "40vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>COCO POCS</p>
            <TextField
              id="Cname"
              required
              sx={{
                marginLeft: "5 rem",
                width: "30vw",
                marginBottom: "0.8rem",
              }}
              fullWidth
              multiline
              variant="standard"
            />
            <TextField
              id="Cname"
              required
              sx={{
                marginLeft: "5 rem",
                width: "30vw",
                marginBottom: "0.8rem",
              }}
              fullWidth
              multiline
              variant="standard"
            />
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem", width: "30vw" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
        </Stack>
      </Card>
      <br />
      <br />
      <br />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "500px", sm: "900px", margin: "0px auto" },
        }}
      >
        <h1>Manage Attendance</h1>
        <div style={{ height: 500, margin: "0px auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Card>
      <br />
      <br />
    </div>
  );
}

Event.layout = "companyPhaseDashboard";
export default Event;
