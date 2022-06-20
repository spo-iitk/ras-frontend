import React from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "recruitmentDriveName",
    headerName: "Recruitment Drive Name",
    width: 400,
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
    width: 200,
  },
  {
    field: "details",
    headerName: "View Details",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link href="company/rc/1" passHref>
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          {params.value}
        </ActiveButton>
      </Link>
    ),
  },
];

const rows = [
  {
    id: "1",
    recruitmentDriveName: "internSeason",
    type: "Intern",
    details: "View",
  },
];

function Overview() {
  return (
    <div className="container">
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>

        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Overview.layout = "companyDashboard";
export default Overview;
