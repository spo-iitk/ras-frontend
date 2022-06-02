import { Stack, Grid, Paper, Card, CardActionArea, CardContent, CardMedia, Typography, List, ListItem, ListItemText } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
const columns: GridColDef[] = [
  {
    field: 'Name',
    // headerName: 'ID',
    align: 'center',
    headerAlign: 'center',
    width: 50
  },
  {
    field: 'data',
    // headerName: 'ID',
    align: 'center',
    headerAlign: 'center',
    width: 50
  }
];
const Notices = [
 {id :1, Name :"Company Name: Test Details", data: "4238" },
 {id :2, Name :"Company Name: Shortlisting For Interview", data: "4238" },
 {id :3, Name :"Company Name: Test Details", data: "4238" },
 {id :4, Name :"Company Name: Test Details", data: "4238" }
];
const RecCompany = [
  {id :1, Name :"Company Name: Registered", data: "4238" },
  {id :1, Name :"Company Name: Registered", data: "4238" },
  {id :1, Name :"Company Name: Registered", data: "4238" },
  {id :2, Name :"Company Name: Uploaded", data: "4238" }
 ];
 const EventSchd = [
  {id :1, Name :"Company Name: Test", data: "4238" },
  {id :2, Name :"Company Name: Interview", data: "4238" },
  {id :2, Name :"Company Name: GD", data: "4238" },
  {id :2, Name :"Company Name: PPT", data: "4238" }
 ];
 const EventNotSchd = [
  {id :1, Name :"Company Name: PPT", data: "4238" },
  {id :2, Name :"Company Name: Test", data: "4238" }
 ];
function Index() {
  return (
    <div>
    <Stack>
    <h1>Internship 2022-23 Phase</h1>
    <Grid container spacing = {2}>
      <Grid item xs = {3}>
      <Card sx={{ maxWidth: 345, margin: "2rem" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="text.secondary" sx = {{textAlign: "center", marginBottom: "2rem", fontWeight: "600"}}>
            Total Registered
          </Typography>

          <Typography gutterBottom variant="h3" component="div" sx = {{textAlign: "center", fontWeight: "700"}}>
          800
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
      <Grid item xs = {3}>
      <Card sx={{ maxWidth: 345, margin: "2rem" , boxShadow: "20px"}}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="text.secondary" sx = {{textAlign: "center", marginBottom: "2rem", fontWeight: "600"}}>
            Total Placed
          </Typography>

          <Typography gutterBottom variant="h3" component="div" sx = {{textAlign: "center", fontWeight: "700"}}>
          350
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
      <Grid item xs = {3}>
      <Card sx={{ maxWidth: 345, margin: "2rem" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="text.secondary" sx = {{textAlign: "center", marginBottom: "2rem", fontWeight: "600"}}>
            Total Company
          </Typography>

          <Typography gutterBottom variant="h3" component="div" sx = {{textAlign: "center", fontWeight: "700"}}>
          43
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
      <Grid item xs = {3}>
      <Card sx={{ maxWidth: 345, margin: "2rem" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="text.secondary" sx = {{textAlign: "center", marginBottom: "2rem", fontWeight: "600"}}>
            No of Roles
          </Typography>

          <Typography gutterBottom variant="h3" component="div" sx = {{textAlign: "center", fontWeight: "700"}}>
          105
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
    </Grid>
    <Grid container spacing={1}>
      <Grid item  xs={6}>
       <Paper variant='outlined' elevation={1} sx= {{margin: '2rem'}}>
       <Grid container spacing={1}>
       <Grid item xs={6}>
         <h3 style={{marginLeft: "0.5rem"}}>Notices</h3>
         <h5 style={{marginLeft: "0.5rem", position: "relative", bottom: "1rem"}}>Posted by: SPO Team</h5>
       </Grid>
       <Grid item xs={6}>
         <h5 style={{marginRight: "0.8rem",display: "flex", justifyContent: "flex-end", color:"blue"}}><a style= {{cursor : "pointer"}}>View all</a></h5>
       </Grid>
       </Grid>
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: "5 rem" }}>
       {Notices.map((value) => (
       <ListItem
        key={value.id}
        // disableGutters
        secondaryAction={
        <h5 style={{color: "blue", position: "relative", left: "12rem"}}>
        {value.data}
        </h5>
      }
    >
      <ListItemText primary={value.Name} />
    </ListItem>
  ))}
</List>
       </Paper>
      </Grid>
      <Grid item  xs={6}>
      <Paper variant='outlined' elevation={1} sx= {{margin: '2rem'}}>
      <Grid container spacing={1}>
       <Grid item xs={6}>
         <h3 style={{marginLeft: "0.5rem"}}>Recent Company Added</h3>
         <h5 style={{marginLeft: "0.5rem", position: "relative", bottom: "1rem"}}>Posted by: SPO Team</h5>
       </Grid>
       <Grid item xs={6}>
         <h5 style={{marginRight: "0.8rem",display: "flex", justifyContent: "flex-end", color:"blue"}}><a style= {{cursor : "pointer"}}>View all</a></h5>
       </Grid>
       </Grid>
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: "5 rem" }}>
       {RecCompany.map((value) => (
       <ListItem
        key={value.id}
        // disableGutters
        secondaryAction={
        <h5 style={{color: "blue", position: "relative", left: "12rem"}}>
        {value.data}
        </h5>
      }
    >
      <ListItemText primary={value.Name} />
    </ListItem>
  ))}
</List>
      {/* <h1>1</h1> */}
      </Paper>
      </Grid>
    </Grid>
    <Grid container spacing={1}>
      <Grid item  xs={6}>
      <Paper variant='outlined' elevation={1} sx= {{margin: '2rem'}}>
      <Grid container spacing={1}>
       <Grid item xs={6}>
         <h3 style={{marginLeft: "0.5rem"}}>Events Scheduled</h3>
         <h5 style={{marginLeft: "0.5rem", position: "relative", bottom: "1rem"}}>Posted by: SPO Team</h5>
       </Grid>
       <Grid item xs={6}>
         <h5 style={{marginRight: "0.8rem",display: "flex", justifyContent: "flex-end", color:"blue"}}><a style= {{cursor : "pointer"}}>View all</a></h5>
       </Grid>
       </Grid>
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: "5 rem" }}>
       {EventSchd.map((value) => (
       <ListItem
        key={value.id}
        // disableGutters
        secondaryAction={
        <h5 style={{color: "blue", position: "relative", left: "12rem"}}>
        {value.data}
        </h5>
      }
    >
      <ListItemText primary={value.Name} />
    </ListItem>
  ))}
</List>
      {/* <h1>1</h1> */}
      </Paper>
    </Grid>
      <Grid item  xs={6}>
      <Paper variant='outlined' elevation={1} sx= {{margin: '2rem'}}>
      <Grid container spacing={1}>
       <Grid item xs={6}>
         <h3 style={{marginLeft: "0.5rem"}}>Events: Not Scheduled Yet</h3>
         <h5 style={{marginLeft: "0.5rem", position: "relative", bottom: "1rem"}}>Posted by: SPO Team</h5>
       </Grid>
       <Grid item xs={6}>
         <h5 style={{marginRight: "0.8rem",display: "flex", justifyContent: "flex-end", color:"blue"}}><a style= {{cursor : "pointer"}}>View all</a></h5>
       </Grid>
       </Grid>
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: "5 rem" }}>
       {EventSchd.map((value) => (
       <ListItem
        key={value.id}
        // disableGutters
        secondaryAction={
        <h5 style={{color: "blue", position: "relative", left: "12rem"}}>
        {value.data}
        </h5>
      }
    >
      <ListItemText primary={value.Name} />
    </ListItem>
  ))}
</List>
      {/* <h1>1</h1> */}
      </Paper>
      </Grid>
    </Grid>
    </Stack>
    </div> 
  )
}


Index.layout="adminPhaseDashBoard";
export default Index


