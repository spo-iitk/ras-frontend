import React from "react";
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "rollno",
    headerName: "Roll No.",
    width: 200,
  },
  {
    field: "companyname",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 150,
  },
  {
    field: "program",
    headerName: "Program",
    width: 150,
    sortable: false,
  },
  {
    field: "branch",
    headerName: "Branch",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    name: "Student 1",
    rollno: "180021",
    companyname: "Google",
    designation: "Software Dev",
    program: "BTech",
    branch: "ME",
  },
];

function Students() {
  return (
    <div className="container">
      <Meta title=" Stats Student- Admin" />
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={6}>
          <h1>Stats &gt; Student-Wise</h1>
        </Grid>
        <Grid item xs={12} md={6} style={gridMain}>
          <div>
            <ActiveButton sx={{ width: "max-content" }}>
              DOWNLOAD EXCEL
            </ActiveButton>
          </div>
        </Grid>
      </Grid>

      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

Students.layout = "adminPhaseDashBoard";
export default Students;
