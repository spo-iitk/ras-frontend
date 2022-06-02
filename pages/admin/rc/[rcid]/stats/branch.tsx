import { Stack } from '@mui/material'
import Meta from '../../../../../components/Meta'
import styles from '../../../../..//styles/studentInternPhase.module.css'
import InactiveButton from '../../../../../components/Buttons/InactiveButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BorderStyle } from '@mui/icons-material';
import { flexbox, margin } from '@mui/system';
import Button from '@mui/material/Button';
import ActiveButton from '../../../../../components/Buttons/ActiveButton';
 
const columns: GridColDef[] = [
 {
   field: 'branch',
   headerName: 'Branch',
   width: 200,
 },
 {
   field: 'program',
   headerName: 'Program Drive Name',
   width: 200,
 },
 {
   field: 'totalregisteredstudents',
   headerName: 'Total Registered Students',
   width: 200,
 },
 {
   field: 'ppo',
   headerName: 'PPO',
   width: 200,
 },
 {
   field: 'totalplaced',
   headerName: 'Total Placed',
   width: 200,
   sortable: false,
 },
 {
   field: 'percentplaced',
   headerName: '% Placed',
   width: 200,
 },
];
 
const rows = [
 { id:1 ,branch:'Aero Space',program: 'B. Tech.', totalregisteredstudents: '78', ppo:'7', totalplaced: '7', percentplaced: '10' },
];
 
const Overview = () => {
 return (
   <div className={styles.container}>
     <Meta title="Student Dashboard - Overview" />
       <div
       style={{ height: 500,
             margin: '0px auto',
             border:'1px solid #d9d9d9',
             backgroundColor: 'white',
             borderRadius: '0.5rem',
             padding:'0.5rem'}}
       >
         <div style={{display:'flex', alignItems:'center'}}>
         <div style={{flex:'1'}}><h2>Stats {">"} Branch-wise</h2></div>
         <div style={{flex:'1',textAlign:'right'}}><ActiveButton>DOWNLOAD EXCEL</ActiveButton></div>
         </div>
           <DataGrid
               sx = {{border:'none'}}
               rows={rows}
               columns={columns}
               pageSize={7}
           />
       </div>
   </div>
 )
}
 
Overview.layout = 'studentDashboard'
export default Overview
 

