import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 90,
  },
  {
    field: "branch",
    headerName: "Branch",
    width: 200,
  },
  {
    field: "program",
    headerName: "Program Drive Name",
    width: 200,
  },
  {
    field: "totalregisteredstudents",
    headerName: "Total Registered Students",
    width: 200,
  },
  {
    field: "ppo",
    headerName: "PPO",
    width: 150,
  },
  {
    field: "totalplaced",
    headerName: "Total Placed",
    width: 150,
    sortable: false,
  },
  {
    field: "percentplaced",
    headerName: "% Placed",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    branch: "Aero Space",
    program: "B. Tech.",
    totalregisteredstudents: "78",
    ppo: "7",
    totalplaced: "7",
    percentplaced: "10",
  },
];

function BranchStatsAdmin() {
  return (
    <div>
      <Meta title="Stats Branchwise" />
      <h2>Stats &gt; Branch-Wise</h2>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

BranchStatsAdmin.layout = "adminPhaseDashBoard";
export default BranchStatsAdmin;
