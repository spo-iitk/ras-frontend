import React from "react";
import { IconButton, Stack } from "@mui/material";
import Meta from "@components/Meta";
import styles from "@styles/internPhase.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import ActiveButton from "@components/Buttons/ActiveButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ROUTE_PATH = "/student/rc/[rcId]/proforma/[proformaId]";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "roleName",
    headerName: "Role Name",
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
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
    width: 100,
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
    companyName: "Optiver",
    roleName: "Software Intern",
    status: "Open",
    proforma: "View",
    delete: "Delete",
  },
];

function Proformas() {
  return (
    <div className={styles.container}>
      <Meta title="Proformas - QuadEye" />
      <Stack>
        <h1>Internship Recruitment Drive 2022-23</h1>
        <h2>Proforma</h2>
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

Proformas.layout = "studentPhaseDashboard";
export default Proformas;
