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
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  Branches,
  func,
  programExpanded,
  programType,
} from "@components/Utils/matrixUtils";
import Meta from "@components/Meta";
import useStore from "@store/store";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";

const ROUTE = "/admin/rc/[rcid]/proforma/[proformaid]/step3";

function Step2() {
  const [str, setStr] = useState(new Array(125 + 1).join("0"));
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const { token } = useStore();
  useEffect(() => {
    if (!(rid && pid)) return;
    const getStep2 = async () => {
      const data = await requestProforma.get(token, rid, pid);
      if (data.eligibility.length > 110) setStr(data.eligibility);
    };
    getStep2();
  }, [rid, pid, token]);
  const handleNext = async () => {
    const info = {
      eligibility: str,
      ID: parseInt(pid, 10),
    } as AdminProformaType;
    await requestProforma.put(token, rid, info).then(() => {
      router.push({
        pathname: ROUTE,
        query: { rcid: rid, proformaid: pid },
      });
    });
  };

  const handleCheckAll = () => {
    setStr(new Array(125 + 1).join("1"));
  };

  const handleReset = () => {
    setStr(new Array(125 + 1).join("0"));
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
      newStr = `${newStr.substring(0, idx)}0${newStr.substring(idx + 1)}`;
    } else {
      newStr = `${newStr.substring(0, idx)}1${newStr.substring(idx + 1)}`;
    }
    setStr(newStr);
  };
  const handleMultipleProgramWise = (programName: string[]) => {
    let newStr = str;
    Branches.forEach((branch) => {
      programName.forEach((program) => {
        const idx =
          func[branch as keyof typeof func][program as keyof programType];
        if (idx !== -1) {
          newStr = `${newStr.substring(0, idx)}1${newStr.substring(idx + 1)}`;
        }
      });
    });
    setStr(newStr);
  };

  const handleExamSelection = (exam: string) => {
    switch (exam) {
      case "JEE":
        handleMultipleProgramWise([
          "BT",
          "BS",
          "DoubleMajor",
          "DualA",
          "DualB",
          "DualC",
        ]);
        break;
      case "JAM":
        handleMultipleProgramWise(["MSc"]);
        break;
      case "CAT":
        handleMultipleProgramWise(["MBA"]);
        break;
      case "GATE":
        handleMultipleProgramWise(["MT", "MSR", "MDes"]);
        break;
      case "CEED":
        handleMultipleProgramWise(["MDes"]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Meta title="Step 2 - New Opening" />
      <Card sx={{ padding: 3 }}>
        <h2>Step 2/5 (Eligibility Matrix)</h2>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={1}>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={handleCheckAll}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={() => handleExamSelection("JEE")}>
                <CheckCircleIcon />
              </IconButton>
              <h3>
                Select all branches and programmes coming from JEE Advanced
              </h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={() => handleExamSelection("GATE")}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from GATE</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={() => handleExamSelection("JAM")}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from JAM</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={() => handleExamSelection("CAT")}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from CAT</h3>
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton onClick={() => handleExamSelection("CEED")}>
                <CheckCircleIcon />
              </IconButton>
              <h3>Select all branches and programmes coming from CEED</h3>
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
