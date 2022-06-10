import React from "react";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import {
  Grid,
  Stack,
  Card,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ActiveButton from "@components/Buttons/ActiveButton";
import DownloadIcon from "@mui/icons-material/Download";

const CompanyTags = ["Software", "Non-Core"];

const HRcotactDetailsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "HRname",
    headerName: "HR Name",
    width: 400,
  },
  {
    field: "HRemail",
    headerName: "HR E-mail",
    width: 400,
  },
  {
    field: "HRcontact",
    headerName: "HR Contact",
    width: 475,
    renderCell: (cellValues) => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <span>{cellValues.row.HRcontact}</span>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    ),
  },
];

const HRcotactDetailsRows = [
  {
    id: 1,
    HRname: "Name 1",
    HRemail: "Name1@examples.com",
    HRcontact: "7007152156",
  },
  {
    id: 2,
    HRname: "Name 2",
    HRemail: "Name2@examples.com",
    HRcontact: "7007152156",
  },
];

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
        <IconButton>
          <MoreVertIcon />
        </IconButton>
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
];

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

const CompanyHistoryRows = [
  {
    id: 1,
    RecruitmentDrive: "Internship 2022-23 Phase 1",
  },
];
function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Master Company Dashboard" />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { sm: "100%", margin: "0px auto" },
        }}
      >
        <Stack marginLeft="2em">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1>Comapny Profile</h1>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Grid
            container
            sx={{
              padding: 3,
              width: {
                sm: "100%",
                margin: "0px auto",
              },
              position: "relative",
            }}
          >
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Comapny Name
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              XYZ
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Tags
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              {CompanyTags.map((tag) => (
                <span key="tag">{tag} | </span>
              ))}
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Website
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              <Link href="#">
                <a>https://xyz.com</a>
              </Link>
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Desription
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              Lorememisi
            </Grid>
          </Grid>
        </Stack>
      </Card>
      <br />
      <br />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { sm: "100%", margin: "0px auto" },
        }}
      >
        <Stack>
          <Stack direction={{ sm: "row", xs: "column" }}>
            <h1>HR Contact Details</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <DownloadIcon />
              </IconButton>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div style={{ height: 500, margin: "0px auto", width: "100%" }}>
            <DataGrid
              rows={HRcotactDetailsRows}
              columns={HRcotactDetailsColumns}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Stack>
      </Card>
      <br />
      <br />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { sm: "100%", margin: "0px auto" },
        }}
      >
        <Stack>
          <Stack direction={{ sm: "row", xs: "column" }}>
            <h1>Past Hires</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div style={{ height: 500, margin: "0px auto", width: "100%" }}>
            <DataGrid
              rows={PastHireRows}
              columns={PastHireColumns}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Stack>
      </Card>
      <br />
      <br />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { sm: "100%", margin: "0px auto" },
        }}
      >
        <Stack>
          <Stack direction={{ sm: "row", xs: "column" }}>
            <h1>Comapny History</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <DownloadIcon />
              </IconButton>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div style={{ height: 500, margin: "0px auto", width: "100%" }}>
            <DataGrid
              rows={CompanyHistoryRows}
              columns={CompanyHistoryColumns}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Stack>
      </Card>
    </div>
  );
}
Index.layout = "adminDashBoard";
export default Index;
