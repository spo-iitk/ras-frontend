import {Stack } from '@mui/material'
import Meta from '@components/Meta'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { green } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';
import { TextField } from '@mui/material';
import StepperComp from '@components/Stepper/stepperComp';

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
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Software Intern - Proforma" />
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: 'row' }} alignItems={{ xs: "flex-start", md: 'center' }} justifyContent={'space-between'} spacing={2}>
          <h1>Proforma</h1>
        </Stack>
        <Stack spacing={2} justifyContent="center" alignItems="center" sx={{paddingBottom: 10}}>
          <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 700 }}>
            <Table sx={{ minWidth: 300, maxWidth: 700, backgroundColor: '#ebebeb' }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Company Name</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={"Quadeye"}
                      size="small"
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Role</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"SDE Intern"}
                      size="small"
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Tentative Job Location</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"USA"}
                      size="small"
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Job Description</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"Description"}
                      size="small"
                      multiline
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Cost To Company</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"Description"}
                      size="small"
                      multiline
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Package Details</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"Decription"}
                      size="small"
                      multiline
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Bond Details</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"Decription"}
                      size="small"
                      multiline
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Medical Requirements</TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                      value={"Decription"}
                      size="small"
                      sx={{ m: 1, width: { xs: '18ch', sm: '27ch', lg: '35ch' }, padding: 0 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: "1.01em", fontWeight: '600', paddingLeft: '7vw' }}>Hiring Process</TableCell>
                  <TableCell>
                  <StepperComp/>
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

Overview.layout = 'companyPhaseDashboard'
export default Overview
