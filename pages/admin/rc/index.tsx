import React, { useEffect, useState } from "react";
import { IconButton, Link, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/admin/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";

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

function Index() {
  const router = useRouter();
  const [rows, setRows] = useState<RC[]>([]);
  const { token, setRCName, setRcId } = useStore();
  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token);
      // console.log(rows);
      for (let i = 0; i < response.length; i += 1) {
        response[i].name = `${response[i].type} ${response[i].phase}`;
        response[i].start_date = new Date(
          response[i].start_date
        ).toLocaleDateString();
      }
      setRows(response);
    };
    getRC();
  }, [token]);
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
              <Link href="/admin/rc/new">
                <AddIcon />
              </Link>
            </IconButton>
          </div>
        </Stack>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridIndex}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            getRowId={(row) => row.ID}
            rowsPerPageOptions={[7]}
            onCellClick={(params) => {
              setRcId(params.row.ID);
              setRCName(
                `${params.row.type} ${params.row.academic_year} ${params.row.phase}`
              );
              router.push(`rc/${params.row.ID}`);
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
