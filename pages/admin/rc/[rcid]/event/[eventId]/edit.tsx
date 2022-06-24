import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

import useStore from "@store/store";
import Meta from "@components/Meta";
import eventRequest, { EventDetails } from "@callbacks/admin/rc/proforma/event";

function Event() {
  const [startTime, setStartTime] = React.useState<Date | null>(new Date());
  const [endTime, setEndTime] = React.useState<Date | null>(new Date());
  const [pid, setProformaID] = React.useState<number>(0);
  const { token } = useStore();
  const router = useRouter();
  const { rcid, eventId } = router.query;
  const rid = rcid as string;
  const eid = eventId as string;
  const { register, handleSubmit, reset } = useForm<EventDetails>();

  const onSubmit = async (data: EventDetails) => {
    const info = {
      ...data,
      start_time: startTime?.valueOf(),
      end_time: endTime?.valueOf(),
    };
    await eventRequest.put(token, info, rid, pid.toString());
  };

  useEffect(() => {
    const getEvent = async () => {
      const res = await eventRequest.get(token, rid, eid);
      setProformaID(res.proforma_id);
      setStartTime(new Date(res.start_time));
      setEndTime(new Date(res.end_time));
      reset(res);
    };
    if (router.isReady) {
      getEvent();
    }
  }, [rid, eid, token, router.isReady, reset]);

  return (
    <div className="container">
      <Meta title="Event Details" />
      <h1 style={{ marginBottom: "4rem" }}>Internship 2022-23 Phase 1</h1>

      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", md: "500px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Edit Event Details</h1>
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
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Venue</p>
            <TextField
              id="Cname"
              multiline
              variant="standard"
              {...register("venue")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Description</p>
            <TextField
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
              id="Cname"
              multiline
              variant="standard"
              {...register("main_poc")}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </Stack>
      </Card>
      <br />
    </div>
  );
}

Event.layout = "adminPhaseDashBoard";
export default Event;
