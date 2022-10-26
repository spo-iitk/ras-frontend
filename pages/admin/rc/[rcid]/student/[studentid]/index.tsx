import {
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import adminResumeRequest, {
  // AllStudentResumeResponse,
  StudentResumeResponse,
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

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

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
    field: "profile",
    headerName: "Profile",
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

function AcceptResumeButton(props: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, updateCallback } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <Button
      variant="contained"
      sx={{
        marginInlineEnd: "0.5rem",
      }}
      onClick={() => {
        adminResumeRequest
          .putVerify(token, rid, id, { verified: true })
          .then(() => {
            updateCallback();
          });
      }}
    >
      Accept
    </Button>
  );
}

function RejectResumeButton(props: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, updateCallback } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <Button
      variant="contained"
      onClick={() => {
        adminResumeRequest
          .putVerify(token, rid, id, { verified: false })
          .then(() => {
            updateCallback();
          });
      }}
    >
      Reject
    </Button>
  );
}
function Index() {
  const { rcid, studentid } = useRouter().query;
  const rid = (rcid || "").toString();
  const sid = (studentid || "").toString();
  const { token, role } = useStore();
  const [questionAnswer, setQuestionAnswer] =
    useState<studentEnrollResponse[]>();
  const [student, setStudent] = useState<Student>({ student_id: 0 } as Student);

  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [studentResume, setStudentResume] = useState<StudentResumeResponse[]>(
    []
  );
  // const [resumeVerificationStatus, setResumeVerificationStatus] = useState("");

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

        const resume = await adminResumeRequest.get(token, rid, sid);
        if (resume !== null && resume?.length > 0) {
          setStudentResume(resume);
        } else setStudentResume([]);
      }
    };

    fetchData();
  }, [rid, token, studentid, rcid, sid]);

  const updateResumeStatus = React.useCallback(async () => {
    if (rid === undefined || rid === "") return;
    const res = await adminResumeRequest.get(token, rid, sid);
    if (res !== null && res?.length > 0) setStudentResume(res);
    else setStudentResume([]);
  }, [rid, token, sid]);

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

  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const resumeCols: GridColDef[] = [
    {
      field: "ID",
      headerName: "Resume ID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CreatedAt",
      headerName: "Created At",
      align: "center",
      hide: true,
    },
    {
      field: "UpdatedAt",
      headerName: "Updated At",
      align: "center",
      hide: true,
    },
    {
      field: "DeletedAt",
      headerName: "Deleted At",
      align: "center",
      hide: true,
    },
    {
      field: "recruitment_cycle_id",
      headerName: "RID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "student_recruitment_cycle_id",
      headerName: "SID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "resume",
      headerName: "Resume Link",
      sortable: false,
      align: "center",
      width: 400,
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
          {transformName(params.value)}
        </Button>
      ),
    },
    {
      field: "verified",
      headerName: "Verification Status",
      align: "center",
      headerAlign: "center",
      valueGetter: ({ value }) => {
        if (value?.Valid) {
          if (value?.Bool) return "Accepted";
          return "Rejected";
        }
        if (!value?.Valid) return "Pending Verification";
        return "Unkown";
      },
    },
    {
      field: "action_taken_by",
      headerName: "Action Taken By",
      align: "center",
      headerAlign: "center",
      hide: true,
    },
    {
      field: "options",
      headerName: "Accept/Reject Resume",
      align: "center",
      // eslint-disable-next-line consistent-return
      renderCell: (cellValues) => {
        if (!cellValues.row.verified?.Valid || role === 100 || role === 101) {
          return (
            <Container>
              <AcceptResumeButton
                id={cellValues.id.toString()}
                updateCallback={updateResumeStatus}
              />
              <RejectResumeButton
                id={cellValues.id.toString()}
                updateCallback={updateResumeStatus}
              />
            </Container>
          );
        }
      },
    },
  ];

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
              <Button
                href={`/admin/student/${student.student_id}`}
                size="small"
                variant="contained"
                sx={{ width: "100%" }}
              >
                View Profile
              </Button>
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
      </Stack>
      <div style={{ marginTop: 50 }}>
        <h2>Verification Status</h2>
        <DataGrid
          heighted
          columns={resumeCols}
          rows={studentResume}
          getRowId={(row) => row?.ID || 0}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <h2>Application Status</h2>
        <DataGrid rows={applications} columns={cols} />
      </div>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
