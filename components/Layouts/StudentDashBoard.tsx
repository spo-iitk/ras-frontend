import { Grid } from '@mui/material'
import React from 'react'
import { Avatar, Box } from '@mui/material';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { ListItemAvatar } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router'

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: '1em',
    padding: '15px 15px'
}));

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

interface userItems {
    avatar: JSX.Element,
    name: string,
    id: string,
}
const items: userItems[] = [
    {
        avatar: <PieChartIcon />,
        name: 'Overview',
        id: 'overview'
    },
    {
        avatar: <AccountCircleIcon />,
        name: 'Profile',
        id: 'profile'
    },
    {
        avatar: <TravelExploreIcon />,
        name: 'Recruitment Portal',
        id: 'recruitmentportal'
    },
    {
        avatar: <ArticleIcon />,
        name: 'Intern Policy',
        id: 'internpolicy'
    },
]
const StudentDashBoard = ({ children }: { children: any }) => {
    const { pathname } = useRouter()
    const match = (path: string) => (path == pathname ? true : false);
    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={0}>
                <Grid item xs={2}>
                    <div style={{ position: 'fixed', height: '100vh', width:"300px", padding: 20, borderRight: "#eeeeee 2px solid" }}>
                        <Stack spacing={3}>
                            <div style={{ height: 50 }} />
                            <AccountStyle>
                                <Avatar src="/images/logo/spoLogo.png" alt="photoURL" />
                                <Box sx={{ ml: 2 }}>
                                    <h3 style={{ margin: 5 }}>Manas Gupta</h3>
                                    <h4 style={{ margin: 5, fontWeight: 400 }}>Student</h4>
                                </Box>
                            </AccountStyle>
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {items.map((item) => (
                                    <Link href={`/studentDashboard/${item.id}`} passHref={true} key={item.id}>
                                        <ListItem sx={{ borderRadius: 5 }} button selected={match(`/studentDashboard/${item.id}`) ? true : false}>
                                            <ListItemAvatar sx={{ color: match(`/studentDashboard/${item.id}`) ? 'blue' : '#9e9e9e' }}>
                                                {item.avatar}
                                            </ListItemAvatar>
                                            <ListItemText><h4 style={{ margin: 5, color: match(`/studentDashboard/${item.id}`) ? 'blue' : '#9e9e9e' }}>{item.name}</h4></ListItemText>
                                        </ListItem>
                                    </Link>
                                ))}
                            <Link href={`/login`} passHref={true} key='logout'>
                                        <ListItem sx={{ borderRadius: 5 }} button>
                                            <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                                <LogoutIcon />
                                            </ListItemAvatar>
                                            <ListItemText><h4 style={{ margin: 5, color:'#9e9e9e' }}>Logout</h4></ListItemText>
                                        </ListItem>
                                    </Link>
                            </List>
                        </Stack>
                    </div>
                </Grid>

                <Grid item xs={10}>
                    {children}
                </Grid>
            </Grid>
        </div>
    )
}

export default StudentDashBoard
