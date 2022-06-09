import React from "react";
import {
  Stack,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function Question() {
  const options = [
    { id: 1, data: "Option-1" },
    { id: 2, data: "Option-2" },
    { id: 3, data: "Option-3" },
  ];
  const qtype = [{ id: 1, data: "Type-1" }];
  const quest = [{ id: 1, data: "Quest -1" }];
  return (
    <div>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "50rem" }}
      >
        <Stack justifyContent="center">
          <h2 style={{ textAlign: "center" }}>VIEW CUSTOM QUESTION</h2>
          <TableContainer>
            <Table>
              <TableBody>
                {qtype.map((value, i) => (
                  <TableRow key="qtrow">
                    <TableCell>
                      <h3 style={{ marginLeft: "5rem" }}>Question Type</h3>
                    </TableCell>
                    <TableCell>
                      <div style={{ width: "30rem" }}>
                        <TextField
                          id={`qtype${i}`}
                          // select
                          defaultValue={value.data}
                          inputProps={{ readOnly: true }}
                          // label="Question Type"
                          // onChange={handleChange}
                          sx={{ marginLeft: "5 rem" }}
                          fullWidth
                        />
                        {/* {qtype.map((value) => (
            <MenuItem value = {value.data}>{value.data}</MenuItem>
            ))} */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {quest.map((value, i) => (
                  <TableRow key="qrow">
                    <TableCell>
                      <h3 style={{ marginLeft: "5rem" }}>Question</h3>
                    </TableCell>
                    <TableCell>
                      <div style={{ width: "30rem" }}>
                        <TextField
                          id={`quest${i}`}
                          // select
                          inputProps={{ readOnly: true }}
                          // label="Question"
                          defaultValue={value.data}
                          // onChange={handleChange}
                          sx={{ marginLeft: "5 rem" }}
                          fullWidth
                          multiline
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {options.map((value, i) => (
                  <TableRow key="oprow">
                    <TableCell>
                      <h3 style={{ marginLeft: "5rem" }}> {value.data} </h3>
                    </TableCell>
                    <TableCell>
                      <div style={{ width: "15rem" }}>
                        <TextField
                          id={`opt${i}`}
                          // select
                          required
                          defaultValue={value.data}
                          label=""
                          inputProps={{ readOnly: true }}
                          // onChange={handleChange}
                          sx={{ marginLeft: "5 rem" }}
                          fullWidth
                          multiline
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
    </div>
  );
}
Question.layout = "adminPhaseDashBoard";
export default Question;
