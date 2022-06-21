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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Program
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              BT / BS / Double Major
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              MT / MSc /MSR
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Dual
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              MDes
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              MBA
            </TableCell>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              PhD
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
                ) : data[func[branch as keyof typeof func].BT] === "1" ||
                  data[func[branch as keyof typeof func].BS] === "1" ||
                  data[func[branch as keyof typeof func].DoubleMajor] ===
                    "1" ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MT === -1 &&
                func[branch as keyof typeof func].MSc === -1 &&
                func[branch as keyof typeof func].MSR === -1 ? (
                  <RemoveIcon />
                ) : data[func[branch as keyof typeof func].MT] === "1" ||
                  data[func[branch as keyof typeof func].MSc] === "1" ||
                  data[func[branch as keyof typeof func].MSR] === "1" ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].DualA === -1 &&
                func[branch as keyof typeof func].DualB === -1 &&
                func[branch as keyof typeof func].DualC === -1 ? (
                  <RemoveIcon />
                ) : data[func[branch as keyof typeof func].DualA] === "1" ||
                  data[func[branch as keyof typeof func].DualB] === "1" ||
                  data[func[branch as keyof typeof func].DualC] === "1" ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MDes === -1 ? (
                  <RemoveIcon />
                ) : data[func[branch as keyof typeof func].MDes] === "1" ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].MBA === -1 ? (
                  <RemoveIcon />
                ) : data[func[branch as keyof typeof func].MBA] === "1" ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </TableCell>
              <TableCell width={100} align="center">
                {func[branch as keyof typeof func].PhD === -1 ? (
                  <RemoveIcon />
                ) : data[func[branch as keyof typeof func].PhD] === "1" ? (
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
