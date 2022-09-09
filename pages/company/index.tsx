import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import rcRequest, { RC } from "@callbacks/company/rc/rc";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "enrolled",
    headerName: "Action",
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params?.row?.enrolled) {
        return (
          <Button
            variant="contained"
            href={`/company/rc/${params.row.id}`}
            sx={{ height: 30, width: "40%" }}
          >
            View
          </Button>
        );
      }
      return (
        <Button
          variant="contained"
          color="success"
          sx={{ height: 30, width: "40%" }}
          href={`/company/rc/${params.row.id}/enroll`}
        >
          Enroll
        </Button>
      );
    },
  },
];
function Overview(): JSX.Element {
  const { token, setRCName } = useStore();
  const [rows, setRows] = useState<RC[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRC = async () => {
      setLoading(true);
      const response = await rcRequest.getAll(token);
      if (response?.length > 0) setRows(response);
      setLoading(false);
    };
    if (token !== "") {
      getRC();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <Meta title="Dashboard" />
      <Stack>
        <h2>Recruitment Cycle</h2>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={(params) => {
            setRCName(params.row.name);
          }}
          loading={loading}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "companyDashboard";
export default Overview;
