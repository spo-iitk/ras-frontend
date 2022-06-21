import React from "react";
import { Card, Stack, TextField } from "@mui/material";

import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Meta from "@components/Meta";

function Index() {
  return (
    <div className="container">
      <Meta title="Add PPO-PIO - Admin" />
      <h1>Internship 2022-23 Phase 1</h1>
      <div style={{ marginTop: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h1>Add PPO/PIO</h1>
            <TextField label="Company Name" id="companyName" variant="filled" />
            <TextField
              label="Enter Roll Number"
              id="rollNum"
              variant="filled"
            />
            <h2 style={{ margin: "30px auto 10px auto" }}>OR</h2>
            <TextField label="Enter Email Ids" id="emails" variant="filled" />
            <Stack
              direction="row"
              spacing={2}
              style={{ justifyContent: "center" }}
            >
              <ActiveButton
                sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Add
              </ActiveButton>
              <InactiveButton
                sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Reset
              </InactiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
