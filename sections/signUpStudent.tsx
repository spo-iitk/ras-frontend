import React from 'react'
import { TextField, Grid, InputLabel, OutlinedInput, Typography, Stack } from '@mui/material'
import { InputAdornment } from '@mui/material';
import { IconButton, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useState } from 'react';

const SignUpStudent = () => {
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
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="firstName" label="First Name" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="lastName" label="Last Name" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="emailId" label="IITK Email Id" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField id="rollNo" label="Roll Number" variant="outlined" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('password')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('confirmPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
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

export default SignUpStudent
