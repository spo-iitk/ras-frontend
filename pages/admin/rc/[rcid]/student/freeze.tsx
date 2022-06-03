import React from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
import InactiveButton from '../../../../../components/Buttons/InactiveButton';


const h1="FREEZE (GROUP)"
function FREEZE() {
  return (
    <div>
      <Stack
        style={{textAlign:'left',marginBottom:150}} 
      >
        <h1>INTERNSHIP 2022-23 PHASE 1</h1>
      </Stack>
      <h1 style={{textAlign:'center'}}>{h1}</h1>
      <FormControl>
        <Stack
          style={{alignItems:'center',marginRight: 100, marginLeft: 400}}
        >
          <Typography>ENTER ROLL NUMBERS</Typography>
          <TextField id="rollNo" variant="filled" fullWidth style={{ width: "700px" }} />
          <Typography style={{textAlign:'center',marginTop:20,marginBottom:20}}>OR</Typography>
        </Stack>
        <Stack
          style={{alignItems:'center',marginRight: 100, marginLeft: 400}}
        >
          <Typography>ENTER EMAIL IDS</Typography>
          <TextField id="emailId" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
          style={{alignItems:'center',marginRight: 100, marginLeft: 400,marginTop:80,justifyContent:'space-between'}}
        >
          <ActiveButton onClick={() => { location.href = '../notice' }}>FREEZE</ActiveButton>
          <InactiveButton onClick={() => { location.href = '../notice/new' }}>RESET</InactiveButton>
        </Stack>
      </FormControl>
    </div>
  )
}

FREEZE.layout = 'adminPhaseDashBoard'
export default FREEZE
