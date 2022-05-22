import { IconButton, Stack, Typography } from '@mui/material'
import Meta from '../../../components/Meta'
import styles from '../../..//styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import ActiveButton from '../../../components/Buttons/ActiveButton';

const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard - Openings" />
      <Stack>
        <h1>Openings</h1>
        <h2>Intern Season</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: '#ebebeb' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }}>Role Name</TableCell>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }} >Status</TableCell>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }} >View proforma</TableCell>
                <TableCell sx={{ fontSize: '1.2em', fontWeight: 600 }} width={180} align="center">Delete Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: "1.001em" }}>
                  Software Development Intern
                </TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>Intern</TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>
                  <Link href="proforma" passHref={true}>
                    <ActiveButton>
                      <div>View</div>
                    </ActiveButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: "1.001em" }}>
                  Quant Intern
                </TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>Intern</TableCell>
                <TableCell sx={{ fontSize: "1.001em" }}>
                  <Link href="proforma" passHref={true}>
                    <ActiveButton>
                      <div>View</div>
                    </ActiveButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
