import { Typography, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import Meta from '../../../components/Meta'
import { Box, Container, spacing } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { positions } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function createData(CompanyName, EventName, StartTime, EndTime, Venue, StudentWiseDetails, icon) {
  return { CompanyName, EventName, StartTime, EndTime, Venue, StudentWiseDetails, icon };
}

const rows = [
  createData('Company 1', 'PPT', <div >11:00 AM<br/>12/03/2022</div>, <div >11:00 AM<br/>12/03/2022</div>, 'L-20', <Button size="small" variant="contained" color='success' sx={{borderRadius:'35px'}}>CLICK HERE</Button>, <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon>),
  createData('Company 1', 'Test', <div >11:00 AM<br/>12/03/2022</div>, <div >11:00 AM<br/>12/03/2022</div>, 'NCL', <Button size="small" variant="contained" color='error' sx={{borderRadius:'35px'}}>ATTENDANCE IS DISABLED</Button>, <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon>),
  
];
const ManageAttendance = () => {
  
  return (
    <div style={{ padding: "0 2rem" }}><Meta title="Student Dashboard - Events" />
    <Box component={Grid} boxShadow={10} sx={{
      backgroundColor:'white',
    }}>
      <div style={{display:'flex',marginTop:'5%',
        padding:'2%',justifyContent:'space-between'}}><Typography variant='h5' fontWeight='bold'>Manage Attendance</Typography>
      <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon></div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Company Nmae</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Event Name</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Start  Time</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>End Time</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Venue</TableCell>
            <TableCell align="center" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>View Student's wise details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{
                fontWeight:'bold',

              }}>
                {row.CompanyName}
              </TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.EventName}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.StartTime}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.EndTime}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold'
              }}>{row.Venue}</TableCell>
              <TableCell align="center" sx={{
                fontWeight:'bold'
              }}>{row.StudentWiseDetails}</TableCell>
              <TableCell>{row.icon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box></div>
  )
}

ManageAttendance.layout = 'studentDashboard'
export default ManageAttendance

