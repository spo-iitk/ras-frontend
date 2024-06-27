import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import pvfRequest, { PvfsParams, PvfsType } from "@callbacks/student/rc/pvf";
import Meta from "@components/Meta";
import useStore from "@store/store";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};
const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function PVF() {
  const [rows, setRows] = useState<PvfsParams[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "PVF ID",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "company_university_name",
      headerName: "Company / University Name",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "role",
      headerName: "Role Name",
      align: "center",
      headerAlign: "center",
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "mentor_name",
      headerName: "Mentor Name",
      align: "center",
      headerAlign: "center",
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "mentor_email",
      headerName: "Mentor Email",
      align: "center",
      headerAlign: "center",
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => (
        <Button
          href={`/student/rc/${rid}/pvf/${params.row.ID}`}
          variant="contained"
          color="primary"
        >
          View PVF
        </Button>
      ),
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PvfsType>();

  const onSubmit: SubmitHandler<PvfsType> = async (data) => {
    await pvfRequest.post(token, rid, data);
    handleClose();
    // Reload data after submitting
  };

  useEffect(() => {
    const getProforma = async () => {
      const res = await pvfRequest.getAll(token, rid);
      setRows(res);
      setLoading(false);
    };

    if (router.isReady) {
      getProforma();
    }
  }, [router.isReady, rid, token]);

  return (
    <>
      <div>
        <Meta title="RC - Manage PVFs" />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>PVFs Applications</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Stack>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.ID}
            columns={columns}
            loading={loading}
          />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <Box sx={{ textAlign: "center" }}>
            <h2>Create New PVF</h2>
          </Box>
          <Stack spacing={2}>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Company / University Name</p>
              <TextField
                id="company_university_name"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.company_university_name}
                helperText={
                  errors.company_university_name && "This field is required"
                }
                {...register("company_university_name")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Role</p>
              <TextField
                id="role"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.role}
                helperText={errors.role && "This field is required"}
                {...register("role")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Duration</p>
              <TextField
                id="duration"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.duration}
                helperText={errors.duration && "This field is required"}
                {...register("duration")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Name</p>
              <TextField
                id="mentor_name"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.mentor_name}
                helperText={errors.mentor_name && "This field is required"}
                {...register("mentor_name")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Designation</p>
              <TextField
                id="mentor_designation"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.mentor_designation}
                helperText={
                  errors.mentor_designation && "This field is required"
                }
                {...register("mentor_designation")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Email</p>
              <TextField
                id="mentor_email"
                required
                fullWidth
                multiline
                variant="standard"
                error={!!errors.mentor_email}
                helperText={errors.mentor_email && "This field is required"}
                {...register("mentor_email")}
              />
            </FormControl>
            <Stack justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                sx={{ width: "30%" }}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

PVF.layout = "studentPhaseDashboard";
export default PVF;
