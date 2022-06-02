import { Stack } from '@mui/material'
import Meta from '../../../../components/Meta'
import styles from '../../../../styles/studentInternPhase.module.css'
import InactiveButton from '../../../../components/Buttons/InactiveButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ActiveButton from '../../../../components/Buttons/ActiveButton';
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 300,
  },
  {
    field: 'event',
    headerName: 'Event',
    width: 200,
  },
  {
    field: 'startTime',
    headerName: 'Start Time',
    width: 200,
  },
  {
    field: 'endTime',
    headerName: 'End Time',
    width: 200,
  },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>   {
      if(params.value!=='PRESENT') 
    {return <InactiveButton sx={{ height:30, width: '60%'}}>{params.value}</InactiveButton> }
    else return <ActiveButton sx={{ height:30, width: '60%'}}>{params.value}</ActiveButton>
  }
  },
];

const rows = [
  { id:'1',companyName: 'Quadeye', event: 'PPO Talk', startTime:'May 26, 2022 8:00pm'
  , endTime:'May 26, 2022 10:00pm', venue: "L20", status: 'ABSENT'},
];

const Attendance = () => {
  return (
    <div className={styles.container}>
      <Meta title="Attendance - Intern Season" />
      <Stack>
        <h1>Attendance</h1>
        <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridAttendance}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
            />
        </div>
      </Stack>
    </div>
  )
}

Attendance.layout = 'studentPhaseDashboard'
export default Attendance
