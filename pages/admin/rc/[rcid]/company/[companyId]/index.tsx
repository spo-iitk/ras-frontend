import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, Stack, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";

const info = [
  {
    field: "Name",
    value: "XYZ",
  },
  {
    field: "Email",
    value: "XYZ@company.com",
  },
  {
    field: "Phone number",
    value: "+91 6969696969",
  },
  {
    field: "Username",
    value: "XYZ@12",
  },
];

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "activeApplicants",
    headerName: "Active applicants",
    width: 200,
  },
  {
    field: "totalApplicants",
    headerName: "Total applicants",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    designation: "Role 1",
    activeApplicants: "102",
    totalApplicants: "105",
    status: "Accepted",
    deadline: "May 26,2019",
  },
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard" />
      <h1>COMPANY NAME</h1>

      <Stack spacing={5} justifyContent="center" alignItems="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction={{ lg: "row", xs: "column" }}
        >
          <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              View Company History
            </Button>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              CONTACT DETAILS
            </Button>
          </Stack>
          <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              Past Hires
            </Button>

            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              ADD PPO/PIIO
            </Button>
          </Stack>
        </Stack>
        <div>
          <Card
            elevation={5}
            sx={{ width: { xs: "300px", md: "500px" }, padding: 4 }}
          >
            <Grid container>
              {info.map((item) => (
                <Grid item xs={12} md={6} key="">
                  <h3>{item.field}</h3>
                  <Typography variant="body1">{item.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>
      </Stack>
      <br />
      <br />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Internship Roles</h2>
          <Stack direction="row" spacing={3}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
        <div
          className={styles.datagridCompany}
          style={{ height: 500, margin: "20px auto" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
