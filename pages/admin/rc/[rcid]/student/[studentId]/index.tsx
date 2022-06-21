import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

const questions = [
  {
    question: "What do you like about working at the company?",
    answer: "Nothing",
    id: "1",
  },
  {
    question: "What do you think of the company's culture?",
    answer: "Nothing",
    id: "2",
  },
  {
    question: "Whatt are you looking for in a job?",
    answer: "Nothing",
    id: "3",
  },
];

const studentData = [
  {
    field: "Name",
    value: "XYZ",
  },
  {
    field: "Email",
    value: "XYZ",
  },
  {
    field: "Phone",
    value: "XYZ",
  },
];

const cols: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "resume",
    headerName: "Resume",
    width: 200,
  },
  {
    field: "appliedOn",
    headerName: "Applied On",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
];

const rows = [
  {
    id: "1",
    companyName: "company Name",
    role: "role",
    resume: "#",
    appliedOn: "date ",
    status: "waiting",
  },
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Student Details - Admin" />
      <Stack spacing={2} alignItems="center">
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: {
              md: "800px",
              xs: "100%",
            },
          }}
        >
          <Stack spacing={2} justifyContent="center">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <h1>Student Details</h1>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button size="small" variant="outlined" sx={{ width: "100%" }}>
                  View Profile
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {studentData.map((student) => (
                    <Grid item xs={6}>
                      <p>{student.field}</p>
                      <TextField
                        value={student.value}
                        variant="standard"
                        disabled
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Card>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: {
              md: "800px",
              xs: "100%",
            },
          }}
        >
          {" "}
          <Stack spacing={2}>
            <h1>Enrollment Section Verification</h1>
            <Stack spacing={8}>
              {questions.map((que) => (
                <div>
                  <Grid
                    container
                    spacing={2}
                    key={que.id}
                    justifyItems="center"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} md={6}>
                      <Stack spacing={4}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {que.question}
                        </Typography>
                        <TextField
                          disabled
                          multiline
                          variant="standard"
                          value={que.answer}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid
                        container
                        spacing={3}
                        justifyItems="center"
                        alignItems="center"
                      >
                        <Grid item xs={6}>
                          <Button variant="outlined" sx={{ width: "100%" }}>
                            Verify
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="outlined" sx={{ width: "100%" }}>
                            Ask to resubmit
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Stack>
          </Stack>
        </Card>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: {
              md: "800px",
              xs: "100%",
            },
          }}
        >
          <Stack>
            <h1>Application Status - Name of Recruitment Drive</h1>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Name (Roll no)</Typography>
            </Stack>
          </Stack>
          <div style={{ height: 500, margin: "0px auto" }}>
            <DataGrid
              rows={rows}
              columns={cols}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Card>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
