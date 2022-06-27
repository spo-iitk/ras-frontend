import React, { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";
import statRequest from "@callbacks/admin/rc/stats";
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
    headerName: "Program",
    width: 150,
    sortable: false,
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
  {
    field: "Secondary Program Department",
    headerName: "Branch",
    width: 150,
    valueGetter: (params) =>
      getDeptProgram(params.row.secondary_program_department_id),
  },
];

function StudentStatsAdmin() {
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
    <div>
      <Meta title=" Stats Studentwise" />
      <h2>Stats &gt; Student-Wise</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
      />
    </div>
  );
}

StudentStatsAdmin.layout = "adminPhaseDashBoard";
export default StudentStatsAdmin;
