import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Modal, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import DataGrid from "@components/DataGrid";
import addCompanyRequest, { HR } from "@callbacks/admin/company/company";
import HRAuth, { HRAuthResponse } from "@callbacks/auth/hrauth";
import ActiveButton from "@components/Buttons/ActiveButton";
import AddHRMD from "@components/Modals/AddHRAdminMD";
import useStore from "@store/store";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

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
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  useEffect(() => {
    if (confirmation) {
      addCompanyRequest.deleteHR(token, id);
      window.location.reload();
    }
  }, [confirmation, id, token]);
  return (
    <>
      <IconButton
        onClick={() => {
          handleOpenDeleteModal();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DeleteConfirmation
          handleClose={handleCloseDeleteModal}
          setConfirmation={setConfirmation}
        />
      </Modal>
    </>
  );
}
function AuthHR(props: { id: string; Name: string }) {
  const { token } = useStore();
  const { id, Name } = props;
  const [openAuthHR, setOpenAuthHR] = useState(false);
  const handleOpenAuthHR = () => {
    setOpenAuthHR(true);
  };
  const handleCloseAuthHR = () => {
    setOpenAuthHR(false);
  };
  const handleSubmit = () => {
    const authHR = async () => {
      const randomPwd = generateRandomPassword();
      const newPwd: HRAuthResponse = { password: randomPwd };
      const finData = { ...newPwd, user_id: id, name: Name };
      let response = await HRAuth.post(token, finData);
      if (response) {
        handleCloseAuthHR();
      }
    };
    authHR();
  };

  function generateRandomPassword(length = 12) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,<>?";
    let password = "";
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  return (
    <div>
      <ActiveButton sx={{ height: 30 }} onClick={handleOpenAuthHR}>
        Generate Auth
      </ActiveButton>
      <Modal open={openAuthHR} onClose={handleCloseAuthHR}>
        <Box sx={boxStyle}>
          <Stack spacing={3}>
            <h2>Enter New Password</h2>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleSubmit}
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
    field: "ID",
    headerName: "ID",
    width: 125,
  },
  {
    field: "name",
    headerName: "HR Name",
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "email",
    headerName: "HR E-mail",
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
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
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "button1",
    headerName: "Delete HR",
    headerAlign: "center",
    renderCell: (params) => <DeleteHR id={params.row.ID} />,
    width: 50,
    align: "center",
  },
  {
    field: "button2",
    headerName: "Send Authorization Mail",
    renderCell: (params) => (
      <AuthHR id={params.row.email} Name={params.row.name} />
    ),
    width: 100,
  },
];

function HRContactDetails() {
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [hrRows, setHRRows] = useState<HR[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHRDetails = async () => {
      let response = await addCompanyRequest.getAllHR(token, companyId);
      setHRRows(response);
      setLoading(false);
    };
    if (router.isReady) {
      fetchHRDetails();
    }
  }, [companyId, router.isReady, token]);
  return (
    <div>
      <Stack>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>HR Contact Details</h2>
          <div>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
        <DataGrid
          rows={hrRows}
          columns={HRcotactDetailsColumns}
          loading={loading}
          getRowId={(row) => row.ID}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddHRMD handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

export default HRContactDetails;
