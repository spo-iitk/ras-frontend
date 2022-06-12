import React from "react";
import { Stack } from "@mui/material";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import InactiveButton from "@components/Buttons/InactiveButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "recruitmentDriveName",
    headerName: "Recruitment Drive Name",
    width: 400,
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
    width: 200,
  },
  {
    field: "date",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <InactiveButton sx={{ height: 30, width: "100%" }}>
        {params.value}
      </InactiveButton>
    ),
  },
];

const rows = [
  {
    id: "1",
    recruitmentDriveName: "internSeason",
    type: "Intern",
    date: "May 26, 2022",
    status: "Inactive",
  },
];

function Index() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - Index" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridIndex}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            onCellClick={() => {
              router.push("rc/1");
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
