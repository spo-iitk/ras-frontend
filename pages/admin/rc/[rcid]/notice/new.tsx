import React from 'react'
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, InputLabel, Stack, TextField } from '@mui/material';
import ActiveButton from '@components/Buttons/ActiveButton';
import InactiveButton from '@components/Buttons/InactiveButton';
import styles from "@styles/adminPhase.module.css"
import Meta from '@components/Meta';

const Input = styled('input')({
  display: 'none',
});
function NewNotice() {
  return (
    <div className={styles.container}>
      <Meta title="Add Notice - Admin" />
      <h1 >Internship 2022-23 Phase 1</h1>
      <div style={{ marginTop: 50 }}>
        <Card elevation={5} sx={{ padding: 3, width: { xs: '330px', sm: '500px', margin: '0px auto' } }}>
          <Stack spacing={3}>
            <h1 >Add Notice</h1>
            <TextField label="Company Name" id="selectCompany" variant="filled" />
            <TextField label="Subject" id="selectActiveHR" variant="filled" />
            <TextField variant="filled" multiline rows={3} placeholder="Write your notice here" label="Message" />
            <label htmlFor="contained-button-file" style={{margin: '30px auto 10px auto'}}>
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="outlined" component="span" sx={{ width: "200px", borderRadius: 5 }}>
                Upload
              </Button>
            </label>
            <Stack direction='row' spacing={2} style={{ justifyContent: "center" }} >
              <ActiveButton sx={{ borderRadius: 5, fontSize: 16, width: '100%' }} onClick={() => { location.href = '../notice' }}>Add</ActiveButton>
              <InactiveButton sx={{ borderRadius: 5, fontSize: 16, width: '100%' }} onClick={() => { location.href = '../notice/new' }}>Reset</InactiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  )
}

NewNotice.layout = 'adminPhaseDashBoard'
export default NewNotice
