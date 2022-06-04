import React from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
import InactiveButton from '../../../../../components/Buttons/InactiveButton';


const h1="UFREEZE (GROUP)"
function Unfreeze() {
  return (
    <div>
      <Stack
        style={{textAlign:'left',marginBottom:150}} 
      >
        <h1>INTERNSHIP 2022-23 PHASE 1</h1>
      </Stack>
      <h1 style={{textAlign:'center'}}>{h1}</h1>
      <FormControl style={{display:"flex",justifyItems:'center'}}>
        <Stack
          style={{alignItems:'center',}}
        >
          <Typography>ENTER ROLL NUMBERS</Typography>
          <TextField id="rollNo" variant="filled" fullWidth style={{ width: "700px" }} />
          <Typography style={{textAlign:'center',marginTop:20,marginBottom:20}}>OR</Typography>
        </Stack>
        <Stack
          style={{alignItems:'center',}}
        >
          <Typography>ENTER EMAIL IDS</Typography>
          <TextField id="emailId" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
          style={{alignItems:'center',marginTop:60,justifyContent:'space-evenlyc'}}
        >
          <ActiveButton onClick={() => { location.href = '../notice' }}>Unfreeze</ActiveButton>
          <InactiveButton onClick={() => { location.href = '../notice/new' }}>RESET</InactiveButton>
        </Stack>
      </FormControl>
    </div>
  )
}

Unfreeze.layout = 'adminPhaseDashBoard'
export default Unfreeze
