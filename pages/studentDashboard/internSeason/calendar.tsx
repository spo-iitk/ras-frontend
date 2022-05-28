import React from 'react'
import Meta from '../../../components/Meta'
import styles from '../../../styles/studentInternPhase.module.css'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Card, Grid, Stack } from '@mui/material';

function Calendar() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <div className={styles.container}>
      <h1>Calender</h1>
      <Meta title="Calendar - Intern Season" />
      <Card>
        <Grid container spacing={3} alignItems={'center'} justifyContent='center'>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} wi>
              <StaticDatePicker<Date>
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{padding:'0px 15px'}}>
              <Stack alignItems={'center'} justifyContent={'center'}>
              <h2>No event scheduled</h2>
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
Calendar.layout = "studentPhaseDashboard"
export default Calendar
