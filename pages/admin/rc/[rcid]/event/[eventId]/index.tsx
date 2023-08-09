import {
  Button,
  Card,
  FormControl,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import useStore from "@store/store";
import Meta from "@components/Meta";
import eventRequest, { EventDetails } from "@callbacks/admin/rc/proforma/event";
import EnrollToEvent from "@components/Modals/EnrollToEvent";
import { Student } from "@callbacks/admin/rc/student/getStudents";
import { getDeptProgram } from "@components/Parser/parser";
import requestProforma from "@callbacks/admin/rc/adminproforma";

const cols: GridColDef[] = [
  {
    field: "CreatedAt",
    headerName: "Created At",
    width: 150,
    hide: true,
  },
  {
    field: "DeletedAt",
    headerName: "Deleted At",
    width: 150,
    hide: true,
  },
  {
    field: "ID",
    headerName: "Id",
    width: 100,
  },
  {
    field: "UpdatedAt",
    headerName: "Updated At",
    width: 150,
    hide: true,
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 150,
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "program_department_id",
    headerName: "Department",
    width: 200,
    valueGetter: (params) => getDeptProgram(params.value),
  },
  {
    field: "secondary_program_department_id",
    headerName: "Secondary Department",
    width: 200,
    valueGetter: (params) => getDeptProgram(params.value),
  },
  {
    field: "is_frozen",
    headerName: "Frozen",
    width: 100,
    hide: true,
  },
  {
    field: "is_verified",
    headerName: "Verified",
    width: 100,
    hide: true,
  },
  {
    field: "student_id",
    headerName: "Student Id",
    width: 100,
    hide: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "recruitment_cycle_id",
    headerName: "Recruitment Cycle Id",
    width: 150,
    hide: true,
  },
];

function Event() {
  const [companyName, setCompanyName] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [pid, setProformaID] = useState<number>(0);
  const [openNew, setOpenNew] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const { token, rcName, role } = useStore();
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const { rcid, eventId } = router.query;
  const rid = rcid as string;
  const eid = eventId as string;
  const { register, reset } = useForm<EventDetails>();
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  useEffect(() => {
    const getEvent = async () => {
      const res = await eventRequest.get(token, rid, eid);
      const all_students = await eventRequest.getStudents(
        token,
        rid,
        pid.toString(),
        eid
      );
      const company = await requestProforma.get(token, rid, pid.toString());
      setCompanyName(company.company_name);
      setStudents(all_students);
      setProformaID(res.proforma_id);
      setStartTime(new Date(res.start_time));
      setEndTime(new Date(res.end_time));
      reset(res);
    };
    if (router.isReady) {
      getEvent();
    }
    if (role !== 103) setShowButtons(true);
  }, [rid, eid, token, router.isReady, reset, pid, role]);
  return (
    <div>
      <Meta title={`Event Details - ${rcName}`} />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", md: "500px", margin: "0px auto" },
        }}
      >
        <h2>{companyName}</h2>
        <Stack spacing={3}>
          <Stack direction="row">
            <h2>View Event Details</h2>
            {showButtons && (
              <IconButton href={`/admin/rc/${rid}/event/${eid}/edit`}>
                <EditIcon />
              </IconButton>
            )}
          </Stack>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Name</p>
            <TextField
              disabled
              id="Cname"
              multiline
              variant="standard"
              {...register("name")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Start Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event End Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Duration</p>
            <TextField
              disabled
              id="Cname"
              variant="standard"
              {...register("duration")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Venue</p>
            <TextField
              disabled
              id="Cname"
              multiline
              variant="standard"
              {...register("venue")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Sequence</p>
            <TextField
              disabled
              id="Cname"
              multiline
              variant="standard"
              {...register("sequence", { setValueAs: (v) => parseInt(v, 10) })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Description</p>
            <TextField
              disabled
              id="Cname"
              multiline
              minRows={4}
              variant="standard"
              {...register("description")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Main POC</p>
            <TextField
              disabled
              id="Cname"
              multiline
              variant="standard"
              {...register("main_poc")}
            />
          </FormControl>
          {showButtons && (
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              href={`/admin/rc/${rid}/proforma/${pid}/view`}
            >
              View Proforma
            </Button>
          )}
        </Stack>
      </Card>
      <Stack direction="row">
        <p style={{ fontWeight: 300 }}>Registered Students</p>
        {showButtons && (
          <IconButton onClick={handleOpenNew}>
            <AddIcon />
          </IconButton>
        )}
      </Stack>
      <DataGrid columns={cols} getRowId={(row) => row.ID} rows={students} />
      <Modal open={openNew} onClose={handleCloseNew}>
        <EnrollToEvent
          handleClose={handleCloseNew}
          pid={pid.toString()}
          eid={eid}
        />
      </Modal>
      <br />
    </div>
  );
}

Event.layout = "adminPhaseDashBoard";
export default Event;
