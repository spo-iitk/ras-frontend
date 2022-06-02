import { Stack } from '@mui/material'
import Meta from '../../../components/Meta'
import styles from '@/styles/studentInternPhase.module.css'
import InactiveButton from '../../../components/Buttons/InactiveButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'recruitmentDriveName',
    headerName: 'Recruitment Drive Name',
    width: 400,
  },
  {
    field: 'type',
    headerName: 'Type of Recruitment',
    width: 200,
  },
  {
    field: 'date',
    headerName: 'Start Date',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>    <InactiveButton sx={{ height:30, width: '100%'}}>{params.value}</InactiveButton>
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>    <InactiveButton sx={{ height:30, width: '100%'}}>{params.value}</InactiveButton>
  },
];

const rows = [
  { id:'1',recruitmentDriveName: 'internSeason', type: 'Intern', date:'May 26, 2022', status: 'Inactive', remarks: 'Phase-I ended' },
];

const Overview = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Meta title="Student Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>
        <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridOverView}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                onCellClick={(e) => {
                  router.push('rc/1/notices');
                }}
            />
        </div>
      </Stack>
    </div>
  )
}

Overview.layout = 'studentDashboard'
export default Overview
