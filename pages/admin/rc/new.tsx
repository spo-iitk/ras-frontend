import { FormControl, Stack } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';
import ActiveButton from '../../../components/Buttons/ActiveButton';
import { green, red } from '@mui/material/colors';
import { TextField } from '@mui/material';
import Meta from '../../../components/Meta';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

const info = [
  {
    field: 'Academic Year',
    value: 'Select Academic Year',
  },
  {
    field: 'Type of Recruitment',
    value: 'Select type of recruitment',
  },
  {
    field: 'Phase',
    value: 'Select Phase',
  }
]

const Policy = [
  {
    field: 'Max No. of Applications',
    value: '',
  }
]
const RecruitmentCycle = () => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Student Dashboard - Create New Recruitment Cycle" />
      <Stack spacing={2}>
        <div style={{textAlign:'center', fontSize:'1.5rem'}}>
        <h1>Create New Recruitment Cycle</h1>
        </div>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {info.map((item, index) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={index}
                  >
                    <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.5em", fontWeight: '600', paddingLeft: '7vw' }}>
                      {item.field}:
                    </TableCell>
                    <TableCell align='left' sx={{ fontSize: "1.5em", padding: 0 }}>
                      <TextField
                        id={item.field}
                        variant="outlined"
                        value={item.value}
                        size="small"
                        sx={{ m: 3, width: { xs: '30ch', sm: '27ch', lg: '35ch' }, padding:0 }} />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <p style={{ fontSize: "1.7em", fontWeight: '600', paddingLeft: '7vw' }}>Policies:</p>
                    {Policy.map((item,index)=>(
                      <ol>
                        <li style={{display:'flex'}}>
                          <p style={{ fontSize:'1.7em', paddingLeft:'7vw'}}>{item.field}</p>
                          <TextField
                          id="Max no. of Applications"
                          value={item.value}
                          variant="outlined"
                          size="small"
                          sx={{ m: 3, width: { xs: '30ch', sm: '27ch', lg: '35ch' }, padding:0 }} /> 
                        </li>
                      </ol>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <p style={{ fontSize:'1.7em',fontWeight: '600', paddingLeft:'7vw'}}>Additional Questions:</p>
                    <br />
                    <br/>
                    <div style={{alignItems:'center',marginLeft: '10vw'}}>  
                    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 700}}>
                      <Table sx={{'& td':{border:0}}}>
                        <TableBody>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              QUESTION TYPE
                            </TableCell>
                            <TableCell>
                              <TextField 
                              id="Question Type"
                              variant="outlined"
                              size="small"
                              sx={{ m: 3, width: { xs: '40ch', sm: '35ch', lg: '50ch' }, padding:0 }}
                              >
                              </TextField>
                            </TableCell>
                          </TableRow>  
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              QUESTION
                            </TableCell>
                            <TableCell>
                              <TextField
                              id="Question"
                              variant="outlined"
                              size="small"
                              sx={{ m: 3, width: { xs: '40ch', sm: '35ch', lg: '50ch' }, padding:0 }}
                              >
                              </TextField>
                            </TableCell>
                          </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              OPTION 1
                            </TableCell>
                            <TableCell>
                              <TextField
                              id="Opt1"
                              variant="outlined"
                              size="small"
                              sx={{ m: 3, width: { xs: '30ch', sm: '27ch', lg: '35ch' }, padding:0 }}
                              >
                              </TextField>
                            </TableCell>
                            </TableRow>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}></TableRow>
                            <TableCell>
                              OPTION 2
                            </TableCell>
                            <TableCell>
                              <TextField
                              id="Opt1"
                              variant="outlined"
                              size="small"
                              sx={{ m: 3, width: { xs: '30ch', sm: '27ch', lg: '35ch' }, padding:0 }}
                              >
                              </TextField>
                          </TableCell>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              OPTION 3
                            </TableCell>
                            <TableCell>
                              <TextField
                              id="Opt1"
                              variant="outlined"
                              size="small"
                              sx={{ m: 3, width: { xs: '30ch', sm: '27ch', lg: '35ch' }, padding:0 }}
                              >
                              </TextField>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <ActiveButton sx={{width:'max-content'}}>CREATE RECRUITMENT DRIVE</ActiveButton>
        </Stack>
      </Stack>
    </div>
  )
}

RecruitmentCycle.layout = 'studentDashboard'
export default RecruitmentCycle