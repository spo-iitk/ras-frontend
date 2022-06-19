import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import styles from "@styles/studentInternPhase.module.css";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/student/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";
import { errorNotification } from "@callbacks/notifcation";
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
  {
    field: "remarks",
    headerName: "Remarks",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
];

let rows: RC[] = [];
function Overview() {
  const router = useRouter();
  const [row, setRow] = useState<RC[]>(rows);
  const { token } = useStore();
  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token).catch((err) => {
        errorNotification(
          "Error",
          err?.response.data.message || "Unable to fetch student data"
        );
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
  }, [token]);
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridOverView}
        >
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            onCellClick={() => {
              router.push(`rc/{row.data.id}/notices`);
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

Overview.layout = "studentDashboard";
export default Overview;
