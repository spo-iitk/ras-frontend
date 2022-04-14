import { Grid, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#c4c4c0", padding: 10, marginTop:30 }}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                justifyContent="center"
                style={{ minHeight: '20vh' }}
            >
                <Grid item xs={12} md={2}>
                    <h2>Important Links</h2>
                    <Stack direction="column" justifyContent="flex-end" spacing={2} sx={{ paddingLeft: 2 }}>
                        <Link href="/">&#10097; Student Placement Office</Link>
                        <Link href="/">&#10097; Department Brochure</Link>
                        <Link href="/">&#10097; Intern Policy (Company)</Link>
                        <Link href="/">&#10097; Intern Policy (Student)</Link>
                        <Link href="/">&#10097; Recruitment Guide</Link>
                        <Link href="/">&#10097; Recruitment Itinerarry</Link>
                        <Link href="/">&#10097; Contact Us</Link>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={2}>
                    <h2>Contact Links</h2>
                    <Stack direction="column" justifyContent="flex-end" spacing={2} sx={{ paddingLeft: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}><HomeIcon /><Link href="/">Student Placement Office, 
                        109, Outreach Building, IIT Kanpur, Kanpur- 208016, Uttar Pradesh, India</Link></Stack>
                        <Stack direction="row" alignItems="center" spacing={1}><PublicIcon /><a href="https://spo.iitk.ac.in/" target="_blank" rel="noreferrer">spo.iitk.ac.in</a></Stack>
                        <Stack direction="row" alignItems="center" spacing={1}><MailIcon /><a href="mailto:spo@iitk.ac.in" target="_blank" rel="noreferrer">spo@iitk.ac.in</a></Stack>
                        <Stack direction="row" alignItems="center" spacing={1}><CallIcon /><a href="tel:+91 5122594433"> +91 512 259 44 33/34</a></Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                    <h4>&copy; Student Placement Office | IIT Kanpur. All Rights Reserved</h4>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
