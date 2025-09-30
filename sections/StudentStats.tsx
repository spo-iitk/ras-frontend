import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

import Meta from "@components/Meta";
import { StudentStats as StatsType } from "@callbacks/admin/rc/stats";
import DataGrid from "@components/DataGrid";
import { getDeptProgram } from "@components/Parser/parser";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "roll_no",
    headerName: "Roll No.",
  },
  {
    field: "email",
    headerName: "Email",
    hide: true,
  },
  {
    field: "company_name",
    headerName: "Company Name",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "profile",
    headerName: "Profile",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "Program Department",
    headerName: "Branch",
    sortable: false,
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
 {
  field: "time",
  headerName: "Time",
  renderCell: (params) => (
    <Tooltip title={params.value}>
      <div>{new Date(params.value).toLocaleString()}</div>
    </Tooltip>
  )
}
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
