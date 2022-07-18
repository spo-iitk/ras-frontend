import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import { StudentStats as StatsType } from "@callbacks/admin/rc/stats";
import DataGrid from "@components/DataGrid";
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
    headerName: "Branch",
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

function StudentStats(params: { data: StatsType[]; isLoading: boolean }) {
  const { data, isLoading } = params;
  if (data && data.length > 0)
    return (
      <div>
        <Meta title=" Stats Studentwise" />
        <h2>Stats &gt; Student-Wise</h2>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          loading={isLoading}
        />
      </div>
    );
  return (
    <div>
      <Meta title=" Stats Studentwise" />
      <h2>Stats &gt; Student-Wise</h2>
      <DataGrid
        rows={[]}
        columns={columns}
        getRowId={(row) => row.id}
        loading={isLoading}
      />
    </div>
  );
}

StudentStats.layout = "adminPhaseDashBoard";
export default StudentStats;
