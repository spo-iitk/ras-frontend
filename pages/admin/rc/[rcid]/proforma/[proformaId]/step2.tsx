import { Button, Card, IconButton, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  Branches,
  func,
  programExpanded,
  programType,
} from "@components/Utils/matrixUtils";
import Meta from "@components/Meta";

const ROUTE = "/admin/rc/[rcid]/proforma/[proformaId]/step3";

function Step2() {
  const [str, setStr] = useState(new Array(100 + 1).join("0"));
  const router = useRouter();
  const { rcid } = router.query;

  const handleNext = () => {
    router.push({
      pathname: ROUTE,
      query: { rcid, proformaId: 1 },
    });
  };

  const handleCheckAll = () => {
    setStr(new Array(100 + 1).join("1"));
  };

  const handleReset = () => {
    setStr(new Array(100 + 1).join("0"));
  };

  const handleProgramWise = (programName: string) => {
    let newStr = str;
    Branches.forEach((branch) => {
      const idx =
        func[branch as keyof typeof func][programName as keyof programType];
      if (idx !== -1) {
        newStr = `${newStr.substring(0, idx)}1${newStr.substring(idx + 1)}`;
      }
    });
    setStr(newStr);
  };

  const handleBranchWise = (branchName: string) => {
    let newStr = str;
    programExpanded.forEach((programName) => {
      const idx =
        func[branchName as keyof typeof func][programName as keyof programType];
      if (idx !== -1) {
        newStr = `${newStr.substring(0, idx)}1${newStr.substring(idx + 1)}`;
      }
    });
    setStr(newStr);
  };

  const handleCheck = (branch: string, program: string) => {
    const idx = func[branch as keyof typeof func][program as keyof programType];
    let newStr = str;
    if (str[idx] === "1") {
      newStr = `${str.substring(0, idx)}0${str.substring(idx + 1)}`;
    } else {
      newStr = `${str.substring(0, idx)}1${str.substring(idx + 1)}`;
    }
    setStr(newStr);
  };
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Step 2/5 - New Opening" />
      <Card sx={{ padding: 3 }}>
        <h1>Step 2/5 (Eligibility Matrix)</h1>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={1}>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={handleCheckAll}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                <CheckCircleIcon />
              </IconButton>
              <h3>
                Select all branches and programmes coming from JEE Advanced
              </h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from GATE</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from JAM</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from CAT</h3>
            </Stack>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    width={100}
                    sx={{ fontWeight: 600 }}
                  >
                    Program
                  </TableCell>
                  {programExpanded.map((program) => (
                    <TableCell
                      align="center"
                      width={100}
                      sx={{ fontWeight: 600 }}
                    >
                      <Button onClick={() => handleProgramWise(program)}>
                        {program}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Branches.map((branch) => (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 600 }}
                    >
                      <Button onClick={() => handleBranchWise(branch)}>
                        {branch}
                      </Button>
                    </TableCell>
                    {programExpanded.map((program) => (
                      <TableCell width={100} align="center">
                        {func[branch as keyof typeof func][
                          program as keyof programType
                        ] === -1 ? (
                          <RemoveIcon />
                        ) : (
                          <Checkbox
                            checked={
                              str[
                                func[branch as keyof typeof func][
                                  program as keyof programType
                                ]
                              ] === "1"
                            }
                            onClick={() => handleCheck(branch, program)}
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction="row"
            spacing={5}
            sx={{ width: { xs: "330px", md: "500px" } }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

Step2.layout = "adminPhaseDashBoard";
export default Step2;
