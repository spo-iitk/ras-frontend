import React from 'react'
import Meta from '../../../components/Meta'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import styles from '/styles/internPhase.module.css'
import ActiveButton from '../../../components/Buttons/ActiveButton';
import Resume from '../../admin/rc/[rcid]/resume';
//import Grid from "@mui/grid"
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Company Name',
    align: 'center',
    headerAlign: 'center',
    width: 270
  },
  {
    field: 'role',
    headerName: 'Role',
    align: 'center',
    headerAlign: 'center',
    width: 270
  },
  {
    field: 'deadline',
    headerName: 'Application Deadline',
    align: 'center',
    headerAlign: 'center',
    width: 270
  },
  {
    field: 'resume',
    headerName: 'Applied Resume',
    align: 'center',
    headerAlign: 'center',
    width: 270,
  },
];
const rows = [
  { id: "Google", role: 'Software Dev', deadline: '12:00AM 31 May 2022', resume: "ID:2 Page Software Dev " },
  { id: "Microsoft", role: 'Software Dev', deadline: '12:00AM 31 May 2022', resume: "ID:1 Page Software Dev" }
];
const applicationParams = {
  "applications": rows.length,
}
function Applications() {
  return (
    <>
      <div className={styles.container}>
        <Meta title="Applications - Intern Season" />
        <Stack>
          <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridApplication}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <h1>Your Applications</h1>
              </Grid>
              <Grid item xs={6} style={gridMain}>
                <div style={gridDiv}>
                  <p style={pStyle}>Total Applications : {applicationParams.applications}</p>
                </div>
              </Grid>
            </Grid>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
            />
          </div>
        </Stack>
      </div>
    </>
  )
}
Applications.layout = "studentPhaseDashboard"
export default Applications


const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
}

const divStyle = {
  margin: "15px 0 auto 0",
  padding: "0",
  width: "auto",
}

const boxbuttonStyle = {
  width: "100%",
  height: "40px",
  border: "inherit solid 2px",
  borderRadius: "10px",

}


const gridMain = {
  width: "100%",
  padding: "0",
  margin: "0",
  alignContent: "right",
  alignItems: "right",
};
const gridDiv = {
  alignContent: "right",
  alignItems: "right",
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
};

const pStyle = {
  transform: "translate(65%, 60%)",
  margin: "30px 0 0 0",
  padding: "0",
  right: "0%",
  width: "100%",
  fontSize: "1.10em"
};
const buttonStyle = {
  padding: "5px 0",
  FontSize: "15px",
  margin: "0"
};