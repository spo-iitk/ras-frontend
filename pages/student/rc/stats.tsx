import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "Roll_no",
    headerName: "Roll No.",
    width: 200,
  },
  {
    field: "Company_Name",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "Designation",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "Program",
    headerName: "Program",
    width: 200,
  },
  {
    field: "Branch",
    headerName: "Branch",
    width: 100,
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
