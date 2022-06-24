import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
// eslint-disable-next-line no-unused-vars
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import useStore from "@store/store";

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

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
  },
  {
    field: "rollNo",
    headerName: "Roll No",
    width: 150,
  },
  {
    field: "link",
    headerName: "Link To Resume",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    name: "Student Name ",
    rollNo: "123456",
    link: "Idk",
    status: "IDC",
  },
];
function Index() {
  const {
    register,
    // handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm<AdminProformaType>();

  // eslint-disable-next-line no-unused-vars
  const [proformaData, setProformaData] = useState<AdminProformaType>();
  const [openEmailSender, setOpenEmailSender] = useState(false);
  const handleOpenEmailSender = () => {
    setOpenEmailSender(true);
  };
  const handleCloseEmailSender = () => {
    setOpenEmailSender(false);
  };
  const [openDateChanger, setOpenDateChanger] = useState(false);
  const handleOpenDateChanger = () => {
    setOpenDateChanger(true);
  };
  const handleCloseDateChanger = () => {
    setOpenDateChanger(false);
  };
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = rcid as string;
  const pid = proformaid as string;
  const { token } = useStore();

  const acceptProforma = () => {
    requestProforma.put(token, rid, {
      ID: parseInt(pid, 10),
      is_approved: { Valid: true, Bool: true },
    } as AdminProformaType);
  };

  const rejectProforma = () => {
    requestProforma.put(token, rid, {
      ID: parseInt(pid, 10),
      is_approved: { Valid: true, Bool: false },
    } as AdminProformaType);
  };

  const hideDetails = (hide: boolean) => {
    requestProforma.hide(token, rid, parseInt(pid, 10), hide);
  };

  const onClickHideDetails = () => hideDetails(true);
  const onClickShowDetails = () => hideDetails(false);

  useEffect(() => {
    const fetchAdminProforma = async () => {
      // const response = await requestProforma.get(token, rcid, proformaId);
      // setProformaData(response);
    };

    fetchAdminProforma();
  }, [token, rcid, proformaid]);
  return (
    <div className="container">
      <Meta title="Proforma" />
      <h1>Intenship 2022-23 Phase 1</h1>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            sx={{ width: { xs: "280px" } }}
            variant="contained"
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/view`);
            }}
          >
            View Proforma
          </Button>
          <Button
            sx={{ width: { xs: "280px" } }}
            variant="contained"
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/step1`);
            }}
          >
            Update Proforma
          </Button>
        </Stack>
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            sx={{ width: { xs: "280px" } }}
            variant="contained"
            onClick={acceptProforma}
          >
            Accept Proforma
          </Button>

          <Button
            sx={{ width: { xs: "280px" } }}
            variant="contained"
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/question`);
            }}
          >
            View / Add Custom Questions
          </Button>
        </Stack>
      </Stack>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          margin: "50px auto",
        }}
      >
        <Grid container spacing={5} alignItems="center" justifyItems="center">
          <Grid item xs={12} lg={9}>
            <Stack>
              <h2>Student Data</h2>

              <DataGrid rows={rows} columns={columns} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Stack
              spacing={2}
              direction={{ xs: "column", md: "row", lg: "column" }}
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                  onClick={onClickShowDetails}
                >
                  Show Details to Company
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                  onClick={onClickHideDetails}
                >
                  Hide Details to Company
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                  onClick={rejectProforma}
                >
                  Reject Proforma
                </Button>

                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                  onClick={handleOpenDateChanger}
                >
                  Change/Set Deadline
                </Button>
              </Stack>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "280px", md: "250px" }, height: "60px" }}
                  onClick={handleOpenEmailSender}
                >
                  Send Customised Email
                </Button>
                <Modal open={openEmailSender} onClose={handleCloseEmailSender}>
                  <Box sx={boxStyle}>
                    <Stack spacing={3}>
                      <h1>Enter Email to be Sent</h1>
                      <TextField
                        label="Enter New Password"
                        variant="standard"
                      />
                      <Button variant="contained" sx={{ width: "100%" }}>
                        Submit
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
                <Modal open={openDateChanger} onClose={handleCloseDateChanger}>
                  <Box sx={boxStyle}>
                    <Stack spacing={3}>
                      <h1>Enter New Deadline</h1>
                      <TextField
                        type="date"
                        variant="standard"
                        {...register("set_deadline")}
                      />
                      <Button variant="contained" sx={{ width: "100%" }}>
                        Submit
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
