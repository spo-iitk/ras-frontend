import { Button, Card, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MatrixExpanded from "@components/Utils/MatrixExpanded";
import StepperComp from "@components/Stepper/stepperComp";
import Meta from "@components/Meta";
import RichText from "@components/Editor/RichText";
import { AdminProformaType } from "@callbacks/admin/rc/adminproforma";
import pvfRequest, { PvfsParams, PvfsType } from "@callbacks/student/rc/pvf";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import useStore from "@store/store";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

function Verify() {
  const [loading, setLoading] = useState(true);
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [row, setRow] = useState<PvfsParams>();
  const pid = "1";
  // const [row, setRow] = useState<PvfsParams>({
  //   ID: 0,
  // } as PvfsParams);
  //   const {
  //     register,
  //     // handleSubmit,
  //     formState: { errors },
  //   } = useForm<PvfsType>();
  useEffect(() => {
    const getProforma = async () => {
      const res = await pvfRequest.get(token, rid, pid);
      setRow(res);
      setLoading(false);
    };
    console.log("called");
    if (router.isReady) {
      console.log("Fetching Pvf");
      getProforma();
    }
  }, [router.isReady, rid, token, pid]);

  return (
    <div style={{ padding: "0 2rem", margin: "4rem 0" }}>
      <Meta title={` - Proforma Details`} />
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
                  value={row?.company_university_name}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="address" padding={0}>
                <h4>Student Role</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row?.role}
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
                  value={row?.duration}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={6} key="social" padding={0}>
                <h4>Mnetor Name</h4>
                <TextField
                  multiline
                  fullWidth
                  value={row?.mentor_name}
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
                  value={row?.mentor_email}
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
                  value={row?.mentor_designation}
                  InputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                  sx={textFieldSX}
                />
              </Grid>
              <Grid item xs={12} md={12} key="type" padding={0}>
                <h4>Description</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  value={row?.description}
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
                key="type"
                padding={0}
                display="flex"
                gap="3rem"
              >
                <ActiveButton
                  variant="contained"
                  sx={{ width: "50%" }}
                  color="success"
                  // onClick={handleSubmit(onSubmit)}
                >
                  Accept
                </ActiveButton>
                <InactiveButton
                  variant="contained"
                  sx={{ width: "50%" }}
                  // onClick={handleSubmit(onSubmit)}
                >
                  Reject
                </InactiveButton>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

export default Verify;
