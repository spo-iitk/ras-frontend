import { Grid, IconButton } from '@mui/material'
import React from 'react'
import { Avatar, Box } from '@mui/material';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from 'next/link';
import { ListItemAvatar } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import FeedIcon from '@mui/icons-material/Feed';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';
import CallIcon from '@mui/icons-material/Call';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { useRouter } from 'next/router'
import dashboardstyles from '@styles/Dashboard.module.css'
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { Menu, MenuItem } from '@mui/material'


const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#616161',
    color: "white",
    borderRadius: '1em',
    padding: '15px 15px'
}));

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: '#2b2b2b',
};

interface userItems {
    avatar: JSX.Element,
    name: string,
    id: string,
}
const items: userItems[] = [
    {
        avatar: <PieChartIcon />,
        name: 'Notices',
        id: '/notices'
    },
    {
        avatar: <ArticleIcon />,
        name: 'Manage Resume',
        id: '/resume'
    },
    {
        avatar: <TravelExploreIcon />,
        name: 'Job Opening',
        id: '/opening'
    },
    {
        avatar: <FeedIcon />,
        name: 'Your Applications',
        id: '/applications'
    },
    {
        avatar: <AssignmentIcon />,
        name: 'Proforma',
        id: '/proforma'
    },
    {
        avatar: <CalendarMonthIcon />,
        name: 'Calendar',
        id: '/events'
    },
    {
        avatar: <AccountCircleIcon />,
        name: 'Attendance',
        id: '/attendance'
    },
    {
        avatar: <EqualizerIcon />,
        name: 'Stats',
        id: '/stats'
    },
]

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const StudentPhaseDashboard = ({ children }: { children: any }) => {
    const { asPath } = useRouter()
    const match = (path: string) => (path == asPath ? true : false);
    const [state, setState] = React.useState({
        left: false,
    });
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorNotifEl, setAnchorNotifEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const notifOpen = Boolean(anchorNotifEl);
    const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNotifEl(event.currentTarget);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuCLose = () => {
        setAnchorEl(null);
    };
    const handleNotificationClose = () => {
        setAnchorNotifEl(null);
    };

    const router=useRouter()
    const {rcId}=router.query;

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            padding='10px'
            bgcolor="#2b2b2b"
            height="300vh"
        >
            <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Image src="/images/logo/spoLogo.png" alt="logo" width={60} height={60} />
                </Stack>
                <div style={{ height: 10 }} />
                <AccountStyle>
                    <Avatar src="" alt="photoURL" />
                    <Box sx={{ ml: 2 }}>
                        <h3 style={{ margin: 5 }}>Manas Gupta</h3>
                        <h4 style={{ margin: 5, fontWeight: 400 }}>Student</h4>
                    </Box>
                </AccountStyle>
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {items.map((item) => (
                        <Link href={`/student/rc/${rcId}${item.id}`} passHref={true} key={item.id}>
                            <ListItem sx={{ borderRadius: 5 }} button selected={match(`/student/rc/${rcId}${item.id}`) ? true : false}>
                                <ListItemAvatar sx={{ color: match(`/student/rc/${rcId}${item.id}`) ? 'blue' : '#9e9e9e' }}>
                                    {item.avatar}
                                </ListItemAvatar>
                                <ListItemText><h4 style={{ margin: 5, color: match(`/student/rc/${rcId}${item.id}`) ? 'blue' : '#9e9e9e' }}>{item.name}</h4></ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    <Link href={`/student/rc`} passHref={true} key='logout'>
                        <ListItem sx={{ borderRadius: 5 }} button>
                            <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                <LogoutIcon />
                            </ListItemAvatar>
                            <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Back to Dashboard</h4></ListItemText>
                        </ListItem>
                    </Link>
                    <a href="https://spo.iitk.ac.in/about_us.html" target="_blank" rel="noreferrer">
                        <ListItem sx={{ borderRadius: 5 }} button>
                            <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                <CallIcon />
                            </ListItemAvatar>
                            <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Contact SPO</h4></ListItemText>
                        </ListItem>
                    </a>
                    <Link href={`/login`} passHref={true} key='logout'>
                        <ListItem sx={{ borderRadius: 5 }} button>
                            <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                <LogoutIcon />
                            </ListItemAvatar>
                            <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Logout</h4></ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Stack>
        </Box>
    );

    return (
        <div>
            <Grid
                container
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                spacing={0}>
                <Grid item xs={12} lg={2} md={12} sm={12}>
                    <div className={dashboardstyles.container}
                        style={{ position: 'fixed', height: '100vh', padding: 20, borderRight: "#eeeeee 2px solid", backgroundColor: "#2b2b2b" }}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} alignItems={"center"}>
                                <Image src="/images/logo/spoLogo.png" alt="logo" width={60} height={60} />
                            </Stack>
                            <div style={{ height: 20 }} />
                            <AccountStyle>
                                <Avatar src="" alt="photoURL" />
                                <Box sx={{ ml: 2 }}>
                                    <h3 style={{ margin: 5 }}>Manas Gupta</h3>
                                    <h4 style={{ margin: 5, fontWeight: 400 }}>Student</h4>
                                </Box>
                            </AccountStyle>
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {items.map((item) => (
                                    <Link href={`/student/rc/${rcId}${item.id}`} passHref={true} key={item.id}>
                                        <ListItem sx={{ borderRadius: 5 }} button selected={match(`/student/rc/${rcId}${item.id}`) ? true : false}>
                                            <ListItemAvatar sx={{ color: match(`/student/rc/${rcId}${item.id}`) ? 'blue' : '#9e9e9e' }}>
                                                {item.avatar}
                                            </ListItemAvatar>
                                            <ListItemText><h4 style={{ margin: 5, color: match(`/student/rc/${rcId}${item.id}`) ? 'blue' : '#9e9e9e' }}>{item.name}</h4></ListItemText>
                                        </ListItem>
                                    </Link>
                                ))}
                                <Link href={`/student/rc`} passHref={true} key='logout'>
                                    <ListItem sx={{ borderRadius: 5 }} button>
                                        <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                            <LogoutIcon />
                                        </ListItemAvatar>
                                        <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Back to Dashboard</h4></ListItemText>
                                    </ListItem>
                                </Link>
                                <a href="https://spo.iitk.ac.in/about_us.html" target="_blank" rel="noreferrer">
                                    <ListItem sx={{ borderRadius: 5 }} button>
                                        <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                            <CallIcon />
                                        </ListItemAvatar>
                                        <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Contact SPO</h4></ListItemText>
                                    </ListItem>
                                </a>
                                <Link href={`/login`} passHref={true} key='logout'>
                                    <ListItem sx={{ borderRadius: 5 }} button>
                                        <ListItemAvatar sx={{ color: '#9e9e9e' }}>
                                            <LogoutIcon />
                                        </ListItemAvatar>
                                        <ListItemText><h4 style={{ margin: 5, color: '#9e9e9e' }}>Logout</h4></ListItemText>
                                    </ListItem>
                                </Link>
                            </List>
                        </Stack>
                    </div>
                    <div className={dashboardstyles.mobileContainer}>
                        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
                            <IconButton onClick={toggleDrawer('left', true)}><MenuIcon fontSize='large' /></IconButton>
                            <Stack direction="row" spacing={3}>
                                <IconButton onClick={handleNotifClick}><NotificationImportantIcon fontSize='large' /></IconButton>
                                <IconButton onClick={handleClick}><Avatar src="" alt="photoURL" /></IconButton>
                            </Stack>
                        </Stack>
                        <Drawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                        >
                            {list('left')}
                        </Drawer>
                    </div>
                </Grid>

                <Grid item xs={12} lg={10} md={12} sm={12}>
                    <Stack spacing={3}>
                        <div className={dashboardstyles.mobileNav} style={{ marginTop: 30, padding: "0px 50px" }}>
                            <Stack direction="row" spacing={2} alignItems={"center"} justifyContent="right">
                                <IconButton onClick={handleNotifClick}><NotificationImportantIcon fontSize='large' /></IconButton>
                                <IconButton onClick={handleClick}><Avatar src="" alt="photoURL" /></IconButton>
                            </Stack>
                        </div>
                        {children}
                    </Stack>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleProfileMenuCLose}
                onClick={handleProfileMenuCLose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width:100,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Link href="/student/profile">Profile</Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/login">Logout</Link>
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorNotifEl}
                id="account-notif"
                open={notifOpen}
                onClose={handleNotificationClose}
                onClick={handleNotificationClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width:300,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    No notifications to show!
                </MenuItem>
            </Menu>
        </div>
    )
}

export default StudentPhaseDashboard
