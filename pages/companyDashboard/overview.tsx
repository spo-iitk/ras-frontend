import { Stack, Typography } from '@mui/material'
import Meta from '../../components/Meta'
import styles from '../..//styles/Home.module.css'
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const ActiveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  borderRadius: 20,
  padding: '0.5rem 1rem',
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[500],
  },
}));

const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: '#ebebeb' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }}>Recruitment Drive Name</TableCell>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }} >Type of Recruitment</TableCell>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }} >View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: "1.001em" }}>
                  Internship 2022-23 Phase-I
                  <Typography variant='subtitle2' sx={{ fontSize: "0.8em" }}>Updated 1 min ago</Typography>
                </TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>Intern</TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>
                  <Link href="internSeason/openings" passHref={true}>
                    <ActiveButton>
                      <Stack direction='row' alignContent='center' spacing={1}><div>View</div><ArrowForwardIcon />
                      </Stack>
                    </ActiveButton>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  )
}

Overview.layout = 'companyDashboard'
export default Overview
