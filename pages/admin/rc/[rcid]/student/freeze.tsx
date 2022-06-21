import React from "react";
import { Card, Stack, TextField } from "@mui/material";

import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Meta from "@components/Meta";

function Freeze() {
  return (
    <div className="container">
      <Meta title="Freeze - Admin" />
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
            <h1>Freeze (Group)</h1>
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
                Freeze
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

Freeze.layout = "adminPhaseDashBoard";
export default Freeze;
