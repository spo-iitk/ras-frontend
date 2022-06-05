import React from "react";
import { Grid } from "@mui/material";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
    <div className={styles.container}>
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
      <div
        style={{ height: 500, margin: "20px auto" }}
        className={styles.datagridBranch}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </div>
    </div>
  );
}

Branch.layout = "adminPhaseDashBoard";
export default Branch;
