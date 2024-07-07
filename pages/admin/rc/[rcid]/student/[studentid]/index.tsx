import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CloseIcon from "@mui/icons-material/Close";

import adminPvfRequest, {
  AllStudentPvfResponse,
} from "@callbacks/admin/rc/pvf";
import adminResumeRequest, {
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
import DocumentGrid from "@components/DocumentGrid";
import InactiveButton from "@components/Buttons/InactiveButton";
import ActiveButton from "@components/Buttons/ActiveButton";

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};
const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
interface Params {
  row: AllStudentPvfResponse;
}
interface RejectParams {
  open: boolean;
  id: string;
  remarks: string;
}
const getURL = (url: string) => `${CDN_URL}/view/${url}`;
const cols: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "company_name",
    headerName: "Company Name",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "profile",
    headerName: "Profile",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
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
function GenerateAuthButton(props: {
  id: string;
  rid: string;
  isGenerated: boolean;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, rid, isGenerated, updateCallback } = props;
  return (
    <Button
      variant="contained"
      sx={{
        marginInlineEnd: "0.5rem",
      }}
      onClick={() => {
        adminPvfRequest.generateAuth(token, rid, id).then(() => {
          updateCallback();
        });
      }}
    >
      {isGenerated ? "Re-Send Link" : "Send Link"}
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
      Reject PVF
    </Button>
  );
}
function RejectPvfButton(props: {
  id: string;
  remarks: string;
  setOpenDeny: React.Dispatch<React.SetStateAction<RejectParams>>;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, remarks, setOpenDeny, updateCallback } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <InactiveButton
      variant="contained"
      onClick={() => {
        adminPvfRequest
          .update(token, rid, {
            remarks,
            ID: Number(id),
            is_verified: { Valid: true, Bool: false },
          } as AllStudentPvfResponse)
          .then(() => {
            updateCallback();
            setOpenDeny({ open: false, id: "0", remarks: "" });
          });
      }}
    >
      Reject
    </InactiveButton>
  );
}
const renderStatusButton = (params: Params) => {
  const { is_verified } = params.row;

  if (!is_verified.Valid) {
    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "80%" }}
        startIcon={<AvTimerIcon />}
      >
        Pending by SPO
      </Button>
    );
  }

  if (is_verified.Bool) {
    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "80%", color: "green" }}
        color="success"
        startIcon={<CheckIcon sx={{ color: "green" }} />}
      >
        Accepted
      </Button>
    );
  }

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "10px", width: "80%", color: "red" }}
      color="error"
      startIcon={<CloseIcon sx={{ color: "red" }} />}
    >
      Rejected
    </Button>
  );
};

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
  const [studentPVF, setStudentPVF] = useState<AllStudentPvfResponse[]>([]);
  const [openDeny, setOpenDeny] = useState<RejectParams>({
    open: false,
    id: "0",
    remarks: "",
  });
  const [remarks, setRemarks] = useState("");
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

        const pvf = await adminPvfRequest.getAllStudent(token, rid, sid);
        if (pvf != null && pvf.length > 0) {
          setStudentPVF(pvf);
        } else setStudentPVF(pvf);
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
  const updatePVFStatus = React.useCallback(async () => {
    if (rid === undefined || rid === "") return;
    const res = await adminPvfRequest.getAllStudent(token, rid, sid);
    if (res !== null && res?.length > 0) setStudentPVF(res);
    else setStudentPVF([]);
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
  const pvfCols: GridColDef[] = [
    {
      field: "ID",
      headerName: "PVF ID",
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
      field: "filename_student",
      headerName: "PVF Link",
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
      renderCell: renderStatusButton,
    },
    {
      field: "pvf",
      headerName: "View PVF",
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ActiveButton
          href={`/admin/rc/${rid}/pvf/${params.row.ID}`}
          sx={{ height: 30, width: "100%" }}
        >
          View PVF
        </ActiveButton>
      ),
    },
    {
      field: "options",
      headerName: "Genarate Link",
      align: "center",
      headerAlign: "center",
      width: 500,
      renderCell: (cellValues) => {
        if (!cellValues.row.is_verified?.Valid) {
          return (
            <Container>
              <GenerateAuthButton
                isGenerated={!!cellValues.row.is_approved?.Valid}
                rid={rid}
                id={cellValues.id.toString()}
                updateCallback={updatePVFStatus}
              />
            </Container>
          );
        }
        return (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            Action is Taken
          </InactiveButton>
        );
      },
    },
    {
      field: "option",
      headerName: "Reject",
      align: "center",
      headerAlign: "center",
      width: 500,
      renderCell: (cellValues) => {
        if (!cellValues.row.is_verified?.Valid) {
          return (
            <Button
              variant="contained"
              onClick={() => {
                setOpenDeny({
                  open: true,
                  id: cellValues.id.toString(),
                  remarks,
                });
              }}
            >
              Reject
            </Button>
          );
        }
        return (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            Action is Taken
          </InactiveButton>
        );
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
        <h2>Resume Verification Status</h2>
        <DataGrid
          heighted
          columns={resumeCols}
          rows={studentResume}
          getRowId={(row) => row?.ID || 0}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <h2>Document Verification Status</h2>
        <DocumentGrid studentId={`${student.student_id}`} />
      </div>
      <div style={{ marginTop: 50 }}>
        <h2>PVF Verification Status</h2>
        <DataGrid
          heighted
          columns={pvfCols}
          rows={studentPVF}
          getRowId={(row) => row?.ID || 0}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <h2>Application Status</h2>
        <DataGrid rows={applications} columns={cols} />
      </div>
      <Modal
        open={openDeny.open}
        onClose={() => {
          setOpenDeny({ open: false, id: "0", remarks: "" });
          setRemarks("");
        }}
      >
        <Box sx={boxStyle}>
          <Box sx={{ textAlign: "center" }}>
            <h2>Confirmation!</h2>
            <Typography sx={{ textAlign: "center" }}>
              You won't be able to change it after confirmation
            </Typography>
          </Box>
          <Stack spacing={2}>
            <FormControl sx={{ m: 1 }}>
              <h4>Write your Remarks</h4>
              <TextField
                multiline
                fullWidth
                minRows={2}
                // value={row?.remarks}
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
                InputProps={{
                  style: { textAlign: "center" },
                  // readOnly: true,
                }}
              />
            </FormControl>

            <Stack justifyContent="center" alignItems="center">
              <RejectPvfButton
                remarks={remarks}
                setOpenDeny={setOpenDeny}
                id={openDeny.id}
                updateCallback={updatePVFStatus}
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
