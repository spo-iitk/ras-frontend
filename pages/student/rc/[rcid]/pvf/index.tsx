import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import styled from "@emotion/styled";
import { green } from "@mui/material/colors";

import InactiveButton from "@components/Buttons/InactiveButton";
import { errorNotification } from "@callbacks/notifcation";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import pvfRequest, { PvfsParams } from "@callbacks/student/rc/pvf";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import { CDN_URL } from "@callbacks/constants";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";
import enrollmentRequest from "@callbacks/student/rc/enrollQuestion";
import { getDeptProgram } from "@components/Parser/parser";

interface Params {
  row: PvfsParams;
}

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
  width: 500,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  // p: 2,
  paddingX: 4,
  paddingY: 2,
};
const Input = styled("input")({
  display: "none",
});
const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;
function DeleteProforma({
  id,
  updateCallback,
}: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();

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
      if (rid === undefined || rid === "") return;
      pvfRequest.delete(token, rid, id).then(() => {
        updateCallback();
      });
    }
  }, [confirmation, id, rid, token, updateCallback]);
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
function PVF() {
  const [rows, setRows] = useState<PvfsParams[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [pvfName, setPvfName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PvfsParams>({});

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };

  const renderStatusButton = (params: Params) => {
    const { is_verified } = params.row;

    if (!is_verified.Valid) {
      return (
        <Button
          variant="outlined"
          sx={{ borderRadius: "10px", width: "80%" }}
          startIcon={<AvTimerIcon />}
        >
          Pending by SPO
        </Button>
      );
    }

    if (is_verified.Bool) {
      return (
        <Button
          variant="outlined"
          sx={{ borderRadius: "10px", width: "80%", color: "green" }}
          color="success"
          startIcon={<CheckIcon sx={{ color: "green" }} />}
        >
          Accepted
        </Button>
      );
    }

    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "80%", color: "red" }}
        color="error"
        startIcon={<CloseIcon sx={{ color: "red" }} />}
      >
        Rejected
      </Button>
    );
  };
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  const updateTable = useCallback(async () => {
    const getall = async () => {
      const data = await pvfRequest.getAll(token, rid);
      setRows(data);
    };
    if (router.isReady && rid !== "") getall();
  }, [token, rid, router]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log(rows);
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
    // {
    //   field: "role",
    //   headerName: "Role Name",
    //   align: "center",
    //   headerAlign: "center",
    //   width: 250,
    //   renderCell: (params) => (
    //     <Tooltip title={params.value}>
    //       <div>{params.value}</div>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   field: "mentor_name",
    //   headerName: "Mentor Name",
    //   align: "center",
    //   headerAlign: "center",
    //   width: 250,
    //   renderCell: (params) => (
    //     <Tooltip title={params.value}>
    //       <div>{params.value}</div>
    //     </Tooltip>
    //   ),
    // },
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
      field: "filename_student",
      headerName: "Uploaded PVF ",
      sortable: false,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => getURL(params?.value),
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => {
            window.open(params.value, "_blank");
          }}
        >
          {transformName(params.value)}
        </Button>
      ),
    },
    {
      field: "is_verified",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      renderCell: renderStatusButton,
    },
    {
      field: "pvf",
      headerName: "View PVF",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ActiveButton
          href={`/student/rc/${rid}/pvf/${params.row.ID}`}
          sx={{ height: 30, width: "100%" }}
        >
          View PVF
        </ActiveButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete/Edit",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row?.is_verified?.Valid)
          return (
            <InactiveButton sx={{ height: 30, width: "100%" }}>
              Cannot edit
            </InactiveButton>
          );
        return (
          <>
            <DeleteProforma id={params.row.ID} updateCallback={updateTable} />
            <IconButton href={`/student/rc/${rid}/pvf/${params.row.ID}/edit`}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    // if (
    //   allPvf.filter(
    //     (pvf) => !(pvf.verified.Valid && !pvf.verified.Bool)
    //   ).length >= 5
    // ) {
    //   errorNotification("You can only upload 5 pvf", "Cannot upload");
    //   setLoading(false);
    //   return;
    // }

    if (!(files && files.length > 0)) {
      setLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > 256000) {
      errorNotification("File size too large", "Max file size is about 200KB");
      setLoading(false);
      return;
    }

    if (file.name !== pvfName) {
      errorNotification(
        "File must follow the name constraint",
        `Expected File name: ${pvfName}`
      );
      setLoading(false);
      return;
    }

    setFileSaved(file);
    setSuccess(true);
    setLoading(false);
  };
  const onSubmit = async (data: PvfsParams) => {
    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());
    await pvfRequest.post(token, rid, formData, {
      ...data,
      recruitment_cycle_id: parseInt(rid, 10),
    });
    setFileSaved(null);
    handleClose();
    window.location.reload();
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const student_data = await enrollmentRequest.getStudentRC(token, rid);
      if (student_data.ID) {
        const progdept = getDeptProgram(student_data.program_department_id);
        let filename = `${student_data.roll_no} ${student_data.name} ${progdept}`;
        filename = filename.replace(/[^\w]/gi, "_");
        filename = filename.toLowerCase();
        setPvfName(`${filename}.pdf`);
      }
    };
    const getProforma = async () => {
      const res = await pvfRequest.getAll(token, rid);
      setRows(res);
      setLoading(false);
    };

    if (router.isReady) {
      getProforma();
      fetchStudent();
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
          <Stack spacing={1}>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Company / University Name</p>
              <TextField
                id="company_university_name"
                required
                fullWidth
                variant="standard"
                error={!!errors.company_university_name}
                helperText={errors.company_university_name?.message}
                {...register("company_university_name", {
                  required: "This field is required",
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Role</p>
              <TextField
                id="role"
                required
                fullWidth
                variant="standard"
                error={!!errors.role}
                helperText={errors.role && "This field is required"}
                {...register("role", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Duration</p>
              <TextField
                id="duration"
                required
                fullWidth
                variant="standard"
                error={!!errors.duration}
                helperText={errors.duration && "This field is required"}
                {...register("duration", {
                  required: "This field is required",
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Name</p>
              <TextField
                id="mentor_name"
                required
                fullWidth
                variant="standard"
                error={!!errors.mentor_name}
                helperText={errors.mentor_name && "This field is required"}
                {...register("mentor_name", {
                  required: "This field is required",
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Designation</p>
              <TextField
                id="mentor_designation"
                required
                fullWidth
                variant="standard"
                error={!!errors.mentor_designation}
                helperText={
                  errors.mentor_designation && "This field is required"
                }
                {...register("mentor_designation", {
                  required: "This field is required",
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Mentor Email</p>
              <TextField
                id="mentor_email"
                required
                fullWidth
                variant="standard"
                error={!!errors.mentor_email}
                helperText={errors.mentor_email && "This field is required"}
                {...register("mentor_email", {
                  required: "This field is required",
                })}
              />
            </FormControl>
            <Grid
              item
              xs={12}
              md={6}
              key="upload"
              // paddingTop={2}
              padding={0}
              display="flex"
              gap="1rem"
              alignItems="center"
              // marginTop={8}
            >
              <label htmlFor="icon-button-file">
                <Input
                  accept="application/pdf"
                  id="icon-button-file"
                  type="file"
                  onChange={handleChange}
                  // required
                />
                <Button
                  variant="contained"
                  // color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={buttonSx}
                  onClick={handleButtonClick}
                >
                  {success ? (
                    <CheckIcon />
                  ) : (
                    <span style={{ alignItems: "center", display: "flex" }}>
                      <SaveIcon sx={{ marginRight: "10px" }} /> Upload PVF
                    </span>
                  )}
                  {loading && (
                    <CircularProgress
                      size={30}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        // top: -6,
                        // left: -6,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Button>
              </label>
              <Typography variant="subtitle1">{fileSaved?.name}</Typography>
            </Grid>
            {/* <label htmlFor="icon-button-file">
              <Input
                accept="application/pdf"
                id="icon-button-file"
                type="file"
                onChange={handleChange}
                // required
              />
              <Fab
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={buttonSx}
                onClick={handleButtonClick}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
                {loading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </Fab>
            </label> */}
            <Stack justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                sx={{ width: "30%", marginTop: "20px" }}
                // onClick={handleSubmit(onSubmit)}
                onClick={() => {
                  if (fileSaved != null) {
                    handleSubmit(onSubmit)();
                  } else {
                    errorNotification("Upload PVF!!", "");
                  }
                }}
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
