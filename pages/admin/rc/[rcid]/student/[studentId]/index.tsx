import React from "react";
import { Stack, Card, TextField, Typography, Box } from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Link from "next/link";

const questions = [
  {
    question: "demo que",
    answer: "demo ans",
    id: "demo id",
  },
  {
    question: "demo que",
    answer: "demo ans",
    id: "demo id",
  },
  {
    question: "demo que",
    answer: "demo ans",
    id: "demo id",
  },
];

const studentData = [
  {
    studentName: "XYZ",
    emailId: "XYZ",
    contactNumber: "XYZ",
  },
];

const applicationStatus = [
  {
    companyName: "company Name",
    role: "role",
    resume: "#",
    appliedOn: "date ",
    status: "waiting",
  },
];
function Index() {
  return (
    <div>
      <Card
        elevation={5}
        sx={{
          padding: 5,
          width: {
            lg: "1200px",
            md: "900px",
            xs: "330px",
            sm: "500px",
            margin: "0px auto",
          },
        }}
      >
        {studentData.map((student) => (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            key=""
          >
            <Box gridColumn="span 6">
              <h2>Student Profile</h2>
            </Box>
            <Box gridColumn="span 3">
              <ActiveButton
                sx={{ borderRadius: 5, fontSize: 10, width: "100%" }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                View Student History
              </ActiveButton>
            </Box>
            <Box gridColumn="span 3">
              <ActiveButton
                sx={{ borderRadius: 5, fontSize: 10, width: "100%" }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                View Profile
              </ActiveButton>
            </Box>
            <Box gridColumn="span 6">
              <Typography>Student Profile Name</Typography>
            </Box>
            <Box gridColumn="span 6">
              <Typography>{student.studentName}</Typography>
            </Box>
            <Box gridColumn="span 6">
              <Typography>Email ID</Typography>
            </Box>
            <Box gridColumn="span 6">
              <Typography>{student.emailId}</Typography>
            </Box>
            <Box gridColumn="span 6">
              <Typography>SEmail ID</Typography>
            </Box>
            <Box gridColumn="span 6">
              <Typography>{student.contactNumber}</Typography>
            </Box>
          </Box>
        ))}
      </Card>
      <Card
        elevation={5}
        sx={{
          padding: 2,
          width: {
            lg: "1200px",
            md: "900px",
            xs: "330px",
            sm: "500px",
            margin: "40px auto",
          },
        }}
      >
        <h1>Enrollment Section Verification</h1>

        {questions.map((que) => (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            rowGap={2}
            key=""
          >
            <Box gridColumn="span 6">
              <Typography>{que.question}</Typography>
            </Box>
            <Box gridColumn="span 3">
              <ActiveButton
                sx={{ borderRadius: 5, fontSize: 16 }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Verify
              </ActiveButton>
            </Box>
            <Box gridColumn="span 3">
              <InactiveButton
                sx={{ borderRadius: 5, fontSize: 16 }}
                onClick={() => {
                  console.log("Hello");
                }}
              >
                Ask To Resubmit
              </InactiveButton>
            </Box>
            <Box gridColumn="span 12">
              <TextField
                id={que.id}
                value={que.answer}
                variant="outlined"
                fullWidth
                style={{ margin: "20px auto 20px" }}
              />
            </Box>
          </Box>
        ))}
      </Card>
      <Card
        elevation={5}
        sx={{
          padding: 2,
          width: {
            lg: "1200px",
            md: "900px",
            xs: "330px",
            sm: "500px",
            margin: "40px auto",
          },
        }}
      >
        <Stack>
          <h1>Application Status - Name of Recruitment Drive</h1>
          <Stack
            direction="row"
            style={{ justifyContent: "space-between", marginBottom: "40px" }}
          >
            <Typography>Name (Roll no)</Typography>
            <ActiveButton>Downlad Excel</ActiveButton>
          </Stack>
        </Stack>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 3">
            <Typography>Company Name</Typography>
          </Box>
          <Box gridColumn="span 2">
            <Typography>Role</Typography>
          </Box>
          <Box gridColumn="span 2">
            <Typography>Resume</Typography>
          </Box>
          <Box gridColumn="span 3">
            <Typography>Applied on</Typography>
          </Box>
          <Box gridColumn="span 2">
            <Typography>Status</Typography>
          </Box>
        </Box>
        {applicationStatus.map((as) => (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            key=""
          >
            <Box gridColumn="span 3">
              <Typography>{as.companyName}</Typography>
            </Box>
            <Box gridColumn="span 2">
              <Typography>{as.role}</Typography>
            </Box>
            <Box gridColumn="span 2">
              <ActiveButton>
                <Link href={as.resume}>Link</Link>
              </ActiveButton>
            </Box>
            <Box gridColumn="span 3">
              <Typography>{as.appliedOn}</Typography>
            </Box>
            <Box gridColumn="span 2">
              <ActiveButton>Status</ActiveButton>
            </Box>
          </Box>
        ))}
      </Card>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
