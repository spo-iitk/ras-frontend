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
  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  const [ctc, setCtc] = useState("");
  const [jd, setJd] = useState("");
  const [pd, setPd] = useState("");
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
  return (
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
            <Grid item xs={12} key="tjobloc">
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

View.layout = "adminPhaseDashBoard";
export default View;
