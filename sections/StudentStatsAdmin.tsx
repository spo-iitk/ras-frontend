import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";

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

function StudentStatsAdmin() {
  return (
    <div>
      <Meta title=" Stats Studentwise" />
      <h2>Stats &gt; Student-Wise</h2>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

StudentStatsAdmin.layout = "adminPhaseDashBoard";
export default StudentStatsAdmin;
