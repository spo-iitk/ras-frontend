import React from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";

const PastHireColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "RecruitmentDrive",
    headerName: "Recruitment Drive",
    width: 375,
  },
  {
    field: "TotalHires",
    headerName: "No. of Total Hires",
    width: 300,
  },
  {
    field: "PIOPPO",
    headerName: "No. of PIO/PPO",
    width: 300,
  },
  {
    field: "ViewStudents",
    headerName: "View Students",
    width: 300,
    renderCell: () => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
      </Stack>
    ),
  },
];

const PastHireRows = [
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
    TotalHires: "5",
    PIOPPO: "5",
  },
];

function demo() {
  return (
    <div>
      <h1>Hello</h1>
      <DataGrid rows={PastHireRows} columns={PastHireColumns} />
      <h4>Hello</h4>
    </div>
  );
}

export default demo;
