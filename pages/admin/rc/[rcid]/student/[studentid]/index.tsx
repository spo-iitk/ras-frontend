import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import enrollQuestion from "@callbacks/admin/rc/student/enrollQuestion";
import { studentEnrollResponse } from "@callbacks/student/rc/enrollQuestion";
import getStudents, { Student } from "@callbacks/admin/rc/student/getStudents";
import { getDeptProgram } from "@components/Parser/parser";

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
  const { rcid, studentid } = useRouter().query;
  const { token } = useStore();
  const [questionAnswer, setQuestionAnswer] =
    React.useState<studentEnrollResponse[]>();
  const [student, setStudent] = React.useState<Student>();
  useEffect(() => {
    const fetchData = async () => {
      if (
        rcid !== undefined &&
        rcid !== "" &&
        studentid !== undefined &&
        studentid !== ""
      ) {
        const answers = await enrollQuestion
          .getStudentAnswers(token, rcid.toString(), studentid.toString())
          .catch(() => ({ type: "null" } as studentEnrollResponse));
        setQuestionAnswer(answers);

        const studentData = await getStudents
          .getStudent(token, rcid.toString(), studentid.toString())
          .catch(() => ({ type: "null" } as Student));
        setStudent(studentData);
      }
    };
    fetchData();
  }, [rcid, token, studentid]);

  const handleVerify = async () => {
    if (rcid !== undefined && rcid !== "" && student !== undefined) {
      await getStudents.update(
        token,
        { ...student, is_verified: true },
        rcid.toString()
      );
      window.location.reload();
    }
  };

  return (
    <div className="container">
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
          <Stack spacing={2} justifyContent="center" sx={{ marginBottom: 5 }}>
            <Stack
              spacing={4}
              direction={{ sm: "row", xs: "column" }}
              alignItems={{ sm: "center", xs: "flex-start" }}
              justifyContent={{ sm: "space-between", xs: "center" }}
            >
              <h1 style={{ width: "100%" }}>Student Details</h1>
              <Link href={`/admin/student/${studentid}`}>
                <Button size="small" variant="contained" sx={{ width: "100%" }}>
                  View Profile
                </Button>
              </Link>
            </Stack>
          </Stack>
          {student && (
            <Stack spacing={2} justifyContent="center" sx={{ marginBottom: 5 }}>
              <Stack
                spacing={4}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {student.is_verified ? (
                  <Button
                    startIcon={
                      <CheckCircleOutlineIcon sx={{ color: "green" }} />
                    }
                    sx={{ color: "green" }}
                  >
                    Verified
                  </Button>
                ) : (
                  <Button
                    startIcon={<NotInterestedIcon sx={{ color: "red" }} />}
                    sx={{ color: "red" }}
                  >
                    Not Verified
                  </Button>
                )}

                {student.is_frozen ? (
                  <Button sx={{ color: "red" }}>Frozen</Button>
                ) : (
                  <Button sx={{ color: "green" }}>Not frozen</Button>
                )}
              </Stack>
            </Stack>
          )}
          {student && (
            <Grid
              container
              spacing={9}
              justifyItems="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} md={6}>
                <p>Name</p>
                <TextField
                  value={student.name}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p>Program-Department</p>
                <TextField
                  value={getDeptProgram(student.program_department_id)}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p>Secondary Program- Secondary Department</p>
                <TextField
                  value={getDeptProgram(
                    student.secondary_program_department_id
                  )}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p>Email</p>
                <TextField
                  value={student.email}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p>CPI</p>
                <TextField
                  value={student.cpi}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p>Comment</p>
                <TextField
                  value={student.comment}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
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
          <h1 style={{ marginBottom: 50 }}>Enrollment Section Verification</h1>

          {questionAnswer && questionAnswer.length > 0 && (
            <div>
              <Grid
                container
                spacing={9}
                justifyItems="center"
                alignItems="flex-start"
                marginBottom={10}
              >
                {questionAnswer.map((question) => (
                  <Grid item xs={12} md={6} key={question.ID}>
                    <Stack spacing={4}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {question.question}
                        {"  "}
                        {question.mandatory && (
                          <Typography variant="caption" color="error">
                            *Required
                          </Typography>
                        )}
                      </Typography>

                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        variant="standard"
                        value={question.answer}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={handleVerify}
                  disabled={student?.is_verified || student?.is_frozen}
                >
                  Verify
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  disabled={student?.is_verified || student?.is_frozen}
                >
                  Ask Clarification
                </Button>
              </Stack>
            </div>
          )}
          {(!questionAnswer || questionAnswer.length <= 0) && (
            <h3>No Record Found</h3>
          )}
        </Card>
      </Stack>
      <div style={{ marginTop: 50 }}>
        <h1>Application Status - Name of Recruitment Drive</h1>
        <DataGrid rows={rows} columns={cols} />
      </div>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
