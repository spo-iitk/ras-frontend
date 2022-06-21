import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/student/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
  },
  {
    field: "start_date",
    headerName: "Start Date",
  },
  {
    field: "is_active",
    headerName: "Status",

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

function Overview() {
  const router = useRouter();
  const [rows, setRows] = useState<RC[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useStore();
  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token);

      setLoading(false);
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
    <div className="container">
      <Meta title="Overview - Student Dashboard " />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>

        <DataGrid
          rows={rows}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
          onCellClick={(row) => {
            router.push(`rc/${row.id}/notices`);
          }}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "studentDashboard";
export default Overview;
