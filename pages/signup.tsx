import React from 'react'
import { TextField, Grid, InputLabel, OutlinedInput, Typography, Stack } from '@mui/material'
import { InputAdornment } from '@mui/material';
import { IconButton, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Meta from '../components/Meta';
import Link from 'next/link';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SignUpStudent from '../sections/signUpStudent';
import SignUpRecruiter from '../sections/signUpRecruiter';

const SignUp = () => {
    const [role, setRole] = useState('student');

    const handleRole = (event: any, newRole: string) => {
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    return (
        <div style={{ margin: 50 }}>
            <Meta title={'Login - Recruitment Automation System'} />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '74vh' }}
            >
                <Grid item xs={12}>
                    <Stack spacing={4}>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <h1>Welcome!</h1>
                            <h2>Sign up to</h2>
                            <Typography variant='subtitle1' color="text.secondary">Recruitment Portal IIT Kanpur</Typography>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <ToggleButtonGroup
                                value={role}
                                exclusive
                                onChange={handleRole}
                                aria-label="text alignment"
                                sx={{ alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ToggleButton value="student" aria-label="left aligned">
                                    Student
                                </ToggleButton>
                                <ToggleButton value="recruiter" aria-label="centered">
                                    Recruiter
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                        {role == 'student' ? <SignUpStudent /> : <SignUpRecruiter />}
                    </Stack>
                </Grid>
            </Grid>
        </div >
    )
}

export default SignUp
