import Meta from "@components/Meta";
import { Button, Stack, TextField, Card, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "@styles/Home.module.css";

const info = [
  {
    field: "Name",
    value: "Manas Gupta",
    disabled: true,
  },
  {
    field: "Roll No.",
    value: "200554",
    disabled: true,
  },
  {
    field: "Name",
    value: "Manas Gupta",
    disabled: true,
  },
  {
    field: "Roll No.",
    value: "200554",
    disabled: false,
  },
];

function ProfileEdit() {
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - Edit Profile" />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h1>Edit Profile</h1>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Link href="/student/profile" passHref>
              <Button variant="contained" sx={{ width: 100 }}>
                Save
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
            <Grid container spacing={2}>
              {info.map((item) => (
                <Grid item xs={12} sm={6} key={item.field}>
                  <p>{item.field}</p>
                  <TextField
                    value={item.value}
                    disabled={item.disabled}
                    variant="standard"
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
}

ProfileEdit.layout = "studentDashboard";
export default ProfileEdit;
