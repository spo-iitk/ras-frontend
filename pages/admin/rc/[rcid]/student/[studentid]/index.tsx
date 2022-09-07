import {
  Button,
  Card,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import adminResumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/admin/rc/student/resumes";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import enrollQuestion from "@callbacks/admin/rc/student/enrollQuestion";
import { studentEnrollResponse } from "@callbacks/student/rc/enrollQuestion";
import getStudents, { Student } from "@callbacks/admin/rc/student/getStudents";
import { getDeptProgram } from "@components/Parser/parser";
import getStudentApplication, {
  ApplicationResponse,
} from "@callbacks/admin/rc/student/getApplications";
import { CDN_URL } from "@callbacks/constants";
import Clarification from "@components/Modals/clarification";

// const transformName = (name: string) => {
//   const nname = name.replace(`${CDN_URL}/view/`, "");
//   const nameArray = nname.split(".");
//   const newName = nameArray[0].slice(14, -33);
//   const newNameWithExtension = `${newName}.${nameArray[1]}`;
//   return newNameWithExtension;
// };

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

const cols: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "company_name",
    headerName: "Company Name",
  },
  {
    field: "role",
    headerName: "Role",
  },
  {
    field: "resume",
    headerName: "Applied Resume",
    sortable: false,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => getURL(params?.value),
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => {
          window.open(params.value, "_blank");
        }}
      >
        Resume ID: {params.row.resume_id}
      </Button>
    ),
  },
  {
    field: "applied_on",
    headerName: "Applied On",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "100%", color: "green" }}
        color="success"
      >
        {params.row.status}
      </Button>
    ),
  },
];

function Index() {
  const { rcid, studentid } = useRouter().query;
  const rid = (rcid || "").toString();
  const sid = (studentid || "").toString();
  const { token } = useStore();
  const [questionAnswer, setQuestionAnswer] =
    useState<studentEnrollResponse[]>();
  const [student, setStudent] = useState<Student>({ student_id: 0 } as Student);

  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [studentResume, setStudentResume] = useState<AllStudentResumeResponse>({
    name: "",
    email: "",
    sid: 0,
    rsid: 0,
    resume: "",
    verified: { Bool: false, Valid: false },
    action_taken_by: "",
  });
  const [resumeVerificationStatus, setResumeVerificationStatus] = useState("");

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

        const studentApplications = await getStudentApplication
          .getAll(token, rcid.toString(), studentid.toString())
          .catch(() => ({ type: "null" } as unknown as ApplicationResponse[]));
        if (studentApplications && studentApplications.length > 0)
          setApplications(studentApplications);
        else setApplications([]);

        const resume = await adminResumeRequest.get(
          token,
          rcid.toString(),
          studentid.toString()
        );
        setStudentResume(resume);

        if (resume.verified?.Valid) {
          if (resume.verified?.Bool) setResumeVerificationStatus("Accepted");
          else setResumeVerificationStatus("Rejected");
        } else if (!resume.verified?.Valid)
          setResumeVerificationStatus("Pending Verification");
        else setResumeVerificationStatus("Unkown");
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

  const updateResumeStatus = React.useCallback(async () => {
    if (rid === undefined || rid === "") return;
    const res = await adminResumeRequest.get(token, rid, sid);
    if (res !== null) setStudentResume(res);
    else
      setStudentResume({
        name: "",
        email: "",
        sid: 0,
        rsid: 0,
        resume: "",
        verified: { Bool: false, Valid: false },
        action_taken_by: "",
      });
  }, [rid, token, sid]);

  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const [openAskClarification, setOpenAskClarification] = useState(false);
  const handleOpenAskClarification = () => {
    setOpenAskClarification(true);
  };
  const handleCloseAskClarification = () => {
    setOpenAskClarification(false);
  };

  return (
    <div>
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
              <h2 style={{ width: "100%" }}>Student Details</h2>
              <Link href={`/admin/student/${student.student_id}`}>
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
          <h2 style={{ marginBottom: 50 }}>Enrollment Section Verification</h2>

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
            </div>
          )}
          {(!questionAnswer || questionAnswer.length <= 0) && (
            <h3>No Record Found</h3>
          )}
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
              onClick={handleOpenNew}
            >
              Ask Clarification
            </Button>
            <Modal open={openNew} onClose={handleCloseNew}>
              <Clarification
                handleCloseNew={handleCloseNew}
                studentID={studentid as string}
                context="your enrollment questions"
              />
            </Modal>
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
            <h2 style={{ marginBottom: 50 }}>Resume Status</h2>
            <div>
              <Grid
                container
                spacing={9}
                justifyItems="center"
                alignItems="flex-start"
                // marginBottom={10}
              >
                <Grid item xs={12} md={6}>
                  <Typography>Resume ID: {studentResume.rsid}</Typography>
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={() => {
                      window.open(getURL(studentResume?.resume), "_blank");
                    }}
                  >
                    View Resume
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>
                    Verification Status: {resumeVerificationStatus}
                  </Typography>
                  <Typography>
                    Action Taken By: {studentResume.action_taken_by}
                  </Typography>
                </Grid>
                {!studentResume.verified?.Valid && (
                  <>
                    <Grid item xs={12} md={6}>
                      <div>
                        <Modal
                          open={openAskClarification}
                          onClose={handleCloseAskClarification}
                        >
                          <Clarification
                            handleCloseNew={handleCloseAskClarification}
                            studentID={sid}
                            context={`Your resume ${getURL(
                              studentResume?.resume
                            )}`}
                          />
                        </Modal>
                        <Button
                          sx={{ height: 30 }}
                          onClick={handleOpenAskClarification}
                        >
                          Ask Clarification
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack direction="row" spacing={4}>
                        {" "}
                        <Button
                          variant="contained"
                          sx={{
                            marginInlineEnd: "0.5rem",
                          }}
                          onClick={() => {
                            adminResumeRequest
                              .putVerify(
                                token,
                                rid,
                                studentResume.rsid.toString(),
                                {
                                  verified: true,
                                }
                              )
                              .then(() => {
                                updateResumeStatus();
                              });
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginInlineEnd: "0.5rem",
                          }}
                          onClick={() => {
                            adminResumeRequest
                              .putVerify(
                                token,
                                rid,
                                studentResume.rsid.toString(),
                                {
                                  verified: false,
                                }
                              )
                              .then(() => {
                                updateResumeStatus();
                              });
                          }}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Grid>
                  </>
                )}
              </Grid>
            </div>
          </Stack>
        </Card>
      </Stack>
      <div style={{ marginTop: 50 }}>
        <h2>Application Status</h2>
        <DataGrid rows={applications} columns={cols} />
      </div>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
