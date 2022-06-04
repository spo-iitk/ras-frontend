import React from 'react'
import Meta from '../../../../../../components/Meta';
import ActiveButton from '../../../../../../components/Buttons/ActiveButton';
import styles from '../../../../../..//styles/adminPhase.module.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import index from 'pages/admin/rc';
import { IconButton, TableHead } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

const info = [
  {
    field: 'Name',
    value: 'XYZ'
  },
  {
    field: 'Email',
    value: 'XYZ@company.com'
  },
  {
    field: 'Phone number',
    value: '+91 6969696969'
  },
  {
    field: 'Username',
    value: 'XYZ@12'
  }
]

const columns: GridColDef[] = [
  {
    field: 'designation',
    headerName: 'Designation',
    width: 200,
  },
 {
   field: 'activeApplicants',
   headerName: 'Active applicants',
   width: 200,
 },
 {
   field: 'totalApplicants',
   headerName: 'Total applicants',
   width: 200,
 },
 {
   field: 'status',
   headerName: 'Status',
   width: 200,
 },
 {
   field: 'deadline',
   headerName: 'Deadline',
   width: 200,
 },
];

const rows = [
  {id:1, designation:'Role 1',activeApplicants: '102',totalApplicants: '105',status: 'Accepted',deadline: 'May 26,2019'},
 ];
function Index() {
  return (
    <div style={{textAlign:'center', padding:'1rem'}}>
      <Meta title='Company Dashboard'></Meta>
      <h1>COMPANY NAME</h1>
      <div style={ButtonContainer}>
        <ActiveButton>VIEW COMPANY HISTORY</ActiveButton>
        <ActiveButton>CONTACT DETAILS</ActiveButton>
        <ActiveButton>PAST HIRES</ActiveButton>
        <ActiveButton>ADD PPO/PIIO</ActiveButton>
      </div>
      <br/>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableHead sx={{p:2,fontWeight:600,fontSize:25}}>
              <p>Active Contact HR Details</p>
            </TableHead>
            {
              info.map((item)=>(
                <TableRow>
                  <TableCell>
                    {item.field}
                  </TableCell>
                  <TableCell>
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Grid container spacing={2} component={Paper}>
        <Grid item xs={11}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>Internship Roles</h2>
        <IconButton><AddIcon /></IconButton>
        </div>  
        </Grid>
        <Grid item xs={11} style={{ height: 500, margin: '20px auto' }} className={styles.datagridBranch}>
          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
          />
        </Grid>
      </Grid>
    </div>
  )
}

Index.layout = 'studentDashboard'
export default Index

const ButtonContainer = {
  display: 'flex',
  justifyContent: 'space-around'
}