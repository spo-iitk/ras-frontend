import { Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import useStore from "@store/store";
import pvfRequest, { PvfsParams } from "@callbacks/student/rc/pvf";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

function View() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const PID = router.query.pvfid;

  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  // const [isFetched, setisFetched] = useState(false);
  const [row, setRow] = useState<PvfsParams>({
    ID: 0,
  } as PvfsParams);
  useEffect(() => {
    const getPVFDetails = async () => {
      if (router.isReady) {
        let response = await pvfRequest.get(token, rid, ID);
        setRow(response);
        // setisFetched(true);
      }
    };
    getPVFDetails();
  }, [token, rid, ID, router.isReady]);
  let content;
  content = (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title={`${PID} - Proforma Details`} />
      <h2>Proforma</h2>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "320px", sm: "1000px", margin: "0px auto" },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Grid container spacing={2} margin={0}>
            <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
              <Grid item xs={12} md={12} key="company-deets">
                <h2 style={{ textAlign: "center" }}>PVF Details</h2>
              </Grid>
              <Grid item xs={12} md={6} key="name" padding={0}>
                <h4>Company / University Name</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.company_university_name}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="address" padding={0}>
                <h4>Role</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.role}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="num-emp" padding={0}>
                <h4>Duration</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.duration}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="social" padding={0}>
                <h4>Mentor Name</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.mentor_name}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="website" padding={0}>
                <h4>Mentor Email</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.mentor_email}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="turnover" padding={0}>
                <h4>Mentor Designation</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.mentor_designation}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
              <Grid item xs={12} md={12} key="company-deets">
                <h2 style={{ textAlign: "center" }}>Internship Details</h2>
              </Grid>
              <Grid item xs={12} md={6} key="profile" padding={0}>
                <h4>Profile</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.profile}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="skills" padding={0}>
                <h4>Required Skill Set</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.skill_set}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="tjobloc" padding={0}>
                <h4>Tentative Job Location / online</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.tentative_job_location}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="min-hires" padding={0}>
                <h4>Minimum Number of Hires</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.min_hires}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="tot-hires" padding={0}>
                <h4>Expected Total Number of Hires</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.total_hires}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="int-per" padding={0}>
                <h4>Preferred period of Internship</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row.internship_period}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={12} key="ctc">
                <h4>Job Description</h4>
                {isFetched && <RichText onChange={setJd} readOnly value={jd} />}
              </Grid>
            </Grid> */}
          </Grid>
        </Stack>
      </Card>
    </div>
  );
  return content;
}

View.layout = "studentPhaseDashboard";
export default View;
