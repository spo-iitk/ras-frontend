import { Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import StepperComp from "@components/Stepper/stepperComp";
import Meta from "@components/Meta";
import MatrixCondensed from "@components/Utils/MatrixCondensed";
import useStore from "@store/store";
import proformaRequest, {
  ProformaEvent,
  ProformaType,
} from "@callbacks/company/proforma";
import RichText from "@components/Editor/RichText";
import MatrixExpanded from "@components/Utils/MatrixExpanded";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};
const data1 = new Array(100 + 1).join("0");

function Index() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const PID = router.query.proformaid;
  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  const [ctc, setCtc] = useState("");
  const [jd, setJd] = useState("");
  const [pd, setPd] = useState("");
  const [isFetched, setisFetched] = useState(false);
  const [row, setRow] = useState<ProformaType>({
    ID: 0,
  } as ProformaType);
  const [row2, setRow2] = useState<ProformaEvent[]>([]);
  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      if (ID === undefined || ID === "") return;
      let response = await proformaRequest.get(token, rid, ID);
      setRow(response);
      let response2 = await proformaRequest.getEvent(token, rid, ID);
      setRow2(response2);
      setCtc(response.cost_to_company);
      setJd(response.job_description);
      setPd(response.package_details);
      setisFetched(true);
    };
    getCompanydata();
  }, [token, rid, ID]);
  const data = row.eligibility?.length > 110 ? row.eligibility : data1;

  // Conditional rendering based on rcid
  let content;
  if (+rid % 2 === 0) {
    content = (
      <div style={{ padding: "0 2rem", marginBottom: 20 }}>
        <Meta title="Proforma" />
        <h2>Proforma</h2>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "320px", sm: "800px", margin: "0px auto" },
          }}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} key="bnature">
                <h3>Nature of Business</h3>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.role}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="tjobloc">
                <h3>Tentative Job Location</h3>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.tentative_job_location}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={12} key="jd">
                <h3>Job Description</h3>
                {isFetched && <RichText onChange={setJd} readOnly value={jd} />}
              </Grid>
              <Grid item xs={12} md={12} key="ctc">
                <h3>Cost to Company</h3>
                {isFetched && (
                  <RichText onChange={setCtc} readOnly value={ctc} />
                )}
              </Grid>
              <Grid item xs={12} md={12} key="pd">
                <h3>Package Details</h3>
                {isFetched && <RichText onChange={setPd} readOnly value={pd} />}
              </Grid>
              <Grid item xs={12} md={6} key="bond">
                <h3>Bond Details</h3>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.bond_details}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="MedReq">
                <h3>Medical Requirements</h3>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.medical_requirements}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12}>
                <h3>Eligibility</h3>
                <MatrixCondensed data={data} />
              </Grid>
              <Grid item xs={12}>
                <h3>Hiring Process</h3>
                <StepperComp steps={row2} rcid={rcid as string} />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </div>
    );
  } else {
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
                  <h2 style={{ textAlign: "center" }}>Company Details</h2>
                </Grid>
                <Grid item xs={12} md={6} key="name" padding={0}>
                  <h4>Company Name</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.company_name}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="address" padding={0}>
                  <h4>Postal Address</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.postal_address}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="num-emp" padding={0}>
                  <h4>Number of Employees</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.total_employees}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="social" padding={0}>
                  <h4>Social Media Page</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.social_media}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="website" padding={0}>
                  <h4>Website</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.website}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="turnover" padding={0}>
                  <h4>Company Turnover</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.turnover}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="type" padding={0}>
                  <h4>Type of Organisation</h4>
                  <TextField
                    multiline
                    fullWidth
                    minRows={4}
                    value={row.type_of_org}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="nature" padding={0}>
                  <h4>Nature of business</h4>
                  <TextField
                    multiline
                    fullWidth
                    minRows={4}
                    value={row.role}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
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
                <Grid item xs={12} md={6} key="cpi" padding={0}>
                  <h4>CPI Criteria</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.cpi_criteria}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={12} key="pwd" padding={0}>
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
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
                <Grid item xs={12} md={12} key="pd" padding={0}>
                  <h2 style={{ textAlign: "center" }}>Stipend Details</h2>
                </Grid>
                <Grid item xs={12} md={6} key="ctc-inr" padding={0}>
                  <h4>Stipend (per month) (in INR) </h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.ctc_inr}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="ctc-fr" padding={0}>
                  <h4>Stipend (per month) (in foreign currency) </h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.ctc_fr}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="accommodation" padding={0}>
                  <h4>Accommodation provided / Trip Fare</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.accommodation}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="pd">
                  <h4>PPO provision on Performance</h4>
                  {isFetched && (
                    <RichText onChange={setPd} readOnly value={pd} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} key="base" padding={0}>
                  <h4>Tentative date of confirming of PPOs</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.ppo_confirming_date}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="perks" padding={0}>
                  <h4>Perks</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.perks}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="ctc">
                  <h4>Tentative CTC for PPO Selects</h4>
                  {isFetched && (
                    <RichText onChange={setCtc} readOnly value={ctc} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} key="MedReq">
                  <h4>Medical Requirements</h4>
                  <TextField
                    multiline
                    fullWidth
                    minRows={4}
                    value={row.medical_requirements}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
                <Grid item xs={12}>
                  <h2 style={{ textAlign: "center" }}>Eligibility</h2>
                  <MatrixExpanded data={data} />
                </Grid>
                <Grid item xs={12}>
                  <h2 style={{ textAlign: "center" }}>Hiring Process</h2>
                  <StepperComp steps={row2} rcid={rcid as string} />
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </div>
    );
  }
  return content;
}

Index.layout = "companyPhaseDashboard";
export default Index;
