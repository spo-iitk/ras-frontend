import React from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";

const ROUTE_PREFIX = "/student/rc/[rcid]";
const handleChange = (event: SelectChangeEvent, setAge: any) => {
  setAge(event.target.value);
};

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
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "proforma",
    headerName: "Proforma",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{
          pathname: `${ROUTE_PREFIX}/proforma/[proformaId]`,
          query: {
            rcid: 1,
            proformaId: 1,
          },
        }}
      >
        <ActiveButton sx={{ width: "100%" }}>{params.value}</ActiveButton>
      </Link>
    ),
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    width: 200,
  },
  {
    field: "resume",
    headerName: "Select Resume",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={params.value.age}
          onChange={(e) => handleChange(e, params.value.setAge)}
          label="Resume"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Resume 1</MenuItem>
          <MenuItem value={20}>Resume 2</MenuItem>
          <MenuItem value={30}>Resume 3</MenuItem>
        </Select>
      </FormControl>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{
          pathname: `${ROUTE_PREFIX}/opening/[openingId]/apply`,
          query: {
            rcid: 1,
            openingId: 1,
          },
        }}
      >
        <ActiveButton sx={{ width: "100%" }}>{params.value}</ActiveButton>
      </Link>
    ),
  },
];

function Openings() {
  const [age, setAge] = React.useState("");

  const rows = [
    {
      id: "1",
      companyName: "Company",
      role: "Software Developer",
      proforma: "View",
      deadline: "May 26, 2022 8:00pm",
      resume: { age, setAge },
      action: "Apply",
    },
  ];

  return (
    <div className="container">
      <Meta title="Openings" />
      <Stack>
        <h1>Job Openings</h1>
        <DataGrid rows={rows} columns={columns} />
      </Stack>
    </div>
  );
}

Openings.layout = "studentPhaseDashboard";
export default Openings;
