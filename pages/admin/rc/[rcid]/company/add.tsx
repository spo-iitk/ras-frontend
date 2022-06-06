import React from "react";
import { Stack, TextField, Typography, Card } from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

function AddCompany() {
  return (
    <div className={styles.container}>
      <Meta title="Add Company - Admin" />
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
            <h1>Add Company</h1>
            <Typography>
              Note: If company is not listed here then it might be not listed in
              the master database. Add it there first.
            </Typography>
            <TextField
              label="Select Company"
              id="selectCompany"
              variant="filled"
            />
            <TextField
              label="Select Active HR"
              id="selectActiveHR"
              variant="filled"
            />
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

AddCompany.layout = "adminPhaseDashBoard";
export default AddCompany;
