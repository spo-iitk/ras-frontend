import React from 'react'
import { TextField, Typography, Stack } from '@mui/material'
import { FormControl, Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const SignUpRecruiter = () => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });
    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (pass: string) => {
        if (pass === 'password') {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        }
        else {
            setValues({
                ...values,
                showConfirmPassword: !values.showConfirmPassword,
            });
        }
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    return (
        <div>
            <Stack spacing={4}>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="companyName" label="Company Name" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="Name" label="Name" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="Designation" label="Designation" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="Email Id" label="Email Id" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="Contact Number" label="Contact Number" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <Button variant="contained">Sign Up</Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <Typography>Already have an account? <span style={{ color: "blue" }}><Link href="/login">Sign In</Link></span></Typography>
                </FormControl>
            </Stack>
        </div>
    )
}

export default SignUpRecruiter
