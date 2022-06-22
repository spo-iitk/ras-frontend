import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import addCompanyRequest, {
  Company,
  HR,
} from "@callbacks/admin/company/company";
import useStore from "@store/store";
import AddHRMD from "@components/Modals/AddHRAdminMD";
import HRAuth, { HRAuthResponse } from "@callbacks/auth/hrauth";
import EditCompanyMD from "@components/Modals/EditCompanyAdminMD";
import DataGrid from "@components/DataGrid";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};
function DeleteHR(props: { id: string }) {
  const { token } = useStore();
  const { id } = props;
  return (
    <IconButton
      onClick={() => {
        addCompanyRequest.deleteHR(token, id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
function AuthHR(props: { id: string; name: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HRAuthResponse>();
  const { token } = useStore();
  const det = props;
  const handleAuthHR = (data: HRAuthResponse) => {
    const authHR = async () => {
      const finData = { ...data, user_id: det.id, name: det.name };
      const response = await HRAuth.post(token, finData);
      if (response) {
        reset({ password: "" });
      }
    };
    authHR();
  };
  const [openAuthHR, setOpenAuthHR] = useState(false);
  const handleOpenAuthHR = () => {
    setOpenAuthHR(true);
  };
  const handleCloseAuthHR = () => {
    setOpenAuthHR(false);
  };
  return (
    <div>
      <ActiveButton sx={{ height: 30 }} onClick={handleOpenAuthHR}>
        Generate Auth
      </ActiveButton>
      <Modal open={openAuthHR} onClose={handleCloseAuthHR}>
        <Box sx={boxStyle}>
          <Stack spacing={3}>
            <h1>Enter New Password</h1>
            <TextField
              label="Enter New Password"
              id="password"
              type="password"
              variant="standard"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password && "Password is required"}
            />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleSubmit(handleAuthHR)}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
const HRcotactDetailsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 125,
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
  {
    field: "button1",
    headerName: "Delete HR",
    renderCell: (params) => <DeleteHR id={params.row.ID} />,
    width: 50,
    align: "center",
  },
  {
    field: "button2",
    headerName: "Send Authorization Mail",
    renderCell: (params) => (
      <AuthHR id={params.row.email} name={params.row.name} />
    ),
    width: 100,
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

const pastHireRows: never[] = [];

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

function Index() {
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [CompanyData, setCompanyData] = useState<Company>({
    id: 0,
    ID: 0,
    name: "",
    tags: "",
    website: "",
    description: "",
  });
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      let response = await addCompanyRequest.get(token, companyId);
      setCompanyData(response);
    };
    if (router.isReady) fetchCompanyDetails();
  }, [companyId, router.isReady, token]);
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [openEditComp, setOpenEditComp] = useState(false);
  const handleOpenEditComp = () => {
    setOpenEditComp(true);
  };
  const handleCloseEditComp = () => {
    setOpenEditComp(false);
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
  const deleteCompany = () => {
    const delCompany = async () => {
      await addCompanyRequest.delete(token, companyId);
    };
    router.push("/admin/company");
    delCompany();
  };
  return (
    <div className="container">
      <Meta title="Master Company Dashboard" />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h1>Company Profile</h1>
          <Stack spacing={1} direction="row">
            <IconButton onClick={handleOpenEditComp}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteCompany}>
              <DeleteIcon />
            </IconButton>
          </Stack>
          <Modal open={openEditComp} onClose={handleCloseEditComp}>
            <EditCompanyMD
              handleCloseNew={handleCloseEditComp}
              setCompanyData={setCompanyData}
              companyData={CompanyData}
              companyID={companyId}
            />
          </Modal>
        </Stack>
        <Card
          elevation={2}
          sx={{
            padding: 3,
            borderRadius: "10px",
            width: { xs: "330px", sm: "600px", margin: "10px auto" },
          }}
        >
          <Grid container spacing={5} sx={{ padding: 3 }}>
            <Grid item xs={12} sm={6}>
              <p>Company Name</p>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={CompanyData?.name}
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Tags</p>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={CompanyData?.tags}
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Description</p>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={CompanyData?.description}
                id="standard-basic"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Website</p>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={CompanyData?.website}
                id="standard-basic"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Card>
      </Stack>

      <Card
        elevation={2}
        sx={{
          padding: 3,
          width: { sm: "100%", margin: "0px auto" },
        }}
      >
        <Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <h1>HR Contact Details</h1>
            <div>
              <IconButton onClick={handleOpenNew}>
                <AddIcon />
              </IconButton>
            </div>
          </Stack>
          <DataGrid rows={HRcontactRows} columns={HRcotactDetailsColumns} />
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
          <h1>Past Hires</h1>
          <DataGrid rows={pastHireRows} columns={PastHireColumns} />
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
          </Stack>
          <DataGrid rows={companyHistoryRows} columns={CompanyHistoryColumns} />
        </Stack>
      </Card>
    </div>
  );
}
Index.layout = "adminDashBoard";
export default Index;
