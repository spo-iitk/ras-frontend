import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import addCompanyRequest, { Company } from "@callbacks/admin/company/company";
import Meta from "@components/Meta";
import EditCompanyMD from "@components/Modals/EditCompanyAdminMD";
import useStore from "@store/store";
import CompanyHistory from "sections/CompanyHistory";
import HRContactDetails from "sections/HRContactDetails";
import PastHires from "sections/PastHires";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function Index() {
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [CompanyData, setCompanyData] = useState<Company>({
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

  const [openEditComp, setOpenEditComp] = useState(false);
  const handleOpenEditComp = () => {
    setOpenEditComp(true);
  };
  const handleCloseEditComp = () => {
    setOpenEditComp(false);
  };

  const [value, setValue] = useState(0);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    const deleteCompany = () => {
      const delCompany = async () => {
        await addCompanyRequest.delete(token, companyId);
      };
      router.push("/admin/company");
      delCompany();
    };
    if (confirmation) deleteCompany();
  }, [confirmation, companyId, router.isReady, token, router]);

  return (
    <div>
      <Meta title={`${CompanyData.name} - Master Company Details`} />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Company Profile</h2>
          <Stack spacing={1} direction="row">
            <IconButton onClick={handleOpenEditComp}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOpenDeleteModal}>
              <DeleteIcon />
            </IconButton>
            <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
              <DeleteConfirmation
                handleClose={handleCloseDeleteModal}
                setConfirmation={setConfirmation}
              />
            </Modal>
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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="HR Contact" />
            <Tab label="Past Hires" />
            <Tab label="Company History" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HRContactDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PastHires />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CompanyHistory />
        </TabPanel>
      </Box>
    </div>
  );
}
Index.layout = "adminDashBoard";
export default Index;
