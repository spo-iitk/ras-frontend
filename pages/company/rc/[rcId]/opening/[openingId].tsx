import React from "react";
import { Stack } from "@mui/material";
import Meta from "@components/Meta";
import styles from "@styles/internPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActiveButton from "@components/Buttons/ActiveButton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "rollNo",
    headerName: "Roll No.",
    width: 200,
  },
  {
    field: "primaryProgram",
    headerName: "Primary Program",
    width: 200,
  },
  {
    field: "primaryDept",
    headerName: "Primary Department",
    width: 200,
  },
  {
    field: "secondaryDept",
    headerName: "Secondary Department",
    width: 200,
  },
  {
    field: "resume",
    headerName: "View Resume",
    sortable: false,
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActiveButton sx={{ height: 30, width: "100%" }}>
        {params.value}
      </ActiveButton>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];

const rows = [
  {
    id: 1,
    name: "Manas",
    rollNo: "200554",
    primaryProgram: "B.Tech",
    primaryDept: "CSE",
    secondaryDept: "NA",
    resume: "View",
    status: "Ok",
  },
];

function Application() {
  return (
    <div className={styles.container}>
      <Meta title="Applications - Software Development Intern" />
      <Stack>
        <h1>Software Development Intern</h1>
        <h2>Intern Season</h2>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridApplication}
        >
          <DataGrid rows={rows} columns={columns} pageSize={7} />
        </div>
      </Stack>
    </div>
  );
}

Application.layout = "companyPhaseDashboard";
export default Application;
