import { FormControl, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DataGrid from "@components/DataGrid";

const CompanyHistoryColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "RecruitmentDrive",
    headerName: "Recruitment Drive",
    flex: 1,
  },
  {
    field: "Comments",
    headerName: "Comments",
    flex: 1,
    renderCell: () => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <FormControl sx={{ m: 1 }}>
          <TextField
            label="Comment"
            id="comment"
            variant="standard"
            sx={{ minWidth: "20vw" }}
          />
        </FormControl>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    ),
  },
];

const companyHistoryRows: never[] = [];

function CompanyHistory() {
  return (
    <div>
      <Stack>
        <h2>Company History</h2>
        <DataGrid rows={companyHistoryRows} columns={CompanyHistoryColumns} />
      </Stack>
    </div>
  );
}

export default CompanyHistory;
