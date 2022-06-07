import { Stack, Grid, IconButton, Paper, TextField, Select, MenuItem, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import ActiveButton from '@components/Buttons/ActiveButton';
const options = [
  {id: 1, data: "Option-1"},
  {id: 2, data: "Option-2"},
  {id: 3, data: "Option-3"}
];
const qtype = [
 {id: 1, data: "Type-1"},
 {id: 2, data: "Type-2"},
 {id: 3, data: "Type-3"}
];
function NewQuestion() {
  const length = options.length
  
  const [value, setValue] = React.useState('')
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Paper variant='elevation' elevation={8} sx = {{margin: "2rem auto", width: "45vw"}}>
      <Stack justifyContent= "center">
      <Grid container spacing = {1} justifyContent = "center" alignContent = "center">
      <Grid item xs = {6} sx = {{marginLeft: "2 rem", alignText: "center"}}>
      <h2>ADD CUSTOM QUESTION</h2>
      </Grid>
      <Grid item xs = {1} sx = {{alignItems: "right", marginTop: "1rem"}}>
      <div>
          <IconButton><AddIcon/></IconButton>
      </div>
      </Grid>
      </Grid>
      <TableContainer>
      <Table >
      <TableBody>
      <TableRow>
      {/* <TableCell>
      <h3 style = {{marginLeft: "5rem"}}>Question Type</h3>
      </TableCell> */}
      <TableCell align='center'>
      <div style = {{width: "30rem", marginLeft: "4vw"}}>
      <TextField
          id="qtype"
          required
          select
          label="Select Question Type"
          onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
          variant='standard'
        >
          {qtype.map((value) => (
            <MenuItem value = {value.data}>{value.data}</MenuItem>
            ))}
          </TextField>
        </div>
      </TableCell>
      </TableRow>
      <TableRow>
      {/* <TableCell>
      <h3 style = {{marginLeft: "5rem"}}>Question</h3>
      </TableCell> */}
      <TableCell>
      <div style = {{width: "30rem",marginLeft: "4vw"}}>
      <TextField
          id="quest"
          required
          // select
          label="Enter Question"
          onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
          multiline
          variant='standard'
        />
        </div>
      </TableCell>
      </TableRow>
      {options.map((value, i) => {
        if(i < length-1)return(
          <TableRow>
          {/* <TableCell>
          <h3 style = {{marginLeft: "5rem"}}> {value.data} </h3>
          </TableCell>   */}
          <TableCell>
      <div style = {{width: "20rem", marginLeft: "4vw"}}>
      <TextField
          id="outlined-select-currency"
          // select
          required
          label="Enter Option"
          onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
          multiline
          variant='standard'
        />
        </div>
      </TableCell>
      </TableRow>
        )
      else return(
        <TableRow>
          {/* <TableCell>
          <h3 style = {{marginLeft: "5rem"}}>{value.data} </h3>
          </TableCell>   */}
          <TableCell>
      <div style = {{width: "20rem", marginLeft:"4vw"}}>
      <TextField
          id="outlined-select-currency"
          // select
          label="Enter Option"
          onChange={handleChange}
          sx = {{marginLeft :"5 rem"}}
          fullWidth
          multiline
          variant='standard'
        />
        </div>
      </TableCell>
      <TableCell>
      <IconButton sx = {{border: "2px blue solid", display:"relative", right: "2vw "}}><AddIcon/></IconButton>
      </TableCell>
      </TableRow>
      )}
  )}
    </TableBody>
    </Table>
    </TableContainer>
    <Grid container spacing = {1} justifyContent = "center" alignContent = "center">
    <Grid item xs = {3}>
    <ActiveButton sx = {{width: "max-content", margin: "0.5rem 0"}}>Add Question</ActiveButton>
    </Grid>
    </Grid>
      </Stack>
      </Paper>
    </div>
  )
}

NewQuestion.layout="adminPhaseDashBoard";
export default NewQuestion
