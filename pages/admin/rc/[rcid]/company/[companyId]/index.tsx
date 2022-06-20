import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
// import { useRouter } from "next/router";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import AddPPO from "@components/Modals/addPPO";
import useStore from "@store/store";
// import addCompanyRequest, { Company } from "@callbacks/admin/company/company";
import addCompanyRequestRC, { CompanyRC } from "@callbacks/admin/rc/company";

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
    field: "id",
    headerName: "ID",
    width: 100,
  },
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

function Index() {
  const router = useRouter();
  const CID = router.query.companyId;
  const ID = (CID || "").toString();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const { token } = useStore();
  const [row, setRow] = useState<CompanyRC>({
    company_id: 0,
    company_name: "",
    recruitment_cycle_id: 0,
    hr1: "",
    hr2: "",
    hr3: "",
    comments: "",
  });
  useEffect(() => {
    const getCompanydata = async () => {
      let response = await addCompanyRequestRC.get(token, rid, ID);
      setRow(response);
    };
    getCompanydata();
  }, [token, rid, ID]);
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard" />
      <h1>{row.company_name}</h1>

      <Stack spacing={5} justifyContent="center" alignItems="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction={{ lg: "row", xs: "column" }}
        >
          {/* <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              View Company History
            </Button>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              CONTACT DETAILS
            </Button>
          </Stack> */}
          <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
            <Button sx={{ width: { xs: "280px" } }} variant="contained">
              Go to Company Master DB
            </Button>

            <Button
              sx={{ width: { xs: "280px" } }}
              variant="contained"
              onClick={handleOpenNew}
            >
              ADD PPO/PIIO
            </Button>
            <Modal open={openNew} onClose={handleCloseNew}>
              <AddPPO handleCloseNew={handleCloseNew} cname={row.name} />
            </Modal>
          </Stack>
        </Stack>
        <div>
          <Card
            elevation={5}
            sx={{ width: { xs: "300px", md: "500px" }, padding: 4 }}
          >
            <Grid container>
              {info.map((item) => (
                <Grid item xs={12} md={6} key="">
                  <h3>{item.field}</h3>
                  <Typography variant="body1">{item.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>
      </Stack>
      <br />
      <br />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Internship Roles</h2>
          <Stack direction="row" spacing={3}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
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
      </Stack>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
