import {
  Box,
  Button,
  Card,
  // CircularProgress,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { green } from "@mui/material/colors";
// import CheckIcon from "@mui/icons-material/Check";
// import SaveIcon from "@mui/icons-material/Save";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import styled from "@emotion/styled";

import Meta from "@components/Meta";
import { PvfsParams } from "@callbacks/student/rc/pvf";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
// import { errorNotification } from "@callbacks/notifcation";
import { CDN_URL } from "@callbacks/constants";
import pvfVerificationRequest from "@callbacks/Verification/[rcid]/verify";

import Custom404 from "./404";

//  removed for now
// const Input = styled("input")({
//   display: "none",
// });
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
  // removed for now
  // const [loading, setLoading] = useState(true);
  // const [pvfName, setPvfName] = useState<string>("");
  // const [success, setSuccess] = useState(false);

  const [openApprove, setOpenApprove] = useState(false);
  const [openDeny, setOpenDeny] = useState(false);
  const router = useRouter();
  const { rcid, token } = router.query;
  const rid = (rcid || "").toString();
  const urlToken = (token || "").toString();
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const [isVerified, setIsVerifed] = useState<boolean>();
  const [remark, setRemark] = useState("");
  const [row, setRow] = useState<PvfsParams>();
  // const transformName = (name: string) => {
  //   const nname = name.replace(`${CDN_URL}/view/`, "");
  //   const nameArray = nname.split(".");
  //   const newName = nameArray[0].slice(14, -33);
  //   const newNameWithExtension = `${newName}.${nameArray[1]}`;
  //   return newNameWithExtension;
  // };

  useEffect(() => {
    const getProforma = async () => {
      if (urlToken !== "") {
        // console.log(urlToken);
        // console.log(rid);
        const res = await pvfVerificationRequest.get(urlToken);
        setRow(res);
        if (res.is_verified) {
          setIsVerifed(res.is_verified.Valid);
          // setPvfName(transformName(res.filename_student));
        }
        // setLoading(false);
      }
    };
    getProforma();
  }, [urlToken, rid]);

  const acceptPvf = () => {
    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());
    if (fileSaved != null) {
      pvfVerificationRequest.post(urlToken, rid, formData, {
        remarks: remark,
        is_verified: { Valid: true, Bool: true },
      } as PvfsParams);
    } else {
      pvfVerificationRequest.put(urlToken, {
        remarks: remark,
        is_verified: { Valid: true, Bool: true },
      } as PvfsParams);
    }

    setFileSaved(null);
    router.push("/login");
  };
  const rejectPvf = () => {
    pvfVerificationRequest.put(urlToken, {
      remarks: remark,
      is_verified: { Valid: true, Bool: false },
    } as PvfsParams);
    setFileSaved(null);
    router.push("/login");
  };
  //  removed for now
  // const buttonSx = {
  //   ...(success && {
  //     bgcolor: green[500],
  //     "&:hover": {
  //       bgcolor: green[700],
  //     },
  //   }),
  //   height: 60,
  //   width: "100%",
  // };

  //  removed for now
  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSuccess(false);
  //     setLoading(true);
  //   }
  // };
  // removed for now
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { files } = event.target;

  //   // if (
  //   //   allPvf.filter(
  //   //     (pvf) => !(pvf.verified.Valid && !pvf.verified.Bool)
  //   //   ).length >= 5
  //   // ) {
  //   //   errorNotification("You can only upload 5 pvf", "Cannot upload");
  //   //   setLoading(false);
  //   //   return;
  //   // }

  //   if (!(files && files.length > 0)) {
  //     setLoading(false);
  //     return;
  //   }

  //   const file = files[0];

  //   if (file.size > 1280000) {
  //     errorNotification("File size too large", "Max file size is about 1MB");
  //     setLoading(false);
  //     return;
  //   }

  //   if (file.name !== pvfName) {
  //     errorNotification(
  //       "File must follow the name constraint",
  //       `Expected File name: ${pvfName}`
  //     );
  //     setLoading(false);
  //     return;
  //   }

  //   setFileSaved(file);
  //   setSuccess(true);
  //   setLoading(false);
  // };

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
                  <h4>Write your Remarks</h4>
                  <TextField
                    multiline
                    fullWidth
                    minRows={4}
                    value={remark}
                    onChange={(e) => {
                      setRemark(e.target.value);
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
                  md={12}
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
                      const url = getURL(row?.filename_student ?? "");
                      window.open(url, "_blank");
                    }}
                    sx={{ height: 60, width: "100%" }}
                  >
                    <CloudDownloadIcon sx={{ marginRight: "10px" }} />
                    <span>View Student Uploaded PVF</span>
                  </Button>
                </Grid>
                {/* <Grid item xs={12} md={6} key="upload" padding={0}>
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
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Button>
                  </label>
                </Grid> */}
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
                      setOpenApprove(true);
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
                      setOpenDeny(true);
                    }}
                  >
                    Deny
                  </InactiveButton>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Modal open={openApprove} onClose={() => setOpenApprove(false)}>
            <Box sx={boxStyle}>
              <Box sx={{ textAlign: "center" }}>
                <h2>Confirmation!</h2>
                <Typography sx={{ textAlign: "center" }}>
                  You won't be able to access it again or change it after
                  confirmation
                </Typography>
              </Box>
              <Stack spacing={2}>
                <FormControl sx={{ m: 1 }} />
                <Stack justifyContent="center" alignItems="center">
                  <ActiveButton
                    variant="contained"
                    sx={{ width: "30%" }}
                    onClick={() => {
                      acceptPvf();
                      setOpenApprove(false);
                    }}
                  >
                    Approve
                  </ActiveButton>
                </Stack>
              </Stack>
            </Box>
          </Modal>
          <Modal open={openDeny} onClose={() => setOpenDeny(false)}>
            <Box sx={boxStyle}>
              <Box sx={{ textAlign: "center" }}>
                <h2>Confirmation!</h2>
                <Typography sx={{ textAlign: "center" }}>
                  You won't be able to access it again or change it after
                  confirmation
                </Typography>
              </Box>
              <Stack spacing={2}>
                <FormControl sx={{ m: 0 }} />

                <Stack justifyContent="center" alignItems="center">
                  <InactiveButton
                    variant="contained"
                    sx={{ width: "30%" }}
                    onClick={() => {
                      rejectPvf();
                      setOpenDeny(false);
                    }}
                  >
                    Deny
                  </InactiveButton>
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
