import Meta from "@components/Meta";
import StepperComp from "@components/Stepper/stepperComp";
import { Card, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Branches, program } from "@components/Utils/matrixUtils";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const textFieldColor = "#ff0000";
const textFieldSX = {
  input: {
    "-webkit-text-fill-color": `${textFieldColor} !important`,
    color: `${textFieldColor} !important`,
    fontWeight: "bold",
  },
};

const info = [
  {
    label: "Company Name",
    value: "Paradime",
  },
  {
    label: "Nature of Business",
    value: "FrontEnd Engineer",
  },
  {
    label: "Tentative Job Location",
    value: "London",
  },
  {
    label: "Job Description",
    value: "Product Engineer in FrontEnd",
  },
  {
    label: "Cost to Company",
    value: "Not to be told",
  },
  {
    label: "Package Details",
    value: "Enough Money",
  },
  {
    label: "Bond Details",
    value: "Yes",
  },
  {
    label: "Medical Requirements",
    value: "None",
  },
];

const data = Array(138).fill(0);

function View() {
  return (
    <div style={{ padding: "0 2rem", marginBottom: 20 }}>
      <Meta title="Software Intern - Proforma" />
      <h1>Proforma</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "320px", sm: "800px", margin: "0px auto" },
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {info.map((item) => (
              <Grid
                item
                xs={12}
                md={item.label === "Eligibility" ? 12 : 6}
                key={item.label}
              >
                <h3>{item.label}</h3>
                <TextField
                  multiline
                  fullWidth
                  value={item.value}
                  variant="standard"
                  disabled
                  sx={textFieldSX}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <h3>Eligibility</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        Program
                      </TableCell>
                      {Branches.map((branch: string) => (
                        <TableCell key={branch} align="center">
                          {branch}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{ fontWeight: 600 }}
                          >
                            {program[i]}
                          </TableCell>
                          {Array(22)
                            .fill(0)
                            .map((__, j) => (
                              <TableCell align="center">
                                {data[i * 22 + j] ? (
                                  <CheckIcon fontSize="small" color="success" />
                                ) : (
                                  <CloseIcon fontSize="small" color="error" />
                                )}
                              </TableCell>
                            ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <h3>Hiring Process</h3>
              <StepperComp />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </div>
  );
}

View.layout = "adminPhaseDashBoard";
export default View;
