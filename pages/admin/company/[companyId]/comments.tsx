import React from "react";
import { Card, Stack, TextField } from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

function Comments() {
  return (
    <div className={styles.container}>
      <Meta title="Company History - Admin" />
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
              <h1>Add Company History</h1>
            </Stack>
            <TextField
              label="Company Name"
              id="companyname"
              variant="standard"
            />
            <TextField
              label="Company Name"
              id="companyname"
              variant="standard"
            />
            <TextField
              label="Recruitment Drive"
              id="recruitment"
              variant="standard"
            />
            <TextField
              label="Comments"
              id="comments"
              variant="standard"
              multiline
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
                Add
              </ActiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

Comments.layout = "adminPhaseDashBoard";
export default Comments;
