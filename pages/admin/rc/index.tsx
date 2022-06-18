import React, { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/admin/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
    width: 200,
  },
  {
    field: "academic_year",
    headerName: "Session",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
    width: 175,
  },
  {
    field: "phase",
    headerName: "Recruitment Phase",
    width: 200,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 150,
  },
  {
    field: "is_active",
    headerName: "Status",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <>
        {!params.value && (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            INACTIVE
          </InactiveButton>
        )}
        {params.value && (
          <ActiveButton sx={{ height: 30, width: "100%" }}>ACTIVE</ActiveButton>
        )}
      </>
    ),
  },
];

let rows: RC[] = [];
function Index() {
  const router = useRouter();
  const [row, setRow] = useState<RC[]>(rows);
  useEffect(() => {
    const getRC = async () => {
      const token = sessionStorage.getItem("token") || "";
      const response = await rcRequest.getAll(token).catch((err) => {
        console.log(err);
        return [] as RC[];
      });
      rows = response;
      for (let i = 0; i < response.length; i += 1) {
        rows[i].id = response[i].ID;
        rows[i].name = `${response[i].type} ${response[i].phase}`;
        rows[i].start_date = new Date(
          response[i].start_date
        ).toLocaleDateString();
      }
      setRow(rows);
    };
    getRC();
  }, []);
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - Index" />
      <Stack>
        <h1>Dashboard</h1>
        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <div>
            <h2>Recruitment Cycle</h2>
          </div>
          <div>
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridIndex}
        >
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            onCellClick={() => {
              router.push(`rc/ {row.id}`);
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
