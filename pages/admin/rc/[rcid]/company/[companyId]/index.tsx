import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import styles from "../../../../../../styles/adminPhase.module.css";
import ActiveButton from "../../../../../../components/Buttons/ActiveButton";
import Meta from "../../../../../../components/Meta";

const info = [
  {
    field: "Name",
    value: "XYZ",
  },
  {
    field: "Email",
    value: "XYZ@company.com",
  },
  {
    field: "Phone number",
    value: "+91 6969696969",
  },
  {
    field: "Username",
    value: "XYZ@12",
  },
];

const columns: GridColDef[] = [
  {
    field: "designation",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "activeApplicants",
    headerName: "Active applicants",
    width: 200,
  },
  {
    field: "totalApplicants",
    headerName: "Total applicants",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    designation: "Role 1",
    activeApplicants: "102",
    totalApplicants: "105",
    status: "Accepted",
    deadline: "May 26,2019",
  },
];

const ButtonContainer = {
  display: "flex",
  justifyContent: "space-around",
};
function Index() {
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <Meta title="Company Dashboard" />
      <h1>COMPANY NAME</h1>
      <div style={ButtonContainer}>
        <ActiveButton>VIEW COMPANY HISTORY</ActiveButton>
        <ActiveButton>CONTACT DETAILS</ActiveButton>
        <ActiveButton>PAST HIRES</ActiveButton>
        <ActiveButton>ADD PPO/PIIO</ActiveButton>
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ p: 2, fontWeight: 600, fontSize: "1.5rem" }}>
                Active Contact HR Details
              </TableCell>
            </TableRow>
            {info.map((item) => (
              <TableRow key={item.field}>
                <TableCell>{item.field}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Grid container spacing={2} component={Paper}>
        <Grid item xs={11}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Internship Roles</h2>
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid
          item
          xs={11}
          style={{ height: 500, margin: "20px auto" }}
          className={styles.datagridBranch}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Index.layout = "studentDashboard";
export default Index;
