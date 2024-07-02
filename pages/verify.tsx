import {
  Button,
  Card,
  CircularProgress,
  Fab,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import styled from "@emotion/styled";

import Meta from "@components/Meta";
import pvfRequest, { PvfsParams, PvfsType } from "@callbacks/student/rc/pvf";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import useStore from "@store/store";
import pvfVerificationRequest from "@callbacks/Verification/verify";
import { errorNotification } from "@callbacks/notifcation";

const Input = styled("input")({
  display: "none",
});

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
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  // const { rcid } = router.query;
  // let rid = rcid as string;
  let rid = "1";
  const [row, setRow] = useState<PvfsParams>();
  const pid = "1";
  const verify = async () => {
    await pvfVerificationRequest.verify(token, "1", pid, true);
  };
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  // const [row, setRow] = useState<PvfsParams>({
  //   ID: 0,
  // } as PvfsParams);
  //   const {
  //     register,
  //     // handleSubmit,
  //     formState: { errors },
  //   } = useForm<PvfsType>();
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };
  const handleChange = (event: { target: { files: any } }) => {
    const { files } = event.target;

    // if (
    //   allPvf.filter(
    //     (pvf) => !(pvf.verified.Valid && !pvf.verified.Bool)
    //   ).length >= 5
    // ) {
    //   errorNotification("You can only upload 5 pvf", "Cannot upload");
    //   setLoading(false);
    //   return;
    // }

    if (!(files && files.length > 0)) {
      setLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > 256000) {
      errorNotification("File size too large", "Max file size is about 200KB");
      setLoading(false);
      return;
    }

    // if (file.name !== resumeName) {
    //   errorNotification(
    //     "File must follow the name constraint",
    //     `Expected File name: ${resumeName}`
    //   );
    //   setLoading(false);
    //   return;
    // }

    setFileSaved(file);
    setSuccess(true);
    setLoading(false);
  };
  useEffect(() => {
    const getProforma = async () => {
      const res = await pvfVerificationRequest.get(token, rid, pid);
      setRow(res);
      setLoading(false);
    };
    // if (router.isReady) {
    getProforma();
    // }
  }, [rid, token, pid]);

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
              <label htmlFor="icon-button-file">
                <Input
                  accept="application/pdf"
                  id="icon-button-file"
                  type="file"
                  onChange={handleChange}
                  // required
                />
                <Fab
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={buttonSx}
                  onClick={handleButtonClick}
                >
                  {success ? <CheckIcon /> : <SaveIcon />}
                  {loading && (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        // top: -6,
                        // left: -6,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Fab>
              </label>
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
                  onClick={() => {
                    verify();
                    // router.push("/application/rc/");
                  }}
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
