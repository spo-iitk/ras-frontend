import React from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel, Stack, TextField } from '@mui/material';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
import InactiveButton from '../../../../../components/Buttons/InactiveButton';

function NewNotice() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>ADD NOTICE</h1>
      <FormControl>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 100, marginLeft: 100 }}>COMPANY NAME</h2>
          <TextField id="companyName" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 192, marginLeft: 100 }}>SUBJECT</h2>
          <TextField id="subject" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 185, marginLeft: 100 }}>MESSAGE</h2>
          <TextField id="message" variant="filled" multiline rows={4} style={{ width: "700px",marginBottom:"20px" }} />
        </Stack>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 135, marginLeft: 100 }}>ATTACHMENT</h2>
          <Button
            variant="contained"
            component="label"
            style={{width:"300px",backgroundColor:"gray"}}
          >
            Upload File
            <input
              type="file"
              hidden
            />
          </Button>
        </Stack>
        <Stack
          direction='row'
          style={{marginTop:"140px",marginLeft:"100px",justifyContent:"space-between"}}
        >
          <ActiveButton onClick={()=>{location.href='../notice'}}>ADD</ActiveButton>
          <InactiveButton onClick={()=>{location.href='../notice/new'}}>RESET</InactiveButton>
        </Stack>
      </FormControl>
    </div>
  )
}

NewNotice.layout = 'adminPhaseDashBoard'
export default NewNotice
