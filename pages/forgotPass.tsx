import React from 'react'
import Header from '@/components/Header'
import Meta from '@/components/Meta'
import { Stack, FormControl, TextField, Typography, Button, OutlinedInput, InputLabel, IconButton, InputAdornment } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';

const ForgotPass = () => {
    const [sent, setSent] = useState(false)

    const handleSubmit = () => {
        setSent(true)
    }

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const [checked, setChecked] = React.useState(true);

    const handleCheck = (event: any) => {
        setChecked(event.target.checked);
    };

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
            {/* <Header /> */}
            <Meta title={'Forgot Password - Recruitment Automation System'} />
            {sent ?
                <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: "70vh" }}>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <h2>Verify Account</h2>
                        <Typography variant='subtitle1' color="text.secondary">OTP has been sent to registered email Id</Typography>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <TextField id="otp" label="OTP" variant="outlined" />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
                        <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
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
                        <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <Typography>Facing any issues? <span style={{ color: "blue" }}><Link href="/signup">Contact</Link></span></Typography>
                    </FormControl>
                </Stack>
                : <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: "70vh" }}>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <h2>Forgot Password</h2>
                        <Typography variant='subtitle1' color="text.secondary">Recruitment Portal IIT Kanpur</Typography>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <TextField id="email" label="Registered Email" variant="outlined" />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <Button variant="contained" onClick={handleSubmit}>Send Verification Code</Button>
                    </FormControl>
                </Stack>
            }
        </div>
    )
}

ForgotPass.layout='Navigation'
export default ForgotPass
