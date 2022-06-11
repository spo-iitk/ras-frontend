import React, { useState } from "react";
import { Stack, Grid, IconButton, Popover, Button } from "@mui/material";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActiveButton from "@components/Buttons/ActiveButton";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import InactiveButton from "@components/Buttons/InactiveButton";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

function CompanyAll() {
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "studentname",
      headerName: "Student Name",
      width: 200,
    },
    {
      field: "rollno",
      headerName: "Roll No",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "program",
      headerName: "Program",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value === "Active" ? (
          <ActiveButton sx={{ height: 30, width: "50%" }}>Active</ActiveButton>
        ) : (
          <InactiveButton sx={{ height: 30, width: "50%" }}>
            Inactive
          </InactiveButton>
        ),
    },
    {
      field: "popbutton",
      headerName: "",
      width: 50,
      align: "center",
      renderCell: (params) => (
        <IconButton id={params.value} onClick={handleClick2}>
          <MoreVertOutlinedIcon
            sx={{
              width: "max-content",
              color: "#9FA2B4",
              fontSize: "20px",
            }}
          />
        </IconButton>
      ),
    },
  ];
  const buttonstyle = {
    borderRadius: 0,
    color: "black",
    background: "white",
    "&:hover": { backgroundColor: "#cfd4d1" },
  };
  const rows = [
    {
      id: "1",
      studentname: "Student 1",
      rollno: "180002",
      program: "BTech",
      department: "MTH",
      status: "Active",
      popbutton: "1",
    },
    {
      id: "2",
      studentname: "Student 2",
      rollno: "180003",
      program: "BTech",
      department: "CSE",
      status: "Inactive",
      popbutton: "2",
    },
  ];

  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - CompanyStudent" />
      <Stack>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={6}>
            <h1>Company</h1>
          </Grid>
          <Grid item xs={12} md={6} style={gridMain}>
            <div>
              <IconButton onClick={handleClick1}>
                <MoreVertOutlinedIcon
                  sx={{
                    width: "max-content",
                    color: "#9FA2B4",
                    fontSize: "40px",
                  }}
                />
              </IconButton>
              <Popover
                open={open1}
                anchorEl={anchorEl1}
                onClose={handleClose1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Stack direction="column">
                  <Button sx={buttonstyle}>Enroll Students</Button>
                  <Button sx={buttonstyle}>Excel</Button>
                  <Button sx={buttonstyle}>Excel (All)</Button>
                  <Button sx={buttonstyle}>Excel (Active)</Button>
                  <Button sx={buttonstyle}>Freeze (Group)</Button>
                  <Button sx={buttonstyle}>Unfreeze (Group)</Button>
                </Stack>
              </Popover>
              <Popover
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Stack direction="column">
                  <Button sx={buttonstyle}>View Profile</Button>
                  <Button sx={buttonstyle}>See History</Button>
                  <Button sx={buttonstyle}>Freeze/Unfreeze</Button>
                </Stack>
              </Popover>
            </div>
          </Grid>
        </Grid>
        <div style={{ height: 500, margin: "auto", width: "1240px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

CompanyAll.layout = "adminPhaseDashBoard";
export default CompanyAll;
