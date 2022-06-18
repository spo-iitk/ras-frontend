import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

import styles from "@styles/adminPhase.module.css";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "CompanyName",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "Tags",
    headerName: "Tags",
    width: 400,
  },
  {
    field: "ViewDetails",
    headerName: "View Details",
    width: 200,
    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Link href={`/admin/company/${params.row.id}`}>
          <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
        </Link>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    ),
  },
];

const rows = [
  {
    id: 1,
    CompanyName: "Company 1",
    Tags: "Core,PSU,Analytics,Software,Startup,Noncore",
    ViewDetails: "Click Here",
  },
  {
    id: 2,
    CompanyName: "Company 1",
    Tags: "Core,PSU,Analytics,Software,Startup,Noncore",
    ViewDetails: "Click Here",
  },
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Master Company Database" />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Master Database (Comapny)</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </div>
        </Grid>
        <div
          className={styles.datagridMasterCompany}
          style={{ height: 500, margin: "0px auto" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Grid>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
