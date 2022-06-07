import React from "react";
import Meta from "@components/Meta";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

function SendMail() {
  return (
    <div>
      <Meta title="Send-Mail" />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "30%", sm: "50%", margin: "0px auto" },
        }}
      >
        <Stack>
          <div style={{ textAlign: "center" }}>
            <h1>Send Customized Email</h1>
            <h1>(GROUP)</h1>
          </div>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item container>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.3rem" }}>SUBJECT</p>
              </Grid>
              <Grid item xs="auto">
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    label="Enter Subject"
                    id="subject"
                    variant="filled"
                    sx={{ minWidth: "20vw" }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.3rem" }}>MESSAGE</p>
              </Grid>
              <Grid item xs="auto">
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    label="Enter Message"
                    id="message"
                    variant="filled"
                    sx={{ minWidth: "20vw" }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.3rem" }}>ATTACHMENT</p>
              </Grid>
              <Grid item xs="auto">
                <input type="file" />
                <ActiveButton>Upload File</ActiveButton>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.3rem" }}>MESSAGE</p>
              </Grid>
              <Grid sx={{ minWidth: "20vw" }} xs="auto">
                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="Select-Audience">Select Audience</InputLabel>
                  <Select
                    labelId="Select-Audience"
                    label="Select Audience"
                    variant="standard"
                    style={{ minWidth: "20vw" }}
                    autoWidth
                  >
                    <MenuItem>ACCEPTED STUDENTS</MenuItem>
                    <MenuItem>SHORTLISTED STUDENTS</MenuItem>
                    <MenuItem>ELIGIBLE STUDENTS</MenuItem>
                    <MenuItem>UNAPPLIED STUDENTS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justifyContent="space-around">
              <Grid xs={4}>
                <ActiveButton
                  sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                >
                  SEND
                </ActiveButton>
              </Grid>
              <Grid xs={4}>
                <InactiveButton
                  sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                >
                  Reset
                </InactiveButton>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

SendMail.layout = "adminPhaseDashBoard";
export default SendMail;
