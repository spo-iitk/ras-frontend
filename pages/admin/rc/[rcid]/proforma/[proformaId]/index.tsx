import { Button, Card, Grid, Stack } from "@mui/material";
import React from "react";
import styles from "@styles/adminPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
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
    width: 150,
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
      <Meta title="Proforma" />
      <h1>Intenship 2022-23 Phase 1</h1>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button sx={{ width: { xs: "280px" } }} variant="contained">
            View IP
          </Button>
          <Button sx={{ width: { xs: "280px" } }} variant="contained">
            Update IP
          </Button>
        </Stack>
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button sx={{ width: { xs: "280px" } }} variant="contained">
            Accept IP
          </Button>

          <Button sx={{ width: { xs: "280px" } }} variant="contained">
            View / Add Custom Questions
          </Button>
        </Stack>
      </Stack>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          margin: "50px auto",
        }}
      >
        <Grid container spacing={5} alignItems="center" justifyItems="center">
          <Grid item xs={12} lg={9}>
            <Stack>
              <h2>Student Data</h2>
              <div
                style={{ height: 500, margin: "0px auto" }}
                className={styles.datagridProformaSection}
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
          <Grid item xs={12} lg={3}>
            <Stack
              spacing={2}
              direction={{ xs: "column", md: "row", lg: "column" }}
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                >
                  Show /Hide Details To Company
                </Button>

                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                >
                  Change/Set Deadline
                </Button>
              </Stack>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                >
                  Send Reminder
                </Button>

                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                >
                  Send Customised Email
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
