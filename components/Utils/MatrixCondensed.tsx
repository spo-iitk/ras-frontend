/* eslint-disable no-nested-ternary */
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { Branches, func } from "@components/Utils/matrixUtils";

function MatrixCondensed({ data }: { data: string }) {
  // Return null if data is not provided or is invalid
  if (!data || data.length < 110) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Program
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Bachelor of Technology / Bachelor of Science / Double Major (BT /
              BS / Double Major)
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              BTM / BSM
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Master of Technology / Master of Science / Master of Science by
              Research (MT / MSc / MSR)
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Dual Degree
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Master of Design (MDes)
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Master of Business Administration (MBA)
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Doctor of Philosophy (PhD)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Branches.map((branch) => (
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {branch}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].BT === -1 &&
                func[branch as keyof typeof func].BS === -1 &&
                func[branch as keyof typeof func].DoubleMajor === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].BT] === "1" ||
                  data?.[func[branch as keyof typeof func].BS] === "1" ||
                  data?.[func[branch as keyof typeof func].DoubleMajor] ===
                    "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].BTM === -1 &&
                func[branch as keyof typeof func].BSM === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].BTM] === "1" ||
                  data?.[func[branch as keyof typeof func].BSM] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MT === -1 &&
                func[branch as keyof typeof func].MSc === -1 &&
                func[branch as keyof typeof func].MSR === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].MT] === "1" ||
                  data?.[func[branch as keyof typeof func].MSc] === "1" ||
                  data?.[func[branch as keyof typeof func].MSR] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].DualA === -1 &&
                func[branch as keyof typeof func].DualB === -1 &&
                func[branch as keyof typeof func].DualC === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].DualA] === "1" ||
                  data?.[func[branch as keyof typeof func].DualB] === "1" ||
                  data?.[func[branch as keyof typeof func].DualC] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MDes === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].MDes] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MBA === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].MBA] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].PhD === -1 ? (
                  <RemoveIcon />
                ) : data?.[func[branch as keyof typeof func].PhD] === "1" ? (
                  <CheckIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MatrixCondensed;
