import React from 'react'
import { TextField, InputLabel, OutlinedInput, Typography, Stack } from '@mui/material'
import { InputAdornment } from '@mui/material';
import { IconButton, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const SignUpStudent = () => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const [open, setOpen] = React.useState(false);
    const router=useRouter();
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => router.push('/login'), 5000);
    }
    // const handleClose = () => setOpen(false);

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
                    <Button variant="contained" onClick={handleOpen}>Sign Up</Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <Typography>Already have an account? <span style={{ color: "blue" }}><Link href="/login">Sign In</Link></span></Typography>
                </FormControl>
            </Stack>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Registration Successful!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You have successfully registered for the IIT Kanpur Recruitment Portal.
                    </Typography>
                    <Typography>Contact your Student Coordinator for your login credentials.</Typography>
                    <Typography>You will be redirected to the login page.</Typography>

                </Box>
            </Modal>
        </div>
    )
}

export default SignUpStudent
