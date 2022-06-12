import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@styles/adminPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 300,
  },
  {
    field: "rollNo",
    headerName: "Roll No",
    width: 150,
  },
  {
    field: "link",
    headerName: "Link To Resume",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
  },
];

const rows = [
  {
    id: 1,
    name: "Student Name ",
    rollNo: "123456",
    link: "Idk",
    status: "IDC",
  },
];
function Index() {
  return (
    <div className={styles.container}>
      <h1>Intenship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "500px", md: "1500px", margin: "0px auto" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sm={6}>
            <Button sx={{ width: "280px" }} variant="contained">
              View IP
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <Button sx={{ width: "280px" }} variant="contained">
              Update IP
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <Button sx={{ width: "280px" }} variant="contained">
              Accept IP
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <Button sx={{ width: "280px" }} variant="contained">
              View / Add Custom Questions
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: {
            xs: "330px",
            sm: "500px",
            md: "1500px",
            margin: "50px auto",
          },
        }}
      >
        <Grid container spacing={5} alignItems="center" justifyItems="center">
          <Grid item xs={12} md={9}>
            <Grid container>
              <Stack>
                <h2>Student Data</h2>
                <div
                  style={{ height: 500, margin: "0px auto" }}
                  className={styles.datagridNotices}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" sx={{ width: "280px" }}>
                  {" "}
                  Show /Hide Details To Company
                </Button>
              </Grid>
              <Grid item>
                <Stack>
                  <Typography>Status</Typography>
                  <Typography>If Accepted:Yes/No</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <Typography>Application Allowed:Yes/No</Typography>
                  <Typography>Deadline:IDK</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ width: "280px" }}>
                  {" "}
                  Change/Set Deadline
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ width: "280px" }}>
                  {" "}
                  Send Reminder
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ width: "280px" }}>
                  {" "}
                  Send Customised Email
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
