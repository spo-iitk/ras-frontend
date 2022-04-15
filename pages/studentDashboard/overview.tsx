import { Button, Stack, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Meta from '../../components/Meta'
import styles from '../..//styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard" />
      <Stack>
        <div style={{ height: 50 }} />
        <h1>Dashboard</h1>
        <h2>Hi, Welcome Back!</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize:'1.2em', fontWeight:600}}>Recruitment Drive Name</TableCell>
                <TableCell sx={{ fontSize:'1.2em', fontWeight:600}} >Type of Recruitment</TableCell>
                <TableCell sx={{ fontSize:'1.2em', fontWeight:600}} >Start Date</TableCell>
                <TableCell sx={{ fontSize:'1.2em', fontWeight:600}} >Status</TableCell>
                <TableCell sx={{ fontSize:'1.2em', fontWeight:600}} >Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize:"1.001em"}}>
                  Internship 2022-23 Phase-I
                  <Typography variant='subtitle2' sx={{ fontSize:"0.8em"}}>Updated 1 min ago</Typography>
                </TableCell>
                <TableCell sx={{ fontSize:"1.001em"}}>Intern</TableCell>
                <TableCell sx={{ fontSize:"1.001em"}}>May 26, 2022</TableCell>
                <TableCell sx={{ fontSize:"1.001em"}}><Button variant="contained" sx={{ borderRadius: 10 }}>Inactive</Button></TableCell>
                <TableCell sx={{ fontSize:"1.001em"}}><Button variant="contained" sx={{ borderRadius: 10 }}>Phase-I ended</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  )
}

Overview.layout='dashboard'
export default Overview
