import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Branches, program } from "./matrixUtils";

function MatrixCondensed({ data }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Program
            </TableCell>
            {program.map((prog: string) => (
              <TableCell
                key={prog}
                align="center"
                width={100}
                sx={{ fontWeight: 600 }}
              >
                {prog}
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
                  {Branches[i]}
                </TableCell>
                {Array(6)
                  .fill(0)
                  .map((__, j) => (
                    <TableCell align="center">
                      {data[i * 6 + j] ? (
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
  );
}

export default MatrixCondensed;
