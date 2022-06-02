import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid,Stack } from '@mui/material'
import styles from '/styles/internPhase.module.css'
import Meta from '@components/Meta';
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