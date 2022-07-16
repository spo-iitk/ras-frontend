import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";
import { BranchStats as StatsType } from "@callbacks/admin/rc/stats";
import { getDeptProgram } from "@components/Parser/parser";

const columns: GridColDef[] = [
  {
    field: "program_department_id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "Program Department",
    headerName: "Branch",
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
  {
    field: "total",
    headerName: "Total Registered Students",
  },
  {
    field: "pre_offer",
    headerName: "Total PPO/PIO",
  },
  {
    field: "recruited",
    headerName: "Total Placed",
    width: 150,
    sortable: false,
  },
  {
    field: "percentplaced",
    headerName: "% Placed",
    valueGetter: (params) =>
      `${
        Math.round(
          ((params.row.recruited + params.row.pre_offer) * 10000) /
            params.row.total
        ) / 100
      }%`,
  },
];

function BranchStats(params: { data: StatsType[]; isLoading: boolean }) {
  const { data, isLoading } = params;
  if (data && data.length > 0)
    return (
      <div>
        <Meta title=" Stats Branchwise" />
        <h2>Stats &gt; Branch-Wise</h2>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.program_department_id}
          loading={isLoading}
        />
      </div>
    );
  return (
    <div>
      <Meta title=" Stats Branchwise" />
      <h2>Stats &gt; Branch-Wise</h2>
      <DataGrid
        rows={[]}
        columns={columns}
        getRowId={(row) => row.program_department_id}
        loading={isLoading}
      />
    </div>
  );
}

BranchStats.layout = "adminPhaseDashBoard";
export default BranchStats;
