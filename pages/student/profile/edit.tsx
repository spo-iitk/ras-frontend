import { FormControl, Stack } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';
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

const InactiveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  borderRadius: 20,
  padding: '0.5rem 1rem',
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));


const SaveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  borderRadius: 20,
  padding: '0.5rem 1rem',
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[600],
  },
}));

const info = [
  {
    field: 'Name',
    value: 'Manas Gupta',
    disabled: true,
  },
  {
    field: 'Roll No.',
    value: '200554',
    disabled: true,
  },
  {
    field: 'Name',
    value: 'Manas Gupta',
    disabled: true,
  },
  {
    field: 'Roll No.',
    value: '200554',
    disabled: false,
  }
]

const ProfileEdit = () => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Student Dashboard - Edit Profile" />
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: 'row' }} alignItems={{ xs: "flex-start", md: 'center' }} justifyContent={'space-between'} spacing={2}>
          <h1>Edit Profile</h1>
          <Stack direction={"row"} alignItems={"center"} justifyContent="center" spacing={2}>
            <Link href="/student/profile" passHref={true}><SaveButton sx={{ width: 100 }}>Save</SaveButton></Link>
            <InactiveButton sx={{ width: 150 }}>Not Verified</InactiveButton>
          </Stack>
        </Stack>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 700 }}>
            <Table sx={{ minWidth: 300, maxWidth: 700, backgroundColor: '#ebebeb' }} aria-label="simple table">
              <TableBody>
                {info.map((item, index) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={index}
                  >
                    <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>
                      {item.field}
                    </TableCell>
                    <TableCell align='left' sx={{ fontSize: "1.01em", padding: 0 }}>
                      <TextField
                        id={item.field}
                        variant="outlined"
                        value={item.value}
                        disabled={item.disabled}
                        size="small"
                        sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding:0 }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </div>
  )
}

ProfileEdit.layout = 'studentDashboard'
export default ProfileEdit