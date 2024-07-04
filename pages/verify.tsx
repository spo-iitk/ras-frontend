import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import styled from "@emotion/styled";

import Meta from "@components/Meta";
import { PvfsParams } from "@callbacks/student/rc/pvf";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import { errorNotification } from "@callbacks/notifcation";
import { CDN_URL } from "@callbacks/constants";
import pvfVerificationRequest from "@callbacks/Verification/[rcid]/verify";

import Custom404 from "./404";

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
const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

function Verify() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const { token } = useStore();
  const router = useRouter();
  // const { rid } = router.query;
  // const { rcid } = router.query;
  // const rid = (rcid || "").toString();
  // const [urlToken] = Array.isArray(router.query.token)
  //   ? router.query.token
  //   : [router.query.token || ""];
  const urlToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrc2hhdDIzQGlpdGsuYWMuaW4iLCJwaWQiOjIzLCJyaWQiOjEsImV4cCI6MTcyMDczODI4OSwiaWF0IjoxNzIwMTMzNDg5LCJpc3MiOiJyYXMifQ._GbzOJnybANpnAXVscB0Be6jv4i-C0LVstP_fAKp-gM";
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerifed] = useState<boolean>();
  const [remarks, setRemarks] = useState("");
  const rid = typeof router.query.rid === "string" ? router.query.rid : "2";
  // let rid = "1";
  const [row, setRow] = useState<PvfsParams>();
  const pid = "1";

  useEffect(() => {
    const getProforma = async () => {
      if (urlToken != null) {
        // console.log(urlToken);
        // console.log(rid);
        const res = await pvfVerificationRequest.get(urlToken, rid);
        setRow(res);
        // setIsVerifed(false);
        if (res.is_verified) {
          setIsVerifed(res.is_verified.Valid);
        }
        setLoading(false);
      }
    };
    // if (router.isReady) {
    getProforma();
    // }
  }, [urlToken, pid, rid]);

  const acceptPvf = () => {
    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());
    if (fileSaved != null) {
      pvfVerificationRequest.post(urlToken, rid, formData, {
        remarks,
        is_approved: { Valid: true, Bool: true },
        is_verified: { Valid: true, Bool: true },
      } as PvfsParams);
    } else {
      pvfVerificationRequest.put(urlToken, rid, {
        remarks,
        is_approved: { Valid: true, Bool: true },
        is_verified: { Valid: true, Bool: true },
      } as PvfsParams);
    }

    setFileSaved(null);
    router.push("/login");
  };
  const rejectPvf = () => {
    pvfVerificationRequest.put(urlToken, rid, {
      remarks,
      is_approved: { Valid: true, Bool: false },
      is_verified: { Valid: true, Bool: false },
    } as PvfsParams);
    setFileSaved(null);
    router.push("/login");
  };
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    height: 60,
    width: "100%",
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

  let content;
  if (!isVerified) {
    content = (
      <div style={{ padding: "0 2rem", margin: "4rem 0" }}>
        <Meta title="Verification Page" />
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
                  <h4>Mentor Name</h4>
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
                  <h4>Remarks</h4>
                  <TextField
                    multiline
                    fullWidth
                    minRows={4}
                    // value={row?.remarks}
                    value={remarks}
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                    InputProps={{
                      style: { textAlign: "center" },
                      // readOnly: true,
                    }}
                    sx={textFieldSX}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ marginBottom: "40px", marginTop: "0px" }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  key="view"
                  padding={0}
                  marginBottom={7}
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      window.open(getURL(row!.filename), "_blank");
                    }}
                    sx={{ height: 60, width: "100%" }}
                  >
                    <CloudDownloadIcon sx={{ marginRight: "10px" }} />
                    <span>View Student Uploaded PVF</span>
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} key="upload" padding={0}>
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="application/pdf"
                      id="icon-button-file"
                      type="file"
                      onChange={handleChange}
                      // required
                    />
                    <Button
                      variant="contained"
                      // color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={buttonSx}
                      onClick={handleButtonClick}
                    >
                      {success ? (
                        <CheckIcon />
                      ) : (
                        <span style={{ alignItems: "center", display: "flex" }}>
                          <SaveIcon sx={{ marginRight: "10px" }} /> Upload
                          Signed PVF
                        </span>
                      )}
                      {loading && (
                        <CircularProgress
                          size={30}
                          sx={{
                            color: green[500],
                            position: "absolute",
                            // top: -6,
                            // left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Button>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  key="type"
                  padding={0}
                  display="flex"
                  justifyContent="center"
                  gap="2rem"
                >
                  <ActiveButton
                    onClick={() => {
                      // if (fileSaved != null) {
                      //   setOpen(true);
                      // } else {
                      //   errorNotification("Please Upload Signed File", "");
                      // }
                      setOpen(true);
                    }}
                    variant="contained"
                    sx={{ width: "50%" }}
                    color="success"
                  >
                    Approve
                  </ActiveButton>
                  <InactiveButton
                    variant="contained"
                    sx={{ width: "50%" }}
                    onClick={() => {
                      // setOpen(true);
                      rejectPvf();
                    }}
                    // onClick={handleSubmit(onSubmit)}
                  >
                    Deny
                  </InactiveButton>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={boxStyle}>
              <Box sx={{ textAlign: "center" }}>
                <h2>Confirmation !</h2>
              </Box>
              <Stack spacing={2}>
                <FormControl sx={{ m: 1 }} />
                <Stack justifyContent="center" alignItems="center">
                  <Button
                    variant="contained"
                    sx={{ width: "30%" }}
                    onClick={() => {
                      acceptPvf();
                      setOpen(false);
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Modal>
        </Card>
      </div>
    );
  } else {
    content = <Custom404 />;
  }
  return content;
}

export default Verify;
