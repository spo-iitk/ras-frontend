import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "applicationDeadline",
    headerName: "Application Deadline",
    width: 200,
  },
  {
    field: "Actions",
    headerName: "Actions",
    width: 200,
    renderCell: () => (
      <Link
        href={{
          pathname: `admin/rc`,
          query: {
            rcId: 1,
          },
        }}
      >
        <Button variant="contained" color="primary">
          View Proforma
        </Button>
      </Link>
    ),
  },
];

const rows: never[] = [];

function index() {
  return (
    <div>
      <Meta title="Proforma" />
      <h2>Proforma</h2>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

index.layout = "adminPhaseDashBoard";
export default index;
