import React from "react";
import { Card, Stack, TextField } from "@mui/material";

import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

function New() {
  return (
    <div className={styles.container}>
      <Meta title="Add Company - Admin" />
      <h1>Dashboard</h1>
      <div style={{ marginTop: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={4}>
            <Stack sx={{ justifyContent: "space-around" }} direction="row">
              <h1>Add Company</h1>
              <ActiveButton
                sx={{ borderRadius: 5, height: "50%", my: "auto" }}
                onClick={() => {
                  console.log("Bulk Upload");
                }}
              >
                Bulk Upload
              </ActiveButton>
            </Stack>
            <TextField
              label="Company Name"
              id="companyname"
              variant="standard"
            />
            <TextField label="Tags" id="tags" variant="standard" />
            <TextField label="Website" id="website" variant="standard" />
            <TextField
              multiline
              label="Description"
              id="description"
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
                Add Company
              </ActiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

New.layout = "adminPhaseDashBoard";
export default New;
