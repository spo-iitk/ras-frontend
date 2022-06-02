import { Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Meta from '../../../../../components/Meta'
import styles from '../../../../..//styles/PhaseOverview.module.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '',
    width: 1100,
  },
  {
    field: 'publishedDateAndTime',
    headerName: 'Published Date And Time',
    width: 300,
  },
  
];

const rows = [
  { id:'Company Name : Title', publishedDateAndTime : 'May 26 2019' },
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
          <Link href='../:id/notice/new'><AddIcon/></Link>
        </Stack>
        <div style={{ height: 600,width : 1400, margin: '0px auto' }} className={styles.datagridOverView}>
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