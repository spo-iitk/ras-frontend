import React from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import InactiveButton from "@components/Buttons/InactiveButton";
import ActiveButton from "@components/Buttons/ActiveButton";
import DataGrid from "@components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "event",
    headerName: "Event",
    width: 200,
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 200,
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 200,
  },
  {
    field: "venue",
    headerName: "Venue",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.value !== "PRESENT") {
        return (
          <InactiveButton sx={{ height: 30, width: "60%" }}>
            {params.value}
          </InactiveButton>
        );
      }
      return (
        <ActiveButton sx={{ height: 30, width: "60%" }}>
          {params.value}
        </ActiveButton>
      );
    },
  },
];

const rows: never[] = [];

function Attendance() {
  return (
    <div className="container">
      <Meta title="Attendance " />
      <Stack>
        <h1>Attendance</h1>

        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Attendance.layout = "studentPhaseDashboard";
export default Attendance;
