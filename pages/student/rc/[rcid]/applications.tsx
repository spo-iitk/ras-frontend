import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Grid, Stack } from "@mui/material";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const sideTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 250,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    width: 200,
  },
  {
    field: "resume",
    headerName: "Applied Resume",
    sortable: false,
    width: 200,
  },
  {
    field: "withdraw",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: () => (
      <Button variant="contained" color="primary" sx={{ width: "100%" }}>
        Withdraw
      </Button>
    ),
  },
];
const rows = [
  {
    id: 1,
    companyName: "Google",
    role: "Software Dev",
    deadline: "12:00AM 31 May 2022",
    resume: "ID:2 Page Software Dev ",
  },
  {
    id: 2,
    companyName: "Microsoft",
    role: "Software Dev",
    deadline: "12:00AM 31 May 2022",
    resume: "ID:1 Page Software Dev",
  },
];
const applicationParams = {
  applications: rows.length,
};
function Applications() {
  return (
    <div className="container">
      <Meta title="Applications - Intern Season" />
      <Grid
        container
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Grid item xs={12} md={6}>
          <h1>Your Applications</h1>
        </Grid>
        <Grid item xs={12} md={6} sx={sideTextStyle}>
          <h2>Total Applications : {applicationParams.applications}</h2>
        </Grid>
      </Grid>
      <Stack>
        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}
Applications.layout = "studentPhaseDashboard";
export default Applications;
