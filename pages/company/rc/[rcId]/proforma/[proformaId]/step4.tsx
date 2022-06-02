import React from 'react'
import {Stack } from '@mui/material'
import Meta from '@components/Meta'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import ActiveButton from '@components/Buttons/ActiveButton';
import InactiveButton from '@components/Buttons/InactiveButton';

function Step4() {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Step 4/5 - New Opening" />
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: 'row' }} alignItems={{ xs: "flex-start", md: 'center' }} justifyContent={'space-between'} spacing={2}>
          <h1>Proforma</h1>
        </Stack>
        <Stack spacing={2} justifyContent="center" alignItems="center" sx={{paddingBottom: 10}}>
          <h2>Step 4/5 Basic Details</h2>
          <TableContainer component={Paper} sx={{ minWidth: 330, maxWidth: 700 }}>
            <Table sx={{ minWidth: 300, maxWidth: 700, backgroundColor: '#ebebeb' }} aria-label="simple table">
              <TableBody> 
                <TableRow>
                  <TableCell align='center'>
                    <ActiveButton sx={{width: 100}}>Next</ActiveButton>
                  </TableCell>
                  <TableCell align='center'>
                    <InactiveButton sx={{width: 100}}>Reset</InactiveButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </div>
  )
}

Step4.layout = 'companyPhaseDashboard'
export default Step4
