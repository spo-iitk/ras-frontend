import { IconButton, Stack, Typography } from '@mui/material'
import Meta from '../../../../components/Meta'
import styles from '../../../..//styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { red, green } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

const ActiveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  borderRadius: 20,
  padding: '0.5rem 1rem',
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[500],
  },
  width: 100,
}));

const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Software engineering Intern</h1>
        <h2>Proforma</h2>
        <TableContainer>
          <Table sx={{ width: 800, backgroundColor: '#ebebeb' }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: "1.001em" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>Intern</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: "1.001em" }}>
                  Job Description
                </TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>Intern</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  )
}

Overview.layout = 'companyPhaseDashboard'
export default Overview
