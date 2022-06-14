import Meta from "@components/Meta";
import { programExpanded, Branches } from "@components/Utils/matrixUtils";
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
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step3";

function Step2() {
  const [val, setVal] = useState(Array(220).fill(0));
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { rcId } = router.query;

  const handleNext = (data: any) => {
    console.log(data);
    router.push({
      pathname: ROUTE,
      query: { rcId, proformaId: 1 },
    });
  };

  const handleCheckAll = () => {
    setVal(
      val.map((value) => {
        if (value !== -1) {
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
        if (index === 10 * j + i) {
          if (value !== -1) {
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
        if (index === i * 10 + j) {
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
        if (index === 10 * i + j && index < 10 * (i + 1)) {
          if (value !== -1) {
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
    setVal(Array(220).fill(0));
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
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Program
                  </TableCell>
                  {programExpanded.map((prog: string, k: number) => (
                    <TableCell key={prog} align="center" width={300}>
                      <Button onClick={() => handleProgramWise(k)}>
                        {prog}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(22)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ fontWeight: 600 }}
                      >
                        <Button onClick={() => handleBranchWise(i)}>
                          {Branches[i]}
                        </Button>
                      </TableCell>
                      {Array(10)
                        .fill(0)
                        .map((__, j) => (
                          <TableCell align="center">
                            <Checkbox
                              disabled={val[10 * i + j] === -1}
                              checked={val[10 * i + j] === 1}
                              onChange={() => handleCheck(i, j)}
                            />
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
              onClick={handleSubmit(handleNext)}
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
