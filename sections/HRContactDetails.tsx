import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
            <h2>Enter New Password</h2>
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
    field: "ID",
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
    headerAlign: "center",
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
