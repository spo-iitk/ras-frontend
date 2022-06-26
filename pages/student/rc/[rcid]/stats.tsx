import React, { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import statRequest from "@callbacks/student/rc/stat";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "Name",
    headerName: "Name",
  },
  {
    field: "Roll_no",
    headerName: "Roll No.",
  },
  {
    field: "company_name",
    headerName: "Company Name",
  },
  {
    field: "role",
    headerName: "Role",
  },
  {
    field: "type",
    headerName: "Type",
  },
  {
    field: "Program",
    headerName: "Program",
  },
  {
    field: "Branch",
    headerName: "Branch",
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
      <Meta title="Statistics " />
      <Stack>
        <h1>Stats</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.student_recruitment_cycle_id}
        />
      </Stack>
    </div>
  );
}

Stats.layout = "studentPhaseDashboard";
export default Stats;
