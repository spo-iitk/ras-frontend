import React from 'react'
import Meta from '../../../components/Meta'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, Grid } from '@mui/material';
import styles from "../../../styles/studentInternPhase.module.css";
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 100
  },
  {
    field: 'Name',
    headerName: 'Name',
    width: 200
  },
  {
    field: 'Roll_no',
    headerName: 'Roll No.',
    width: 200
  },
  {
    field: 'Company_Name',
    headerName: 'Company Name',
    width: 200
  },
  {
    field: 'Designation',
    headerName: 'Designation',
    width: 200
  },
  {
    field: 'Program',
    headerName: 'Program',
    width: 200
  },
  {
    field: 'Branch',
    headerName: 'Branch',
    width: 100
  }
];
const rows = [
  {id : 1, Name : "Student 1", Roll_no: "78462", Company_Name: "Company 1", Designation: "Role 1", Program: "BTech", Branch: "ME" }
];

function Stats() {
  return (
    <div className={styles.container}>
        <Meta title="Statistics - Intern Season" />
        <Stack>
          <h1>Stats</h1>
          <div style={{ height: 500, margin: '0px auto'}} className={styles.datagridStats}>
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Stack>
    </div>

  )
}

Stats.layout="studentPhaseDashboard"
export default Stats