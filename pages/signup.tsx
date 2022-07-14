import React, { Suspense, useState } from "react";
import {
  CircularProgress,
  FormControl,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";

import Meta from "@components/Meta";
import formstyles from "@styles/Form.module.css";

const SignUpRecruiter = dynamic(() => import("../sections/signUpRecruiter"), {
  suspense: true,
});
const SignUpStudent = dynamic(() => import("../sections/signUpStudent"), {
  suspense: true,
});

function SignUp() {
  const [role, setRole] = useState(0);

  const handleRole = (event: React.SyntheticEvent, newRole: number) => {
    setRole(newRole);
  };

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Meta title="Sign Up - Recruitment Automation System" />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <div className={formstyles.image}>
          <Image
            src="/images/signup.gif"
            height={550}
            width={500}
            alt="loginPage"
          />
        </div>
        <Stack
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ minHeight: "70vh" }}
        >
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <h2>Welcome!</h2>
            <h2>Sign up to</h2>
            <Typography variant="subtitle1" color="text.secondary">
              Recruitment Portal IIT Kanpur
            </Typography>
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <Tabs
              centered
              value={role}
              onChange={handleRole}
              textColor="inherit"
              aria-label="full width tabs example"
            >
              <Tab label="Student" {...a11yProps(0)} />
              <Tab label="Recruiter" {...a11yProps(1)} />
            </Tabs>
          </FormControl>
          {role === 0 ? (
            <Suspense fallback={<CircularProgress />}>
              <SignUpStudent />
            </Suspense>
          ) : (
            <Suspense fallback={<CircularProgress />}>
              <SignUpRecruiter />
            </Suspense>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

SignUp.layout = "Navigation";
export default SignUp;
