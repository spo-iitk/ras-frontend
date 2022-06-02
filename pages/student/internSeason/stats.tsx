import React from 'react'
import Meta from '../../../components/Meta'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, Grid } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'Name',
    headerName: 'Name',
    align: 'center',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'Roll_no',
    headerName: 'Roll No.',
    align: 'center',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'Company_Name',
    headerName: 'Company Name',
    align: 'center',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'Designation',
    headerName: 'Designation',
    align: 'center',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'Program',
    headerName: 'Program',
    align: 'center',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'Branch',
    headerName: 'Branch',
    align: 'center',
    headerAlign: 'center',
    width: 200
  }
];
const rows = [
  {id : 1, Name : "Student 1", Roll_no: "78462", Company_Name: "Company 1", Designation: "Role 1", Program: "BTech", Branch: "ME" }
];

function Stats() {
  return (
    <div>
        <Meta title="Statistics - Intern Season" />
        <Stack>
          <div style={{ height: 500, margin: '0px 2rem'}} >
            <Grid container spacing={1}>
              <Grid item xs={12} style={gridMain}>
                <h1>Stats &gt; Student Wise</h1>
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

  )
}

Stats.layout="studentPhaseDashboard"
export default Stats

const gridMain = {
  width: "100%",
  padding: "0",
  margin: "0",
  alignContent: "right",
  alignItems:"right",
};
