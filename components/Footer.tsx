import { Grid, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import footerStyles from "../styles/Footer.module.css";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: "white" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: '#1f2120',
    color: 'white',
    fontSize: '0.8rem',
}));

const Footer = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div style={{ backgroundColor: "black", color: 'white', marginTop: 30 }}>
            <div className={footerStyles.footer}>
                <Stack justifyContent="center" alignItems="center" spacing={10}>
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="flex-start"
                        style={{ minHeight: '20vh' }}
                    >
                        <Grid item xs={12} md={3}>
                            <h2>Important Links</h2>
                            <Stack direction="column" justifyContent="center" spacing={2}>
                                <Link href="/">&#10097; Student Placement Office</Link>
                                <Link href="/">&#10097; Department Brochure</Link>
                                <Link href="/">&#10097; Intern Policy (Company)</Link>
                                <Link href="/">&#10097; Intern Policy (Student)</Link>
                                <Link href="/">&#10097; Recruitment Guide</Link>
                                <Link href="/">&#10097; Recruitment Itinerarry</Link>
                                <Link href="/">&#10097; Contact Us</Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <h2>Contact Links</h2>
                            <Stack direction="column" justifyContent="center" spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}><HomeIcon /><Link href="/">Student Placement Office,
                                    109, Outreach Building, IIT Kanpur, Kanpur- 208016, Uttar Pradesh, India</Link></Stack>
                                <Stack direction="row" alignItems="center" spacing={1}><PublicIcon /><a href="https://spo.iitk.ac.in/" target="_blank" rel="noreferrer">spo.iitk.ac.in</a></Stack>
                                <Stack direction="row" alignItems="center" spacing={1}><MailIcon /><a href="mailto:spo@iitk.ac.in" target="_blank" rel="noreferrer">spo@iitk.ac.in</a></Stack>
                                <Stack direction="row" alignItems="center" spacing={1}><CallIcon /><a href="tel:+91 5122594433"> +91 512 259 44 33/34</a></Stack>
                                <h4>&copy; Student Placement Office | IIT Kanpur. All Rights Reserved</h4>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </div>
            <div className={footerStyles.footerMobile}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Important Links</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                            <Link href="/"> Student Placement Office</Link>
                            <Link href="/"> Department Brochure</Link>
                            <Link href="/"> Intern Policy (Company)</Link>
                            <Link href="/"> Intern Policy (Student)</Link>
                            <Link href="/"> Recruitment Guide</Link>
                            <Link href="/"> Recruitment Itinerarry</Link>
                            <Link href="/"> Contact Us</Link>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Contact Us</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}><HomeIcon /><Link href="/">Student Placement Office,
                                109, Outreach Building, IIT Kanpur, Kanpur- 208016, Uttar Pradesh, India</Link></Stack>
                            <Stack direction="row" alignItems="center" spacing={1}><PublicIcon /><a href="https://spo.iitk.ac.in/" target="_blank" rel="noreferrer">spo.iitk.ac.in</a></Stack>
                            <Stack direction="row" alignItems="center" spacing={1}><MailIcon /><a href="mailto:spo@iitk.ac.in" target="_blank" rel="noreferrer">spo@iitk.ac.in</a></Stack>
                            <Stack direction="row" alignItems="center" spacing={1}><CallIcon /><a href="tel:+91 5122594433"> +91 512 259 44 33/34</a></Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <h6 style={{ margin: 0, padding: 10, fontSize:"0.8rem"}}>&copy; Student Placement Office | IIT Kanpur. All Rights Reserved</h6>
            </div>
        </div>
    )
}

export default Footer
