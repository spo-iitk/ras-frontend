import React from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import styles from "@styles/internPhase.module.css";
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
    <div className={styles.container}>
      <Meta title="Overview - QuadEye" />
      <Stack>
        <h1>Internship Recruitment Drive 2022-23</h1>
        <h2>Overview</h2>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridOpenings}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

Overview.layout = "companyPhaseDashboard";
export default Overview;
