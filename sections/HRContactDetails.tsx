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

function HRContactDetails() {
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [HRcontactRows, setHRcontactRows] = useState<HR[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHRDetails = async () => {
      let response = await addCompanyRequest.getAllHR(token, companyId);
      for (let i = 0; i < response.length; i += 1) {
        response[i].id = response[i].ID;
      }
      setHRcontactRows(response);
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
          <h1>HR Contact Details</h1>
          <div>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
        <DataGrid
          rows={HRcontactRows}
          columns={HRcotactDetailsColumns}
          loading={loading}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddHRMD handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

export default HRContactDetails;
