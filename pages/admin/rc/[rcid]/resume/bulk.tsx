import React from "react";
import { Card, Stack, TextField } from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

function Bulk() {
  return (
    <div className={styles.container}>
      <Meta title="Bulk - Admin" />
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
            <h1>Bulk Accept/Reject</h1>
            <TextField
              label="Enter Resume IDs"
              id="resumeid"
              variant="standard"
            />
            <h2 style={{ margin: "30px auto 10px auto" }}>OR</h2>
            <TextField label="Message (If Any)" id="message" variant="standard" />
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
                ACCEPT ALL
              </ActiveButton>
              <InactiveButton
                sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                REJECT ALL
              </InactiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

Bulk.layout = "adminPhaseDashBoard";
export default Bulk;
