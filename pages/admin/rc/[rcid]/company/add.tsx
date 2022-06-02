import React from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
import InactiveButton from '../../../../../components/Buttons/InactiveButton';

const h1 = "(IN INTERNSHIP 2022-23 PHASE 1)";

function AddCompany() {
  return (
    <div>
      <Stack
        style={{textAlign:'center',marginBottom:50}} 
      >
        <h1 >ADD COMPANY</h1>
        <h1 >{h1}</h1>
        <Typography>NOTE:IF COMPANY IS NOT LISTED HERE THEN ADD COMANY IN MASTER</Typography>
        <Typography> DATABASE FIRST.SIMILARLY FOR ACTIVE HR </Typography>
      </Stack>
      <FormControl>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 100, marginLeft: 100 }}>SELECT COMPANY</h2>
          <TextField id="selectCompany" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
        >
          <h2 style={{ marginRight: 96, marginLeft: 100 }}>SELECT ACTIVE HR</h2>
          <TextField id="selectActiveHr" variant="filled" fullWidth style={{ width: "700px" }} />
        </Stack>
        <Stack
          direction='row'
          style={{ marginTop: "140px", marginLeft: "100px", justifyContent: "space-between" }}
        >
          <ActiveButton onClick={() => { location.href = '../notice' }}>ADD</ActiveButton>
          <InactiveButton onClick={() => { location.href = '../notice/new' }}>RESET</InactiveButton>
        </Stack>
      </FormControl>
    </div>
  )
}

AddCompany.layout = 'adminPhaseDashBoard'
export default AddCompany
