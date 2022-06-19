import React from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";

const ROUTE_PATH = "/company/rc/[rcId]/proforma/[proformaId]";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "roleName",
    headerName: "Role Name",
    width: 400,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    sortable: false,
  },
  {
    field: "proforma",
    headerName: "View Proforma",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{ pathname: ROUTE_PATH, query: { rcId: 1, proformaId: 1 } }}
        passHref
      >
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          {params.value}
        </ActiveButton>
      </Link>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: () => (
      <IconButton>
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: "1",
    roleName: "Software Intern",
    status: "Open",
    proforma: "View",
    delete: "Delete",
  },
];

function Overview() {
  return (
    <div className="container">
      <Meta title="Overview - QuadEye" />
      <Stack>
        <h1>Internship Recruitment Drive 2022-23</h1>
        <h2>Overview</h2>

        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Overview.layout = "companyPhaseDashboard";
export default Overview;
