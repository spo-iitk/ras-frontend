import React from 'react'
import { Typography, Stack } from '@mui/material'
import { FormControl, Button } from '@mui/material';
import Meta from '../components/Meta';
import { useState } from 'react';
import SignUpStudent from '../sections/signUpStudent';
import SignUpRecruiter from '../sections/signUpRecruiter';
import { Tab, Tabs } from '@mui/material';
import Header from '../components/Header';
const SignUp = () => {
    const [role, setRole] = useState(0);

    const handleRole = (event: React.SyntheticEvent, newRole: number) => {
        setRole(newRole);
    };

    function a11yProps(index: Number) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <div>
            {/* <Header/> */}
            <Meta title={'Sign Up - Recruitment Automation System'} />
            <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: "70vh" }}>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <h1>Welcome!</h1>
                    <h2>Sign up to</h2>
                    <Typography variant='subtitle1' color="text.secondary">Recruitment Portal IIT Kanpur</Typography>
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <Tabs
                        centered
                        value={role}
                        onChange={handleRole}
                        textColor="inherit"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Student" {...a11yProps(0)} />
                        <Tab label="Recruiter" {...a11yProps(1)} />
                    </Tabs>
                </FormControl>
                {role == 0 ? <SignUpStudent /> : <SignUpRecruiter />}
            </Stack>
        </div >
    )
}

SignUp.layout='Navigation'
export default SignUp
