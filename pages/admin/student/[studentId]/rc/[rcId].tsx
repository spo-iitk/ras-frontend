import React from "react";
import styles from "@styles/internPhase.module.css";
import Meta from "@components/Meta";
import { Grid, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

const sideTextStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "flex-end",
  fontSize: "small",
  width: "100%",
};
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
  },
  {
    field: "id",
    headerName: "Roll Number",
    width: 250,
  },
  {
    field: "program",
    headerName: "Program",
    width: 100,
  },
  {
    field: "dept",
    headerName: "Department",
    width: 150,
  },
  {
    field: "gradYear",
    headerName: "Graduation Year",
    width: 125,
  },
  {
    field: "details",
    headerName: "View Details",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <ActiveButton
        sx={{ width: "100%" }}
        onClick={() => {
          window.location.href = params.value;
        }}
      >
        Click Here
      </ActiveButton>
    ),
  },
];
const rows = [
  {
    id: 211105,
    name: "Tejas Ahuja",
    program: "BTECH",
    dept: "EE",
    gradYear: "2025",
    details: "/change link",
  },
];
function RcStudent() {
  return (
    <div className={styles.container}>
      <Meta title="ADMIN || Master Database (Student)" />
      <Grid
        container
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Grid item xs={8} md={6}>
          <h1>Master Database (Students)</h1>
        </Grid>
        <div style={sideTextStyle}>
          <Grid
            item
            xs={8}
            md={6}
            style={{ width: "100%", margin: "0 0 0 47%", right: 0 }}
          >
            <ActiveButton
              sx={{ width: "100%" }}
              onClick={() => {
                window.location.href = "../../unfreeze";
              }}
            >
              UNFREEZE
            </ActiveButton>
          </Grid>
          <Grid
            item
            xs={8}
            md={6}
            style={{ width: "100%", margin: "0 47% 0 0", right: 0 }}
          >
            <InactiveButton
              sx={{ width: "100%" }}
              onClick={() => {
                window.location.href = "../../freeze";
              }}
            >
              FREEZE
            </InactiveButton>
          </Grid>
        </div>
      </Grid>
      <Stack>
        <div
          style={{ height: 500, margin: "10px auto" }}
          className={styles.datagridApplications}
        >
          <DataGrid rows={rows} columns={columns} pageSize={7} />
        </div>
      </Stack>
    </div>
  );
}
RcStudent.layout = "adminDashBoard";
export default RcStudent;
