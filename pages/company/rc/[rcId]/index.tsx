import { IconButton, Stack, Typography } from '@mui/material'
import Meta from '../../../../components/Meta'
import styles from '../../../../styles/internPhase.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import ActiveButton from '../../../../components/Buttons/ActiveButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const ROUTE_PATH="/company/rc/[rcId]/proforma/[proformaId]"
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'roleName',
    headerName: 'Role Name',
    width: 400,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    sortable: false,
  },
  {
    field: 'proforma',
    headerName: 'View Proforma',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>  <Link href={{ pathname: ROUTE_PATH, query:{ rcId: 1, proformaId: 1}}} passHref={true}>
      <ActiveButton sx={{ height:30, width: '100%'}}>{params.value}</ActiveButton>
      </Link>
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 200,
    sortable: false,
    align:'center',
    headerAlign:'center',
    renderCell: (params) =>  <IconButton onClick={() => {}}><DeleteIcon /></IconButton>
  },
];

const rows = [
  { id:'1',roleName: 'Software Intern', status: 'Open', proforma: 'View', delete:'Delete' },
];


const Overview = () => {
  return (
    <div className={styles.container}>
      <Meta title="Overview - QuadEye" />
      <Stack>
        <h1>Internship Recruitment Drive 2022-23</h1>
        <h2>Overview</h2>
        <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridOpenings}>
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

Overview.layout = 'companyPhaseDashboard'
export default Overview
