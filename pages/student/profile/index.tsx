import { Card, Grid, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

import Meta from "@components/Meta";

const info = [
  {
    field: "Name",
    value: "Enter your Name",
    disabled: true,
  },
  {
    field: "Program",
    value: "Select your Program",
    disabled: true,
  },
  {
    field: "Department",
    value: "Select your Department",
    disabled: true,
  },
  {
    field: "Specialisation",
    value: "Enter your Specialisation",
    disabled: false,
  },
  {
    field: "IITK Roll No.",
    value: "Enter your IITK Roll No.",
    disabled: false,
  },
  {
    field: "Preference",
    value: "Select your Preference",
    disabled: false,
  },
  {
    field: "Gender",
    value: "Select your Gender",
    disabled: false,
  },
  {
    field: "Disability",
    value: "Select your Disability Status",
    disabled: false,
  },
  {
    field: "DOB",
    value: "Enter your Date of Birth",
    disabled: false,
  },
  {
    field: "Expected Graduation Year",
    value: "Select your Graduation Year",
    disabled: false,
  },
  {
    field: "IITK Email",
    value: "Your IITK email",
    disabled: false,
  },
  {
    field: "Personal Email",
    value: "Enter your Personal Email",
    disabled: false,
  },
  {
    field: "Contact Number",
    value: "Enter your Contact Number",
    disabled: false,
  },
  {
    field: "Alternate Contact Numer",
    value: "Enter your Alternate Contact Number",
    disabled: false,
  },
  {
    field: "Whatsapp Number",
    value: "Enter your Whatsapp Number",
    disabled: false,
  },
  {
    field: "Current CPI",
    value: "Enter your Current CPI",
    disabled: false,
  },
  {
    field: "UG CPI(on for PG Students)",
    value: "Enter your UG CPI",
    disabled: false,
  },
  {
    field: "10th Board",
    value: "Enter your 10th Board Name",
    disabled: false,
  },
  {
    field: "10th Board Year",
    value: "Enter your 10th Board Year",
    disabled: false,
  },
  {
    field: "10th Marks",
    value: "Enter your 10th Marks",
    disabled: false,
  },
  {
    field: "12th Board",
    value: "Enter your 12th Board",
    disabled: false,
  },
  {
    field: "12th Board",
    value: "Enter your 12th Board Name",
    disabled: false,
  },
  {
    field: "12th Board Year",
    value: "Enter your 12th Board Year",
    disabled: false,
  },
  {
    field: "12th Board Marks",
    value: "Enter your 12th Board Marks",
    disabled: false,
  },
  {
    field: "12th Board Year",
    value: "Enter your 12th Board Year",
    disabled: false,
  },
  {
    field: "Entrance Exam",
    value: "Enter your Entrance Exam",
    disabled: false,
  },
  {
    field: "Entrance Exam Rank",
    value: "Enter your Entrance Exam Rank",
    disabled: false,
  },
  {
    field: "Category",
    value: "Enter your Category",
    disabled: false,
  },
  {
    field: "Category Rank",
    value: "Enter your Category Rank",
    disabled: false,
  },
  {
    field: "Current Address",
    value: "Enter your Current Address",
    disabled: false,
  },
  {
    field: "Permanent Address",
    value: "Enter your Permanent Address",
    disabled: false,
  },
  {
    field: "Friends Name",
    value: "Enter your Friends Name",
    disabled: false,
  },
  {
    field: "Friends Contact Details",
    value: "Enter your Friends Contace Details",
    disabled: false,
  },
];

function Profile() {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Student Dashboard - Profile" />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h1>Profile</h1>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Link href="/student/profile/edit" passHref>
              <Button variant="contained" sx={{ width: 100 }}>
                Edit
              </Button>
            </Link>
            <Button variant="contained" sx={{ width: 150 }}>
              Not Verified
            </Button>
          </Stack>
        </Stack>
        <Stack justifyContent="center">
          <Card
            elevation={5}
            sx={{
              padding: 3,
              borderRadius: "10px",
              width: { xs: "330px", sm: "600px", margin: "0px auto" },
            }}
          >
            <Grid container spacing={5} sx={{ padding: 3 }}>
              {/* <form onSubmit = {handleSubmit(onSubmit)}> */}
              {info.map((item) => (
                <Grid item xs={12} sm={6} key={item.field}>
                  <p>{item.field}</p>
                  <TextField
                    fullWidth
                    label={item.value}
                    disabled
                    id="standard-basic"
                    variant="standard"
                  />
                </Grid>
              ))}

              {/* </form> */}
            </Grid>
          </Card>
        </Stack>
        <Stack alignItems="center" sx={{ padding: 3 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

Profile.layout = "studentDashboard";
export default Profile;
