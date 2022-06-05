import React from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel, Stack, TextField } from '@mui/material';
import ActiveButton from '@components/Buttons/ActiveButton';
import InactiveButton from '@components/Buttons/InactiveButton';

function Index() {
  return (
    <div>
      <Stack
        style={{textAlign:'center',marginBottom:50}} 
      >
        <h1 >ADD PPO/PIO</h1>
      </Stack>
      <FormControl>
        <Stack
          style={{marginLeft:'350px'}}
        >
          <h2 style={{ marginRight: 96, textAlign:'left' }}>COMPANY NAME</h2>
          <TextField id="companyName" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          style={{marginLeft:'350px'}}
        >
          <h2 style={{ marginRight: 96, textAlign:'left' }}>ENTER ROLL NUMBERS</h2>
          <TextField id="rollNo" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <h2 style={{textAlign:"center"}}>OR</h2>
        <Stack
          style={{marginLeft:'350px'}}
        >
          <h2 style={{ marginRight: 96, textAlign:'left' }}>ENTER EMAIL IDS</h2>
          <TextField id="emailId" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
          style={{ marginTop: "140px", marginLeft: "350px", justifyContent: "space-between" }}
        >
          <ActiveButton onClick={() => { location.href = '../notice' }}>ADD</ActiveButton>
          <InactiveButton onClick={() => { location.href = '../notice/new' }}>RESET</InactiveButton>
        </Stack>
      </FormControl>
    </div>
  )
}

Index.layout = 'adminPhaseDashBoard'
export default Index
