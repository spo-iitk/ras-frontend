import { Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import StepperComp from "@components/Stepper/stepperComp";
import Meta from "@components/Meta";
import MatrixCondensed from "@components/Utils/MatrixCondensed";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";
import RichText from "@components/Editor/RichText";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};
const data = new Array(100 + 1).join("0");

function Index() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const PID = router.query.proformaId;
  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  const [ctc, setCtc] = useState("");
  const [jd, setJd] = useState("");
  const [pd, setPd] = useState("");
  const [row, setRow] = useState<ProformaType>({
    ID: 0,
  } as ProformaType);
  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      if (ID === undefined || ID === "") return;
      let response = await proformaRequest.get(token, rid, ID);
      setRow(response);
      setCtc(response.cost_to_company);
      setJd(response.job_description);
      setPd(response.package_details);
    };
    getCompanydata();
  }, [token, rid, ID]);

  return (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title="Software Intern - Proforma" />
      <h1>Proforma</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "320px", sm: "800px", margin: "0px auto" },
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} key="cname">
              <h3>Company Name</h3>
              <TextField
                multiline
                fullWidth
                value={row.company_name}
                disabled
                sx={textFieldSX}
              />
            </Grid>
            <Grid item xs={12} md={6} key="bnature">
              <h3>Nature of Business</h3>
              <TextField
                multiline
                fullWidth
                value={row.nature_of_business}
                disabled
                sx={textFieldSX}
              />
            </Grid>
            <Grid item xs={12} md={6} key="tjobloc">
              <h3>TentatIve Job Location</h3>
              <TextField
                multiline
                fullWidth
                value={row.tentative_job_location}
                disabled
                sx={textFieldSX}
              />
            </Grid>
            <Grid item xs={12} md={6} key="jd">
              <h3>Job Description</h3>
              <RichText onChange={setJd} readOnly value={jd} />
            </Grid>
            <Grid item xs={12} md={6} key="ctc">
              <h3>Cost to Company</h3>
              <RichText onChange={setCtc} readOnly value={ctc} />
            </Grid>
            <Grid item xs={12} md={6} key="pd">
              <h3>Package Details</h3>
              <RichText onChange={setPd} readOnly value={pd} />
            </Grid>
            <Grid item xs={12} md={6} key="bond">
              <h3>Bond Details</h3>
              <TextField
                multiline
                fullWidth
                value={row.bond_details}
                disabled
                sx={textFieldSX}
              />
            </Grid>
            <Grid item xs={12} md={6} key="MedReq">
              <h3>Medical Requirements</h3>
              <TextField
                multiline
                fullWidth
                value={row.medical_requirements}
                disabled
                sx={textFieldSX}
              />
            </Grid>
            <Grid item xs={12}>
              <h3>Eligibility</h3>
              <MatrixCondensed data={data} />
            </Grid>
            <Grid item xs={12}>
              <h3>Hiring Process</h3>
              <StepperComp />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

Index.layout = "companyPhaseDashboard";
export default Index;
