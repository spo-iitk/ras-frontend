import { Button, Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import Meta from "@components/Meta";
import useStore from "@store/store";
import pvfRequest, { PvfsParams } from "@callbacks/student/rc/pvf";
import { CDN_URL } from "@callbacks/constants";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};
const getURL = (url: string) => `${CDN_URL}/view/${url}`;

function View() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const PID = router.query.pvfid;
  const rid = (rcid || "").toString();
  const ID = (PID || "").toString();
  // const [status, setStatus] = useState<string>("");
  const [row, setRow] = useState<PvfsParams>({
    ID: 0,
  } as PvfsParams);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const getStatus = (isVerified: any) => {
  //   if (isVerified) {
  //     if (!isVerified.Valid) {
  //       return "Pending by SPO";
  //     }
  //     if (isVerified.Bool) {
  //       return "Approved";
  //     }
  //     return "Rejected";
  //   }
  //   return "";
  // };
  useEffect(() => {
    const getPVFDetails = async () => {
      if (router.isReady) {
        let response = await pvfRequest.get(token, rid, ID);
        setRow(response);
        // setisFetched(true);
      }
    };
    getPVFDetails();
    // setStatus(getStatus(row.is_verified));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, rid, ID, router.isReady]);
  let content;
  content = (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title={`${PID} - PVF Details`} />
      {/* <h2>Manage PVF</h2> */}
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
              <Grid item xs={12} md={12} key="pvf-details">
                <h2 style={{ textAlign: "center" }}>PVF Details</h2>
              </Grid>
              <Grid item xs={12} md={6} key="comp_name" padding={0}>
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
              <Grid item xs={12} md={6} key="role" padding={0}>
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
              <Grid item xs={12} md={6} key="dur" padding={0}>
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
              <Grid item xs={12} md={6} key="name" padding={0}>
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
              <Grid item xs={12} md={6} key="email" padding={0}>
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
              <Grid item xs={12} md={6} key="designation" padding={0}>
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
              <Grid item xs={12} md={12} key="remark" padding={0}>
                <h4>Remarks</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row.remarks}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                key="file"
                padding={0}
                marginBottom={7}
                display="flex"
                justifyContent="center"
                alignContent="center"
                gap="3rem"
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    const url = getURL(row?.filename_student ?? "");
                    window.open(url, "_blank");
                  }}
                  sx={{ height: 60, width: "100%" }}
                >
                  <CloudDownloadIcon sx={{ marginRight: "10px" }} />
                  <span>View Student Uploaded PVF</span>
                </Button>
                {/* <Button
                  disabled={row?.filename_mentor === ""}
                  variant="contained"
                  onClick={() => {
                    const url = getURL(row?.filename_mentor ?? "");
                    window.open(url, "_blank");
                  }}
                  sx={{ height: 60, width: "100%" }}
                >
                  <CloudDownloadIcon sx={{ marginRight: "10px" }} />
                  <span>View Mentor Uploaded PVF</span>
                </Button> */}
              </Grid>
              {/* removed for now  */}
              {/* <Grid item xs={12} md={12} key="status" padding={0}>
                <h4>Status</h4>
                <TextField
                  multiline
                  fullWidth
                  value={status}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid> */}
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
  return content;
}

View.layout = "studentPhaseDashboard";
export default View;
