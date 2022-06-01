import { Stack, Typography } from '@mui/material'
import Meta from '../../components/Meta'
import styles from '../..//styles/PhaseOverview.module.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import ActiveButton from '../../components/Buttons/ActiveButton';

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
    field: 'details',
    headerName: 'View Details',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>  <Link href={`${params.row.recruitmentDriveName}/openings`} passHref={true}><ActiveButton sx={{ height:30, width: '100%'}}>{params.value}</ActiveButton></Link>
  },
];

const rows = [
  { id:'1',recruitmentDriveName: 'internSeason', type: 'Intern', details: 'View' },
];

const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>
        <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridOverView}>
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

Overview.layout = 'companyDashboard'
export default Overview
