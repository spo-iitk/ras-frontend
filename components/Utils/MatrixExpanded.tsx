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
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import {
  // BranchesExpanded,
  // Branches,
  BranchesExpanded,
  // func,
  funcExpanded,
  programExpanded,
  programType,
} from "@components/Utils/matrixUtils";

function MatrixExpanded({ data }: { data: string }) {
  if (data?.length < 110)
    return <Typography>Eligibility Matrix Not Found</Typography>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
              Program
            </TableCell>
            {programExpanded.map((program) => (
              <TableCell align="center" width={100} sx={{ fontWeight: 600 }}>
                {program}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {BranchesExpanded.map((branch) => (
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {branch}
              </TableCell>
              {programExpanded.map((program) => (
                <TableCell width={100} align="center">
                  {funcExpanded[branch as keyof typeof funcExpanded][
                    program as keyof programType
                  ] === -1 ? (
                    <RemoveIcon />
                  ) : data[
                      funcExpanded[branch as keyof typeof funcExpanded][
                        program as keyof programType
                      ]
                    ] === "1" ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MatrixExpanded;
