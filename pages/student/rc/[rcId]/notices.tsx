import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

import styles from "@styles/studentInternPhase.module.css";
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
    field: "publishedDateAndTime",
    headerName: "Published Date And Time",
    width: 200,
  },
];

const rows = [
  { id: 1, name: "Company Name : Title", publishedDateAndTime: "May 26 2019" },
];

function Notices() {
  return (
    <div className={styles.container}>
      <Meta title="Notices" />
      <Stack>
        <h1>Internship 2022-23 Phase 1</h1>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Notices</h2>
        </Stack>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridNotices}
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

Notices.layout = "studentPhaseDashboard";
export default Notices;
