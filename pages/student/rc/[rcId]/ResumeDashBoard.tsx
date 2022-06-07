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

function createData(id, name, rollno, resume, clarification, status, icon) {
  return { id, name, rollno, resume, clarification, status, icon };
}

const rows = [
  createData(1687524, 'Name 1', '190875', 'Resume 1', <Button size="small" variant="contained" color='success' sx={{borderRadius:'35px'}}>CLICK HERE</Button>, <Button size="small" variant="contained" color='success' sx={{borderRadius:'35px'}}>ACCEPTED</Button>, <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon>),
  createData(1687525, 'Name 2', '087512', 'Resume 2', <Button size="small" variant="contained" color='success' sx={{borderRadius:'35px'}}>CLICK HERE</Button>, <Button size="small" variant="contained" color='error' sx={{borderRadius:'35px'}}>REJECTED</Button>, <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon>),
  
];
const ResumeDashboard = () => {
  
  return (
    <div style={{ padding: "0 2rem" }}><Meta title="Student Dashboard - Events" />
    <Box component={Grid} boxShadow={10} sx={{
      backgroundColor:'white',
    }}>
      <div style={{display:'flex',marginTop:'5%',
        padding:'2%',justifyContent:'space-between'}}><Typography variant='h5' fontWeight='bold'>Resume</Typography>
      <MoreVertIcon sx={{cursor:'pointer'}}></MoreVertIcon></div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Resume ID</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Student Name</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Roll no.</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>View Resume</TableCell>
            <TableCell align="right" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Ask Clarification</TableCell>
            <TableCell align="center" sx={{
              opacity:'50%',
              fontSize:'15px',
              fontWeight:'bold'
            }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{
                fontWeight:'bold',

              }}>
                {row.id}
              </TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.name}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.rollno}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold',
                textAlign:'center'
              }}>{row.resume}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold'
              }}>{row.clarification}</TableCell>
              <TableCell align="right" sx={{
                fontWeight:'bold'
              }}>{row.status}</TableCell>
              <TableCell>{row.icon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box></div>
  )
}

ResumeDashboard.layout = 'studentDashboard'
export default ResumeDashboard

