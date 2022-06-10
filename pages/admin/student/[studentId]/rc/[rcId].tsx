import React from "react";
import styles from "@styles/internPhase.module.css";
import Meta from "@components/Meta";
import { Box, Button, Grid, Modal, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";

const sideTextStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "flex-end",
  fontSize: "small",
  width: "100%",
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
  alignItems: "center",
};

const divStyle = {
  margin: "15px 0 auto 0",
  padding: "0",
  width: "100%",
};

const boxbuttonStyle = {
  width: "100%",
  height: "40px",
  border: "inherit solid 2px",
  borderRadius: "10px",
};
const boxTextField = {
  width: "100%",
};
const boxPStyle = {
  alignSelf: "center",
  marginLeft: "50%",
  transform: "translate(-10%,0)",
};
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
  },
  {
    field: "id",
    headerName: "Roll Number",
    width: 250,
  },
  {
    field: "program",
    headerName: "Program",
    width: 100,
  },
  {
    field: "dept",
    headerName: "Department",
    width: 150,
  },
  {
    field: "gradYear",
    headerName: "Graduation Year",
    width: 125,
  },
  {
    field: "details",
    headerName: "View Details",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <ActiveButton
        sx={{ width: "100%" }}
        onClick={() => {
          window.location.href = params.value;
        }}
      >
        Click Here
      </ActiveButton>
    ),
  },
];
const rows = [
  {
    id: 211105,
    name: "Tejas Ahuja",
    program: "BTECH",
    dept: "EE",
    gradYear: "2025",
    details: "/change link",
  },
];
function submitFreeze() {
  return 0;
}
function submitUnfreeze() {
  return 0;
}
function RcStudent() {
  const [openFreeze, setOpenFreeze] = React.useState(false);
  const handleOpenFreeze = () => setOpenFreeze(true);
  const handleCloseFreeze = () => setOpenFreeze(false);
  const [openUnfreeze, setOpenUnfreeze] = React.useState(false);
  const handleOpenUnfreeze = () => setOpenUnfreeze(true);
  const handleCloseUnfreeze = () => setOpenUnfreeze(false);
  return (
    <>
      <div className={styles.container}>
        <Meta title="ADMIN || Master Database (Student)" />
        <Grid
          container
          spacing={1}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Grid item xs={8} md={6}>
            <h1>Master Database (Students)</h1>
          </Grid>
          <div style={sideTextStyle}>
            <Grid
              item
              xs={8}
              md={6}
              style={{ width: "100%", margin: "0 0 0 47%", right: 0 }}
            >
              <ActiveButton sx={{ width: "100%" }} onClick={handleOpenUnfreeze}>
                UNFREEZE
              </ActiveButton>
            </Grid>
            <Grid
              item
              xs={8}
              md={6}
              style={{ width: "100%", margin: "0 47% 0 0", right: 0 }}
            >
              <InactiveButton sx={{ width: "100%" }} onClick={handleOpenFreeze}>
                FREEZE
              </InactiveButton>
            </Grid>
          </div>
        </Grid>
        <Stack>
          <div
            style={{ height: 500, margin: "10px auto" }}
            className={styles.datagridApplications}
          >
            <DataGrid rows={rows} columns={columns} pageSize={7} />
          </div>
        </Stack>
      </div>
      <Modal open={openFreeze} onClose={handleCloseFreeze}>
        <Box sx={boxStyle}>
          <h1 style={{ margin: "0 auto 25px auto", padding: "0 auto" }}>
            Freeze Profiles
          </h1>
          <TextField
            name="rollNumber"
            type="text"
            aria-hidden="true"
            title=""
            label="Enter Roll Number"
            style={boxTextField}
          />
          <p style={boxPStyle}>
            <b>OR</b>
          </p>
          <TextField
            name="emailID"
            type="email"
            aria-hidden="true"
            title=""
            label="Enter Email ID"
            style={boxTextField}
          />
          <p style={boxPStyle}>
            <b>OR</b>
          </p>
          <TextField
            style={boxTextField}
            name="gradYear"
            type="month"
            aria-hidden="true"
            label="Enter Graduation Year"
          />
          <div style={divStyle}>
            <Button
              style={boxbuttonStyle}
              variant="contained"
              onClick={submitFreeze}
            >
              Submit Data
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={openUnfreeze} onClose={handleCloseUnfreeze}>
        <Box sx={boxStyle}>
          <h1 style={{ margin: "0 auto 25px auto", padding: "0 auto" }}>
            Unfreeze Profiles
          </h1>
          <TextField
            name="rollNumber"
            type="text"
            aria-hidden="true"
            title=""
            label="Enter Roll Number"
            style={boxTextField}
          />
          <p style={boxPStyle}>
            <b>OR</b>
          </p>
          <TextField
            name="emailID"
            type="email"
            aria-hidden="true"
            title=""
            label="Enter Email ID"
            style={boxTextField}
          />
          <p style={boxPStyle}>
            <b>OR</b>
          </p>
          <TextField
            style={boxTextField}
            name="gradYear"
            type="month"
            aria-hidden="true"
            label="Enter Graduation Year"
          />
          <div style={divStyle}>
            <Button
              style={boxbuttonStyle}
              variant="contained"
              onClick={submitUnfreeze}
            >
              Submit Data
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
RcStudent.layout = "adminDashBoard";
export default RcStudent;
