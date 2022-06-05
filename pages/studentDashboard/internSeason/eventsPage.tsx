import { Typography, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import Meta from '../../../components/Meta'
import styles from '../../../styles/EventsPage.module.css'
import { Box, Container, spacing } from '@mui/system';
import { positions } from '@mui/system';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TvIcon from '@mui/icons-material/Tv';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupsIcon from '@mui/icons-material/Groups';
import DvrIcon from '@mui/icons-material/Dvr';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import { SiHandshake } from "react-icons/si";
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


var clicked=[false,false,false,false,false,false,false]
const icons = [TvIcon,AssignmentIndIcon,GroupsIcon,DvrIcon,EventNoteIcon,GroupIcon]
const text=["Pre Placement Talks","Resume Shortlisting","Group Discussion","Technical Test","Aptitude Test","Technical Interview"]

interface stages{
  id:Number,
  value:JSX.Element,
}
const EventsPage = () => {

  const [PopularStages, setPopularStages] = useState<stages[]>([]);

  const performTask = (i,id) => {
    const Icon=icons[id]
    if(clicked[id]==false){
      console.log("I am going on")
    setPopularStages([...PopularStages,{
      id:PopularStages.length,
      value:<Box className={styles.placement} component='form' name={text[id]} justifyContent='center' sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' },
    backgroundColor:'rgb(213, 214, 230)',
    width:'25vw',
    position:'absolute',
    margin:`calc(14vh + ${i}*70vh) 9%`,
    height:'65vh',
    display:'block'
  }}>
    <div style={{
      display:'flex',
      justifyContent:'center',
      position:'relative',
      left:'0'
    }}>
    <Icon fontSize='large' sx={{
      alignSelf:'center',
      // margin:'0 12%',
      position:'absolute',
      left:'40%',
      top:'2vh',
      fontSize:'50px',
    }}></Icon>
    <EditIcon sx={{
      position:'absolute',
      left:'2vw',
      top:'2vh',
      cursor:'pointer',
      zIndex:'1'
    }}></EditIcon>
    <DeleteForeverIcon sx={{
      position:'absolute',
      right:'2%',
      top:'2vh',
      cursor:'pointer',
      zIndex:'1'
    }}></DeleteForeverIcon></div><br/><br/><br/>
    <Typography variant='h6' fontWeight='bold' mx='6%' sx={{
      textAlign:'center',
      display:'block'
    }}>{text[id]}</Typography><br/>
    <div style={{
      display:'flex',
      justifyContent:'space-between'
    }}>
      <Typography mt='5%' fontWeight='bold' mx='4%'>Venue</Typography>
      <TextField
    id="outlined-number"
    type="text"
    size="small"
     sx={{zIndex:'1',
    backgroundColor:'white'}}
  /></div>
  <div style={{
      display:'flex',
      justifyContent:'space-between'
    }}>
      <Typography mt='5%' fontWeight='bold' mx='4%'>Start Time</Typography>
      <TextField
    id="outlined-number"
    type="text"
    size="small"
     sx={{zIndex:'1',
    backgroundColor:'white',
  width:'30%'}}
  /></div>
  <div style={{
      display:'flex',
      justifyContent:'space-between'
    }}>
      <Typography mt='5%' fontWeight='bold' mx='4%'>End Time</Typography>
      <TextField
    id="outlined-number"
    type="text"
    size="small"
     sx={{zIndex:'1',
    backgroundColor:'white'}}
  /></div>
  <Button variant="contained" color='success' sx={{
    margin:'0 20%',
    borderRadius:'20px',
    backgroundColor:'rgb(53, 203, 133)',
    zIndex:'1',
    width: '60%',
    height:'10%',
    fontSize:'70%'
  }}>VIEW EVENT DETAILS</Button>
  </Box>
    }
    ])
  }
clicked[id]=true;};

const addHRInterview=(i)=>{
  if(clicked[6]==false){
  setPopularStages([...PopularStages,{
    id:PopularStages.length,
    value:<Box className={styles.placement} component='form' name="GroupDiscussion" justifyContent='center' sx={{
      '& .MuiTextField-root': { m: 1, width: '20ch' },
  backgroundColor:'rgb(213, 214, 230)',
  width:'25vw',
  position:'absolute',
  margin:`calc(14vh + ${i}*70vh) 9%`,
  height:'65vh',
  display:'block'
}}>
  <div style={{
    display:'flex',
    justifyContent:'center',
    position:'relative',
    left:'0'
  }}>
  <SiHandshake size='35px' style={{
    alignSelf:'center',
    // margin:'0 12%',
    position:'absolute',
    left:'42%',
    top:'2vh',
    fontSize:'50px',
  }}/>
  <EditIcon sx={{
    position:'absolute',
    left:'2vw',
    top:'2vh',
    cursor:'pointer',
    zIndex:'1'
  }}></EditIcon>
  <DeleteForeverIcon sx={{
    position:'absolute',
    right:'2%',
    top:'2vh',
    cursor:'pointer',
    zIndex:'1'
  }}></DeleteForeverIcon></div><br/><br/><br/>
  <Typography variant='h6' fontWeight='bold' mx='6%' sx={{
    textAlign:'center',
    display:'block'
  }}>HR Interview</Typography><br/>
  <div style={{
    display:'flex',
    justifyContent:'space-between'
  }}>
    <Typography mt='5%' fontWeight='bold' mx='4%'>Venue</Typography>
    <TextField
  id="outlined-number"
  type="text"
  size="small"
   sx={{zIndex:'1',
  backgroundColor:'white'}}
/></div>
<div style={{
    display:'flex',
    justifyContent:'space-between'
  }}>
    <Typography mt='5%' fontWeight='bold' mx='4%'>Start Time</Typography>
    <TextField
  id="outlined-number"
  type="text"
  size="small"
   sx={{zIndex:'1',
  backgroundColor:'white',
width:'30%'}}
/></div>
<div style={{
    display:'flex',
    justifyContent:'space-between'
  }}>
    <Typography mt='5%' fontWeight='bold' mx='4%'>End Time</Typography>
    <TextField
  id="outlined-number"
  type="text"
  size="small"
   sx={{zIndex:'1',
  backgroundColor:'white'}}
/></div>
<Button variant="contained" color='success' sx={{
  margin:'0 20%',
  borderRadius:'20px',
  backgroundColor:'rgb(53, 203, 133)',
  zIndex:'1',
  width: '60%',
  height:'10%',
  fontSize:'70%'
}}>VIEW EVENT DETAILS</Button>
</Box>
  }])

  }
clicked[6]=true};

  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Student Dashboard - Events" />
      <h3 style={{padding: "0 2%",
      width:'70%'}}>STEP 4/5 (Add Hiring Process Event)</h3><br/>
      <Container className={styles.applications} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'20%',
        margin:'0 14vw',
        paddingInline:'7% 7%'
      }}>
        <AssignmentIcon  fontSize='large' sx={{
          margin:'9% 1%',
          position:'relative',
          top:'0vh',
          alignSelf:'center'
        }}></AssignmentIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
          width:'100%',
          padding:'11% 1%',
        }}>Applications</Typography></Container>
        {PopularStages.map((PopularStages,index) =>{
          return(
          <div key={index}>
            {PopularStages.value}
          </div>
          )
          })}
        <div style={{
          display:'grid'
        }}>
        <Typography style={{
          position:'absolute',
          top:'140px',
          left:'74vw',
          fontWeight:'bold',
          height:'10vh'
        }}>Popular Stages</Typography>
        <Container className={styles.main} sx={{
          position:'relative',
          top:'6vh',
          left:'8vw'
        }}>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'-5%'
      }}><br/>
          <TvIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 6%'
          }}></TvIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            marginRight:'12%'
          }}>Pre-Placement Talk</Typography><AddCircleOutlineIcon onClick={()=>performTask(PopularStages.length,0)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-8%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
          <AssignmentIndIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 7%'
          }}></AssignmentIndIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            marginRight:'12%'
          }}>Resume Shortlisting</Typography><AddCircleOutlineIcon onClick={()=>performTask(PopularStages.length,1)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-8%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
          <GroupsIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 6%'
          }}></GroupsIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            marginRight:'14%',
            marginLeft:'5%'
          }}>Group Discussion</Typography><AddCircleOutlineIcon onClick={()=>{performTask(PopularStages.length,2)}} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-8%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
          <DvrIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 1%'
          }}></DvrIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            marginRight:'15%',
            marginLeft:'13%'
          }}>Technical Test</Typography><AddCircleOutlineIcon onClick={()=>performTask(PopularStages.length,3)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-2%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
          <EventNoteIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 6%'
          }}></EventNoteIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            width:'60%',
            marginRight:'5%',
            marginLeft:'10%'
          }}>Aptitude Test</Typography><AddCircleOutlineIcon onClick={()=>performTask(PopularStages.length,4)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-8%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
          <GroupIcon fontSize='medium' sx={{
            alignSelf:'center',
            margin:'0 6%'
          }}></GroupIcon><Typography variant='subtitle1' fontWeight='bold' sx={{
            width:'60%',
            marginRight:'10%',
            marginLeft:'6%'
          }}>Technical Interview</Typography><AddCircleOutlineIcon onClick={()=>performTask(PopularStages.length,5)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'-8%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container><br/>
        <Container className={styles.container} sx={{
        backgroundColor:'rgb(213, 214, 230)',
        display:'flex',
        justifyContent:'center',
        width:'36%',
        position:'relative',
        top:'-10vh',
        left:'13vmax',
        padding:'1.5% 2%',
        marginTop:'0%'
      }}><br/>
      <div style={{
        height:'20px',
        alignSelf:'center'
      }}>
          <SiHandshake fontSize='medium' size='20px' style={{
            alignSelf:'center',
            margin:'0% 6%',
          }}/></div><Typography variant='subtitle1' fontWeight='bold' sx={{
            marginRight:'20%',
            marginLeft:'14%'
          }}>HR Interview</Typography><AddCircleOutlineIcon onClick={()=>addHRInterview(PopularStages.length)} fontSize='medium' sx={{
            alignSelf:'center',
            position:'relative',
            left:'0%',
            cursor:'pointer'
          }}></AddCircleOutlineIcon>
        </Container>
        </Container>
        </div>
      </div>
  )
}

EventsPage.layout = 'studentDashboard'
export default EventsPage

