import { Button, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import React from "react";

import styles from "@styles/internPhase.module.css";
import Meta from "@components/Meta";

const BASE_ROUTE = "/student/rc/[rcId]/proforma";
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
    renderCell: (rowdata) => (
      <Link
        href={{
          pathname: `${BASE_ROUTE}/${rowdata.id}`,
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

const rows = [
  {
    id: 1,
    name: "Company Name : Title",
    role: "Role1",
    applicationDeadline: "May 26 2019",
  },
];

function Proforma() {
  return (
    <div className={styles.container}>
      <Meta title="Proforma - Intern Season" />
      <Stack>
        <h1>Internship 2022-23 Phase 1</h1>
        <h2>Proforma</h2>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridProforma}
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

Proforma.layout = "studentPhaseDashboard";
export default Proforma;
