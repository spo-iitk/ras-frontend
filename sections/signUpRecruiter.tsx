import React from 'react'
import { TextField, Typography, Stack } from '@mui/material'
import { FormControl, Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const SignUpRecruiter = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
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
                    <Button variant="contained" onClick={handleOpen}>Sign Up</Button>
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <Typography>Already have an account? <span style={{ color: "blue" }}><Link href="/login">Sign In</Link></span></Typography>
                </FormControl>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
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
                </Box>
            </Modal>
        </div>
    )
}

export default SignUpRecruiter
