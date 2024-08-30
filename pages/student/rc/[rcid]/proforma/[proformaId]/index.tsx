import { Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import StepperComp from "@components/Stepper/stepperComp";
import MatrixExpanded from "@components/Utils/MatrixExpanded";
import useStore from "@store/store";
import { ProformaEvent, ProformaType } from "@callbacks/company/proforma";
import sProformaRequest from "@callbacks/student/rc/proforma";
import RichText from "@components/Editor/RichText";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

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
  const [isFetched, setisFetched] = useState(false);
  const [data, setData] = useState<string>(new Array(100 + 1).join("0"));
  const [row, setRow] = useState<ProformaType>({
    ID: 0,
  } as ProformaType);
  const [row2, setRow2] = useState<ProformaEvent[]>([]);
  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      if (ID === undefined || ID === "") return;
      let response = await sProformaRequest.get(token, rid, ID);
      setRow(response);
      let response2 = await sProformaRequest.getEvent(token, rid, ID);
      setRow2(response2);
      setCtc(response.cost_to_company);
      setJd(response.job_description);
      setPd(response.package_details);
      setisFetched(true);
      setData(response.eligibility);
    };
    getCompanydata();
  }, [token, rid, ID, data]);
  return (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title="RC - Company - Proforma" />
      <h2>Proforma</h2>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "100%", md: "800px" },
          margin: "0px auto",
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} key="bnature">
              <h3>Company Name</h3>
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
            <Grid item xs={12} md={6} key="bnature">
              <h3>Profile</h3>
              <TextField
                multiline
                fullWidth
                minRows={4}
                value={row.profile}
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
              {isFetched && <RichText onChange={setCtc} readOnly value={ctc} />}
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
              <MatrixExpanded data={data} />
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
}

Index.layout = "studentPhaseDashboard";
export default Index;
