import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

import useStore from "@store/store";
import Meta from "@components/Meta";
import eventRequest, { EventDetails } from "@callbacks/admin/rc/proforma/event";

function Event() {
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [pid, setProformaID] = useState<number>(0);
  const { token, rcName } = useStore();
  const router = useRouter();
  const { rcid, eventId } = router.query;
  const rid = rcid as string;
  const eid = eventId as string;
  const { register, handleSubmit, reset } = useForm<EventDetails>();

  const ROUTE = "/admin/rc/[rcid]/event/[eventId]";

  const onSubmit = async (data: EventDetails) => {
    const info: EventDetails = {
      ...data,
      start_time: startTime?.valueOf() || 0,
      end_time: endTime?.valueOf() || 0,
    };
    if (router.isReady) {
      const res = await eventRequest.put(token, info, rid, pid.toString());
      if (res)
        router.push({
          pathname: ROUTE,
          query: { rcid: rid, eventId: eid },
        });
    }
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
    <div>
      <Meta title={`Edit Event - ${rcName}`} />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", md: "500px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h2>Edit Event Details</h2>
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
            <p style={{ fontWeight: 300 }}>Event Duration</p>
            <TextField
              id="Cname"
              multiline
              variant="standard"
              {...register("duration")}
            />
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
            <p style={{ fontWeight: 300 }}>Sequence</p>
            <TextField
              id="Cname"
              multiline
              variant="standard"
              {...register("sequence", { setValueAs: (v) => parseInt(v, 10) })}
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
