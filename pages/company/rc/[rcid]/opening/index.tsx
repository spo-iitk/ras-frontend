import React from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";

const ROUTE_PATH = "/company/rc/[rcId]/opening/[openingId]";
const ROUTE_PATH_PROFORMA = "/company/rc/[rcId]/proforma/[proformaId]";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "rolename",
    headerName: "Role name",
    width: 400,
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    width: 200,
  },
  {
    field: "proforma",
    headerName: "Proforma",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{
          pathname: ROUTE_PATH_PROFORMA,
          query: { rcId: 1, proformaId: 1 },
        }}
        passHref
      >
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          {params.value}
        </ActiveButton>
      </Link>
    ),
  },
  {
    field: "applicants",
    headerName: "View Applicants",
    sortable: false,
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{ pathname: ROUTE_PATH, query: { rcId: 1, openingId: 1 } }}
        passHref
      >
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          {params.value}
        </ActiveButton>
      </Link>
    ),
  },
];

const rows = [
  {
    id: 1,
    rolename: "Software Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 2,
    rolename: "Quant Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 3,
    rolename: "Trading Ananlysis Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 4,
    rolename: "Software Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 5,
    rolename: "Quant Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 6,
    rolename: "Trading Ananlysis Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 7,
    rolename: "Software Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 8,
    rolename: "Quant Development Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
  {
    id: 9,
    rolename: "Trading Ananlysis Intern",
    deadline: "9/12/2022",
    proforma: "View",
    applicants: "View",
  },
];

function Applications() {
  return (
    <div className="container">
      <Meta title="Applications - QuadEye" />
      <Stack>
        <h1>Applications</h1>
        <h2>Intern Season</h2>
        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Applications.layout = "companyPhaseDashboard";
export default Applications;
