import React from 'react'
import { Stack, Grid, IconButton, Paper, TextField, Select, MenuItem, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ActiveButton from '@components/Buttons/ActiveButton';
function Question() {
  const options = [
    {id: 1, data: "Option-1"},
    {id: 2, data: "Option-2"},
    {id: 3, data: "Option-3"}
  ];
  const qtype = [
   {id: 1, data: "Type-1"}
  ];
  const quest = [
    {id: 1, data: "Quest -1"}
  ]
  return (
    <div>
    <Paper variant='elevation' elevation={8} sx = {{margin: "2rem auto", width: "50rem"}}>
    <Stack justifyContent= "center">
    <h2 style={{textAlign: "center"}}>VIEW CUSTOM QUESTION</h2>
    <TableContainer>
      <Table >
      <TableBody>
      {qtype.map((value) => (
      <TableRow>
      <TableCell>
      <h3 style = {{marginLeft: "5rem"}}>Question Type</h3>
      </TableCell>
      <TableCell>
      <div style = {{width: "30rem"}}>
      <TextField
          id="qtype"
          // select
          defaultValue= {value.data} 
          inputProps={
            { readOnly: true, }
          }
          // label="Question Type"
          // onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
        />
          {/* {qtype.map((value) => (
            <MenuItem value = {value.data}>{value.data}</MenuItem>
            ))} */}
          
        </div>
      </TableCell>
      </TableRow>
      ))}
      {quest.map((value) => (
      <TableRow>
      <TableCell>
      <h3 style = {{marginLeft: "5rem"}}>Question</h3>
      </TableCell>
      <TableCell>
      <div style = {{width: "30rem"}}>
      <TextField
          id="quest"
          // select
          inputProps={
            { readOnly: true, }
          }
          // label="Question"
          defaultValue = {value.data}
          // onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
          multiline
        />
        </div>
      </TableCell>
      </TableRow>
      ))}
      {options.map((value) => (
        <TableRow>
        <TableCell>
        <h3 style = {{marginLeft: "5rem"}}> {value.data} </h3>
        </TableCell>  
        <TableCell>
        <div style = {{width: "15rem"}}>
      <TextField
          id="outlined-select-currency"
          // select
          required
          defaultValue={value.data}
          label=""
          inputProps={
            { readOnly: true, }
          }
          // onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
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
  )
}
Question.layout="adminDashBoard";
export default Question
