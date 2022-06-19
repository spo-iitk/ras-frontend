import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/router";

import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import addCompanyRequest, {
  Company,
  HR,
} from "@callbacks/admin/company/company";
import useStore from "@store/store";
import AddHRMD from "@components/Modals/AddHRAdminMD";

const HRcotactDetailsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "name",
    headerName: "HR Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "HR E-mail",
    width: 200,
  },
  {
    field: "phone",
    headerName: "HR Contact",
    width: 250,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 250,
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
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [CompanyData, setCompanyData] = useState<Company>();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      let response = await addCompanyRequest.get(token, companyId);
      setCompanyData(response);
    };
    fetchCompanyDetails();
  }, [companyId, token]);
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [HRcontactRows, setHRcontactRows] = useState<HR[]>([]);
  useEffect(() => {
    const fetchHRDetails = async () => {
      let response = await addCompanyRequest.getAllHR(token, companyId);
      for (let i = 0; i < response.length; i += 1) {
        response[i].id = response[i].ID;
      }
      setHRcontactRows(response);
    };
    if (router.isReady) {
      fetchHRDetails();
    }
  }, [companyId, router.isReady, token]);
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
            <h1>Company Profile</h1>
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
              Company Name
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              {CompanyData?.name}
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Tags
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              <span key="tag">{CompanyData?.tags}</span>
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Website
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              <Link href="#">
                <a>{CompanyData?.website}</a>
              </Link>
            </Grid>
            <Grid item xs={6} textAlign="center" sx={{ padding: 3 }}>
              Description
            </Grid>
            <Grid xs={6} textAlign="center" sx={{ padding: 3 }}>
              {CompanyData?.description}
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
              <IconButton onClick={handleOpenNew}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
          <div style={{ height: 500, margin: "0px auto", width: "100%" }}>
            <DataGrid
              rows={HRcontactRows}
              columns={HRcotactDetailsColumns}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Stack>
        <Modal open={openNew} onClose={handleCloseNew}>
          <AddHRMD handleCloseNew={handleCloseNew} />
        </Modal>
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
