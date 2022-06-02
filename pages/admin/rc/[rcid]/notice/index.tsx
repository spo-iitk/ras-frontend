import { IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Meta from '../../../../../components/Meta'
import styles from '../../../../..//styles/adminPhase.module.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Company Name',
    width: 300,
  },
  {
    field: 'publishedDateAndTime',
    headerName: 'Published Date And Time',
    width: 200,
  },
  
];

const rows = [
  { id:1 , name:'Company Name : Title', publishedDateAndTime : 'May 26 2019' },
];

const Index = () => {
  return (
    <div className={styles.container}>
      <Meta title="Notices" />
      <Stack>
        <h1>Internship 2022-23 Phase 1</h1>
        <Stack 
          direction="row"
          marginRight={5}
          marginLeft={5}
          alignItems="left"
          justifyContent="space-between"
        >
          <h2>Notices</h2>
          <IconButton><Link href='../:id/notice/new' passHref={true}><AddIcon/></Link></IconButton>
        </Stack>
        <div style={{ height: 500, margin: '0px auto' }} className={styles.datagridNotices}>
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

Index.layout = 'adminPhaseDashBoard'
export default Index