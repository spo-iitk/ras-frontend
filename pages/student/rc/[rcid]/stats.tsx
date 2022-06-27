import React, { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import statRequest from "@callbacks/student/rc/stat";
import useStore from "@store/store";
import { getDeptProgram } from "@components/Parser/parser";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "roll_no",
    headerName: "Roll No.",
    width: 200,
  },
  {
    field: "company_name",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
  },
  {
    field: "Program Department",
    headerName: "Program Department",
    width: 150,
    sortable: false,
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
  {
    field: "Secondary Program Department",
    headerName: "Secondary Program Department",
    width: 150,
    valueGetter: (params) =>
      getDeptProgram(params.row.secondary_program_department_id),
  },
];
function Stats() {
  const [rows, setRows] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const { rcid } = useRouter().query;
  const { token } = useStore();

  useEffect(() => {
    const fetch = async () => {
      if (rcid) {
        const response = await statRequest.getAll(token, rcid.toString());
        setRows(response);
        setLoading(false);
      }
    };
    fetch();
  }, [token, rcid]);
  return (
    <div className="container">
      <Meta title="Stats" />
      <Stack>
        <h1>Stats</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Stack>
    </div>
  );
}

Stats.layout = "studentPhaseDashboard";
export default Stats;
