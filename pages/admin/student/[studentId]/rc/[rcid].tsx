import { Box, Button, Grid, Modal, Stack, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import styles from "@styles/internPhase.module.css";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";

// const sideTextStyle = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   alignItems: "flex-end",
//   fontSize: "small",
//   width: "100%",
// };

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
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
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
  },
  {
    field: "rollNo",
    headerName: "Roll Number",
    width: 150,
  },
  {
    field: "program",
    headerName: "Program",
    width: 150,
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
    width: 150,
    renderCell: (params) => (
      <ActiveButton
        sx={{ width: "100%" }}
        onClick={() => {
          window.location.href = params.value;
        }}
      >
        View
      </ActiveButton>
    ),
  },
];
const rows = [
  {
    id: 1,
    rollNo: 211105,
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
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openFreeze, setOpenFreeze] = React.useState(false);
  const handleOpenFreeze = () => {
    setOpenFreeze(true);
    handleClose();
  };
  const handleCloseFreeze = () => setOpenFreeze(false);
  const [openUnfreeze, setOpenUnfreeze] = React.useState(false);
  const handleOpenUnfreeze = () => {
    setOpenUnfreeze(true);
    handleClose();
  };
  const handleCloseUnfreeze = () => setOpenUnfreeze(false);
  return (
    <>
      <div className={styles.container}>
        <Meta title="Master Database (Student) - Admin" />
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8} md={6}>
            <h1>Master Database (Students)</h1>
          </Grid>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  ml: -2,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleOpenFreeze}>Freeze</MenuItem>
              <MenuItem onClick={handleOpenUnfreeze}>Unfreeze</MenuItem>
            </Menu>
          </div>
        </Stack>
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
          <Stack>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year", "month"]}
                label="Year and Month"
                minDate={new Date("2012-03-01")}
                maxDate={new Date("2023-06-01")}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
            <div style={divStyle}>
              <Button
                style={boxbuttonStyle}
                variant="contained"
                onClick={submitFreeze}
              >
                Submit Data
              </Button>
            </div>
          </Stack>
        </Box>
      </Modal>
      <Modal open={openUnfreeze} onClose={handleCloseUnfreeze}>
        <Box sx={boxStyle}>
          <Stack>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year", "month"]}
                label="Year and Month"
                minDate={new Date("2012-03-01")}
                maxDate={new Date("2023-06-01")}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
            <div style={divStyle}>
              <Button
                style={boxbuttonStyle}
                variant="contained"
                onClick={submitUnfreeze}
              >
                Submit Data
              </Button>
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
RcStudent.layout = "adminDashBoard";
export default RcStudent;
