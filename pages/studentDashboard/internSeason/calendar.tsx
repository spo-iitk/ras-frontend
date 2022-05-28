import React, { useEffect } from 'react'
import Meta from '../../../components/Meta'
import styles from '../../../styles/studentInternPhase.module.css'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Card, Grid, Stack } from '@mui/material';

type Events={
  companyName: string;
  eventName: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventDescription: string;
  contact: string;
}

const events:Events[]=[
  {
    companyName: 'Google',
    eventName: 'Google Summer of Code',
    eventDate: new Date(2022, 4, 29),
    eventStartTime: '9:00 AM',
    eventEndTime: '5:00 PM',
    eventLocation: 'Google Headquarters',
    eventDescription: 'Google Summer of Code is a program for students to learn about Google\'s software development process and to apply their skills to the real world. Students will work on a variety of projects, including web and mobile apps, games, and other software. The program is open to all students in the United States.',
    contact: 'https://www.google.com/summerofcode/'
  },
]

function Calendar() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [activity, setActivity]=React.useState<Events[]>([]);

  useEffect(() => {
    setActivity(events.filter(e=>e['eventDate'].toDateString()===value?.toDateString()))
  },[value])
  return (
    <div className={styles.container}>
      <h1>Calender</h1>
      <Meta title="Calendar - Intern Season" />
      <Card>
        <Grid container spacing={3} alignItems={'flex-start'} justifyContent='center'>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} wi>
              <StaticDatePicker<Date>
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  const d=newValue?.toDateString()
                  setActivity(events.filter(e=>e['eventDate'].toDateString()===d))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{padding:'0px 15px'}}>
              <Stack alignItems={'flex-start'} justifyContent={'flex-start'}>
                {activity.length>0?
                (activity.map((e, index)=>(
                  <div key={index}>
                    <h2>{e.eventName}</h2>
                    <h4 style={{fontWeight:300}}>Company: {e.companyName}</h4>
                    <h4 style={{fontWeight:300}}>Date: {e.eventDate.toDateString()}</h4>
                    <h4 style={{fontWeight:300}}>Timings: {e.eventStartTime} - {e.eventEndTime}</h4>
                    <h4 style={{fontWeight:300}}>Venue: {e.eventLocation}</h4>
                    <h4 style={{fontWeight:300}}>{e.eventDescription}</h4>
                    <h4 style={{fontWeight:300}}>Contact: {e.contact}</h4>
                  </div>
                ))):
                <h2>No event scheduled</h2>
                }
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
