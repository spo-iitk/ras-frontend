import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { Card, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "@styles/adminPhase.module.css";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columns: GridColDef[] = [
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
    width: 400,
    renderCell: () => (
      <Stack direction="row" spacing={18}>
        <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
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
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Master Company Database" />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { xs: "100%", sm: "100%", margin: "0px auto" },
        }}
      >
        <Grid container spacing={2} alignItems="center">
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
          <Grid item xs={12}>
            <div
              className={styles.datagridCompany}
              style={{ height: 500, margin: "20px auto" }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
              />
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
