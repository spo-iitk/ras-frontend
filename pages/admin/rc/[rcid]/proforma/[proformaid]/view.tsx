import { Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MatrixExpanded from "@components/Utils/MatrixExpanded";
import StepperComp from "@components/Stepper/stepperComp";
import Meta from "@components/Meta";
import useStore from "@store/store";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import eventRequest, { Event } from "@callbacks/admin/rc/proforma/event";
import RichText from "@components/Editor/RichText";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};
const data1 = new Array(100 + 1).join("0");

function View() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const PID = router.query.proformaid;
  const [ctc, setCtc] = useState("");
  const [pd, setPd] = useState("");
  const [jd, setJd] = useState("");
  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  const [isFetched, setisFetched] = useState(false);
  const [row, setRow] = useState<AdminProformaType>({
    ID: 0,
  } as AdminProformaType);
  const [row2, setRow2] = useState<Event[]>([]);
  useEffect(() => {
    const getCompanydata = async () => {
      if (router.isReady) {
        let response = await requestProforma.get(token, rid, ID);
        setRow(response);
        let response2 = await eventRequest.getAll(token, rid, ID);
        setRow2(response2);
        setCtc(response.cost_to_company);
        setJd(response.job_description);
        setPd(response.package_details);
        setisFetched(true);
      }
    };
    getCompanydata();
  }, [token, rid, ID, router.isReady]);
  const data = row.eligibility?.length > 110 ? row.eligibility : data1;
  // Conditional rendering based on rcid
  let content;
  if (+rid % 2 === 0) {
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
                  <h2 style={{ textAlign: "center" }}>Job Details</h2>
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
                  <h4>Tentative Job Location</h4>
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
                    value={row.total_employees}
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
                <Grid item xs={12} md={6} key="pwd" padding={0}>
                  <h4>Availability for PWD/DAP</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.pwd}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="backlog" padding={0}>
                  <h4>Backlog Eligibility</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.backlog_eligibility}
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
                  <h2 style={{ textAlign: "center" }}>Package Details</h2>
                </Grid>
                <Grid item xs={12} md={6} key="ctc-inr" padding={0}>
                  <h4>CTC (in INR) </h4>
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
                  <h4>CTC (in foreign currency) </h4>
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
                <Grid item xs={12} md={6} key="ctc">
                  <h4>Cost To Company</h4>
                  {isFetched && (
                    <RichText onChange={setCtc} readOnly value={ctc} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} key="gross" padding={0}>
                  <h4>Gross (per annum)</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.gross}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="take-home" padding={0}>
                  <h4>Fixed take home salary (per annum)</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.take_home}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="base" padding={0}>
                  <h4>Base Salary</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.base}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="join-bonus" padding={0}>
                  <h4>Joining Bonus</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.joining_bonus}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="reloc-bonus" padding={0}>
                  <h4>Relocation Bonus</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.relocation_bonus}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="reten-bonus" padding={0}>
                  <h4>Retention Bonus</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.retention_bonus}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="med-allow" padding={0}>
                  <h4>Medical Allowance</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.medical_allowance}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="deduction" padding={0}>
                  <h4>Deductions</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.deductions}
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
                <Grid item xs={12} md={6} key="first-year-ctc" padding={0}>
                  <h4>1st Year CTC</h4>
                  <TextField
                    multiline
                    fullWidth
                    value={row.first_ctc}
                    InputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={6} key="ctc">
                  <h4>Total CTC</h4>
                  {isFetched && (
                    <RichText onChange={setPd} readOnly value={pd} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} key="bond">
                  <h4>Bond Details</h4>
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
                <Grid item xs={12} md={12} key="ctc">
                  <h4>Job Description</h4>
                  {isFetched && (
                    <RichText
                      onChange={setJd}
                      readOnly
                      value={row.job_description}
                    />
                  )}
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
                <Grid item xs={12} md={6} key="ctc">
                  <h4>Tentative CTC for PPO Selects</h4>
                  {isFetched && (
                    <RichText onChange={setCtc} readOnly value={ctc} />
                  )}
                </Grid>
                <Grid item xs={12} md={6} key="pd">
                  <h4>PPO provision on Performance</h4>
                  {isFetched && (
                    <RichText onChange={setPd} readOnly value={pd} />
                  )}
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

View.layout = "adminPhaseDashBoard";
export default View;
