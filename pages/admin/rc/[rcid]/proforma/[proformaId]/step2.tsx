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
  matrix,
  programExpanded,
} from "@components/Utils/matrixUtils";
import Meta from "@components/Meta";

const ROUTE = "/company/rc/[rcid]/proforma/[proformaId]/step3";

function Step2() {
  const [val, setVal] = useState(matrix);
  const [arr] = useState(Array.from(new Array(12).keys()));

  const router = useRouter();
  const { rcid } = router.query;

  const handleNext = () => {
    let res = "";
    for (let i = 0; i < val.length; i += 1) {
      res += `${val[i]}`;
    }
    console.log(res);
    router.push({
      pathname: ROUTE,
      query: { rcid, proformaId: 1 },
    });
  };

  const handleCheckAll = () => {
    setVal(
      val.map((value) => {
        if (value !== 2) {
          return 1;
        }
        return value;
      })
    );
  };

  const handleProgramWise = (i: number) => {
    let j = 0;
    setVal(
      val.map((value, index) => {
        if (index === 15 * j + i) {
          if (value !== 2) {
            j += 1;
            return 1;
          }
          j += 1;
          return value;
        }
        return value;
      })
    );
  };

  const handleCheck = (i: number, j: number) => {
    setVal(
      val.map((value, index) => {
        if (index === i * 15 + j) {
          if (value === 0) {
            return 1;
          }
          if (value === 1) {
            return 0;
          }
          return value;
        }
        return value;
      })
    );
  };

  const handleBranchWise = (i: number) => {
    let j = 0;
    setVal(
      val.map((value, index) => {
        if (index === 15 * i + j && index < 15 * (i + 1)) {
          if (value !== 2) {
            j += 1;
            return 1;
          }
          j += 1;
          return value;
        }
        return value;
      })
    );
  };

  const handleReset = () => {
    setVal(matrix);
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
                  {arr.map((i) => (
                    <TableCell
                      align="center"
                      width={100}
                      sx={{ fontWeight: 600 }}
                    >
                      <Button onClick={() => handleProgramWise(i)}>
                        {programExpanded[i]}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(24)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 600 }}
                      >
                        <Button onClick={() => handleBranchWise(i)}>
                          {Branches[i]}
                        </Button>
                      </TableCell>
                      {Array(12)
                        .fill(0)
                        .map((__, j) => (
                          <TableCell width={100} align="center">
                            {matrix[15 * i + j] === 2 ? (
                              <RemoveIcon />
                            ) : (
                              <Checkbox
                                checked={val[15 * i + j] === 1}
                                onClick={() => handleCheck(i, j)}
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

Step2.layout = "companyPhaseDashboard";
export default Step2;
