import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import rcRequest, { RC } from "@callbacks/company/rc/rc";
import useStore from "@store/store";
import InactiveButton from "@components/Buttons/InactiveButton";

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
function Overview(): JSX.Element {
  const { token } = useStore();
  const [rows, setRows] = useState<RC[]>([]);
  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token);
      console.log(response);
      for (let i = 0; i < response.length; i += 1) {
        response[i].name = `${response[i].type} ${response[i].phase}`;
      }
      setRows(rows);
    };
    getRC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="container">
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>

        <DataGrid rows={rows} getRowId={(row) => row.ID} columns={columns} />
      </Stack>
    </div>
  );
}

Overview.layout = "companyDashboard";
export default Overview;
