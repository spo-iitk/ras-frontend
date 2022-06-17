import React from "react";
import { Grid, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "company",
    headerName: "Company",
    width: 300,
  },
  {
    field: "registered_on",
    headerName: "Registered on",
    width: 300,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "viewdetails",
    headerName: "View Details",
    width: 400,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: () => (
      <ActiveButton sx={{ height: 30, width: "50%" }}>Click</ActiveButton>
    ),
  },
];

const rows = [
  {
    id: "1",
    company: "Company 1",
    registered_on: "June 10th,2022",
    viewdetails: "",
  },
  {
    id: "2",
    company: "Company 2",
    registered_on: "June 15th,2022",
    viewdetails: "",
  },
];

function CompanyStudent() {
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - CompanyStudent" />
      <Stack>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h1>Company</h1>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <Tooltip TransitionComponent={Zoom} title="Download Excel">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <IconButton>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridCompanyStudent}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

CompanyStudent.layout = "adminPhaseDashBoard";
export default CompanyStudent;
