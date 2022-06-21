import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "Name",
    headerName: "Name",
  },
  {
    field: "Roll_no",
    headerName: "Roll No.",
  },
  {
    field: "Company_Name",
    headerName: "Company Name",
  },
  {
    field: "Designation",
    headerName: "Designation",
  },
  {
    field: "Program",
    headerName: "Program",
  },
  {
    field: "Branch",
    headerName: "Branch",
  },
];
const rows = [
  {
    id: 1,
    Name: "Student 1",
    Roll_no: "78462",
    Company_Name: "Company 1",
    Designation: "Role 1",
    Program: "BTech",
    Branch: "ME",
  },
];

function Stats() {
  return (
    <div className="container">
      <Meta title="Statistics - Intern Season" />
      <Stack>
        <h1>Stats</h1>
        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Stats.layout = "studentPhaseDashboard";
export default Stats;
