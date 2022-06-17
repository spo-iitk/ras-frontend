import React from "react";
import { Card, Stack, TextField } from "@mui/material";

import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

function CreateHr() {
  return (
    <div className={styles.container}>
      <Meta title="Create HR Account - Admin" />
      <h1>Dashboard</h1>
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={4}>
            <Stack sx={{ justifyContent: "space-around" }} direction="row">
              <h1>Create HR Account</h1>
            </Stack>
            <TextField
              label="Company Name"
              id="companyname"
              variant="standard"
            />
            <TextField label="Name" id="name" variant="standard" />
            <TextField label="Contact Number" id="contact" variant="standard" />
            <TextField label="Email ID" id="Email ID" variant="standard" />
            <TextField label="User Name" id="username" variant="standard" />
            <TextField
              label="Password"
              id="password"
              type="password"
              variant="standard"
            />
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              <ActiveButton
                sx={{
                  borderRadius: 5,
                  fontSize: 16,
                  width: "50%",
                }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Add HR
              </ActiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

CreateHr.layout = "adminPhaseDashBoard";
export default CreateHr;
