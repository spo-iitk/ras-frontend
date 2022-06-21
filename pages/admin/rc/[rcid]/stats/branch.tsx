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
    field: "branch",
    headerName: "Branch",
    width: 200,
  },
  {
    field: "program",
    headerName: "Program Drive Name",
    width: 200,
  },
  {
    field: "totalregisteredstudents",
    headerName: "Total Registered Students",
    width: 200,
  },
  {
    field: "ppo",
    headerName: "PPO",
    width: 150,
  },
  {
    field: "totalplaced",
    headerName: "Total Placed",
    width: 150,
    sortable: false,
  },
  {
    field: "percentplaced",
    headerName: "% Placed",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    branch: "Aero Space",
    program: "B. Tech.",
    totalregisteredstudents: "78",
    ppo: "7",
    totalplaced: "7",
    percentplaced: "10",
  },
];

function Branch() {
  return (
    <div className="container">
      <Meta title="Student Dashboard - Branch" />
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={6}>
          <h1>Stats &gt; Branch-Wise</h1>
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

Branch.layout = "adminPhaseDashBoard";
export default Branch;
