import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DownloadIcon from "@mui/icons-material/Download";

import requestProforma, {
  AdminProformaType,
  ProformaEmailRequest,
} from "@callbacks/admin/rc/adminproforma";
import eventRequest, { Event } from "@callbacks/admin/rc/proforma/event";
import StudentRequest from "@callbacks/admin/rc/proforma/students";
import { CDN_URL } from "@callbacks/constants";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import { getDeptProgram } from "@components/Parser/parser";
import useStore from "@store/store";
import zip from "@callbacks/auth/zip";

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

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    hide: true,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
  },
  {
    field: "roll_no",
    headerName: "Roll No",
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "resume",
    headerName: "Resume Link",
    sortable: false,
    align: "center",
    width: 400,
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
    field: "current_cpi",
    headerName: "Current CPI",
    width: 100,
  },
  {
    field: "ug_cpi",
    headerName: "UG CPI",
    hide: true,
    width: 100,
  },
  {
    field: "program_dept",
    headerName: "Program/Dept",
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
  {
    field: "program_dept_2",
    headerName: "Secondary Program/Dept",
    valueGetter: (params) =>
      getDeptProgram(params.row.secondary_program_department_id),
  },
  {
    field: "status_name",
    headerName: "Status",
    renderCell: (params) => (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "100%", color: "green" }}
        color="success"
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: "specialization",
    headerName: "Specialisation",
    hide: true,
  },
  {
    field: "preference",
    headerName: "Preference",
    hide: true,
  },
  {
    field: "gender",
    hide: true,
    headerName: "Gender",
  },
  {
    field: "disability",
    headerName: "Disability",
    hide: true,
  },
  {
    field: "dob",
    headerName: "DOB",
    valueGetter: ({ value }) =>
      value && `${new Date(value).toLocaleDateString("en-GB")}`,
    hide: true,
  },
  {
    field: "expected_graduation_year",
    hide: true,
    headerName: "Expected Graduation Year",
  },
  {
    field: "tenth_board",
    headerName: "10th Board",
    hide: true,
  },
  {
    field: "tenth_year",
    headerName: "10th Board Year",
    hide: true,
  },
  {
    field: "tenth_marks",
    hide: true,
    headerName: "10th Marks",
  },
  {
    field: "twelfth_board",
    headerName: "12th Board",
    hide: true,
  },
  {
    field: "twelfth__year",
    headerName: "12th Board Year",
    hide: true,
  },
  {
    field: "twelfth_marks",
    hide: true,
    headerName: "12th Board Marks",
  },
  {
    field: "entrance_exam",
    hide: true,
    headerName: "Entrance Exam",
  },
  {
    field: "entrance_exam_rank",
    hide: true,
    headerName: "Entrance Exam Rank",
  },
  {
    field: "category",
    hide: true,
    headerName: "Category",
  },
  {
    field: "category_rank",
    headerName: "Category Rank",
    hide: true,
  },
  {
    field: "current_address",
    headerName: "Current Address",
    hide: true,
  },
  {
    field: "permanent_address",
    headerName: "Permanent Address",
    hide: true,
  },
  {
    field: "friend_name",
    headerName: "Friends Name",
    hide: true,
  },
  {
    field: "friend_phone",
    headerName: "Friends Contact Details",
    hide: true,
  },
  {
    field: "frozen",
    headerName: "Frozen",
    width: 150,
    hide: true,
  },
  {
    field: "phone",
    headerName: "Phone",
  },
];

function Index() {
  const { register, handleSubmit, reset } = useForm<ProformaEmailRequest>();

  const [openEmailSender, setOpenEmailSender] = useState(false);
  const [proformaEvents, setProformaEvents] = useState<Event[]>([]);
  const [rows, setRows] = useState<any>([]);
  const handleOpenEmailSender = () => {
    setOpenEmailSender(true);
  };
  const handleCloseEmailSender = () => {
    setOpenEmailSender(false);
  };

  const { token } = useStore();
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = rcid as string;
  const pid = proformaid as string;
  const [loading, setLoading] = useState(true);
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
    const fetchProformaEvents = async () => {
      const response = await eventRequest.getAll(token, rid, pid);
      setProformaEvents(response);
    };

    const fetch = async () => {
      const response = await StudentRequest.get(token, rid, pid);
      if (response) setRows(response);
      setLoading(false);
    };
    if (router.isReady) {
      fetch();
      fetchProformaEvents();
    }
  }, [token, router.isReady, rid, pid, setLoading]);

  const sendEmail = async (data: ProformaEmailRequest) => {
    const response = await requestProforma.email(token, rid, pid, data);
    if (response) {
      reset({
        event_id: 0,
        subject: "",
        body: "",
      });
      handleCloseEmailSender();
    }
  };

  const zipResume = async () => {
    const files = rows.map((row: any) => row.resume);
    const outfile = `${rid}_${pid}.zip`;

    await zip.post({ files, rid, outfile });
  };

  return (
    <div>
      <Meta title={`${pid} - Proforma`} />
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 5 }}
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            sx={{ width: { xs: "280px" }, height: "40px" }}
            variant="contained"
            onClick={acceptProforma}
          >
            Accept Proforma
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "280px" }, height: "40px" }}
            onClick={rejectProforma}
          >
            Reject Proforma
          </Button>
        </Stack>
      </Stack>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            sx={{ width: { xs: "280px" }, height: "40px" }}
            variant="contained"
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/view`);
            }}
          >
            View Proforma
          </Button>
          <Button
            sx={{ width: { xs: "280px" }, height: "40px" }}
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
            sx={{ width: { xs: "280px" }, height: "40px" }}
            variant="contained"
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/question`);
            }}
          >
            View / Add Custom Questions
          </Button>
        </Stack>
      </Stack>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 5 }}
        direction={{ lg: "row", xs: "column" }}
      >
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            variant="contained"
            sx={{ width: { xs: "280px" }, height: "40px" }}
            onClick={onClickShowDetails}
          >
            Show Details to Company
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: "280px" }, height: "40px" }}
            onClick={onClickHideDetails}
          >
            Hide Details to Company
          </Button>
        </Stack>
        <Stack spacing={3} direction={{ sm: "row", xs: "column" }}>
          <Button
            variant="contained"
            sx={{ width: { xs: "280px" }, height: "40px" }}
            onClick={() => {
              router.push(`/admin/rc/${rid}/proforma/${pid}/step5`);
            }}
          >
            Change/Set Deadline
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: "280px" }, height: "40px" }}
            onClick={handleOpenEmailSender}
          >
            Send Customised Email
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={5} alignItems="center" justifyItems="center">
        <Grid item xs={12}>
          <Stack>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <h2>Student Data</h2>
              <div>
                <Tooltip title="Zip Resumes">
                  <IconButton onClick={() => zipResume()}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Stack>

            <DataGrid rows={rows} columns={columns} loading={loading} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row", lg: "column" }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={3}>
              <Modal open={openEmailSender} onClose={handleCloseEmailSender}>
                <Box sx={boxStyle}>
                  <Stack spacing={3}>
                    <h2>Enter Email to be Sent</h2>
                    <Select
                      labelId="Event-ID"
                      label="Select Group"
                      variant="standard"
                      {...register("event_id", { required: true })}
                    >
                      {proformaEvents.map((event) => (
                        <MenuItem value={event.ID}>{event.name}</MenuItem>
                      ))}
                    </Select>
                    <TextField
                      label="Email Subject"
                      variant="standard"
                      {...register("subject", { required: true })}
                    />
                    <TextField
                      label="Email Body"
                      variant="standard"
                      {...register("body", { required: true })}
                      multiline
                      minRows={3}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: "100%" }}
                      onClick={handleSubmit(sendEmail)}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
