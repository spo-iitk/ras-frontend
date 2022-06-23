import React from "react";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Meta from "@components/Meta";

const Input = styled("input")({
  display: "none",
});

function SendMail() {
  return (
    <div className="container">
      <Meta title="Send-Mail" />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "500px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Send Customized Email (Group)</h1>
          <FormControl sx={{ m: 1 }}>
            <TextField
              label="Enter Subject"
              id="subject"
              variant="standard"
              sx={{ minWidth: "20vw" }}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <TextField
              label="Enter Message"
              id="message"
              variant="standard"
              sx={{ minWidth: "20vw" }}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="Select-Audience">Select Audience</InputLabel>
            <Select
              labelId="Select-Audience"
              label="Select Audience"
              variant="standard"
            >
              <MenuItem>Accepted Students</MenuItem>
              <MenuItem>Shortlisted Students</MenuItem>
              <MenuItem>Eligible Students</MenuItem>
              <MenuItem>Unapplied Students</MenuItem>
            </Select>
          </FormControl>
          <Grid item container justifyContent="space-around">
            <Grid xs={4}>
              <Button
                variant="contained"
                sx={{ borderRadius: 0, width: "100%" }}
              >
                Send
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="contained"
                sx={{ borderRadius: 0, width: "100%" }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

SendMail.layout = "adminPhaseDashBoard";
export default SendMail;
