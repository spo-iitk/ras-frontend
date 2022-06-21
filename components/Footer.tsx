import { Grid, Stack } from "@mui/material";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";

import theme from "@components/theme/theme";

import footerStyles from "../styles/Footer.module.css";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(() => ({
  backgroundColor: theme.palette.primary.dark,
  color: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontSize: "0.8rem",
}));

function Footer() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        marginTop: 30,
        padding: "30px 0px",
      }}
    >
      <div className={footerStyles.footer}>
        <Stack justifyContent="center" alignItems="center" spacing={10}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="flex-start"
            style={{ minHeight: "20vh" }}
          >
            <Grid item xs={12} md={3}>
              <h2>Important Links</h2>
              <Stack direction="column" justifyContent="center" spacing={2}>
                <a
                  href="https://spo.iitk.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">
                    Student Placement Office
                  </Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/departmental-brochure"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">Department Brochure</Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/companies#ipolicy"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">
                    Intern Policy (Company)
                  </Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/docs/2021-22/Internship-Policy-2021-22.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">
                    Intern Policy (Student)
                  </Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/assets/companies_links/IITK_Recruitment_Guide_2022-23.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">Recruitment Guide</Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/companies#steps"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">
                    Recruitment Itinerarry
                  </Typography>
                </a>
                <a
                  href="https://spo.iitk.ac.in/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">Contact Us</Typography>
                </a>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <h2>Contact Links</h2>
              <Stack direction="column" justifyContent="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <HomeIcon />
                  <div>
                    <Typography variant="body2">
                      Student Placement Office
                    </Typography>
                    <Typography variant="body2">
                      109, Outreach Building, IIT Kanpur
                    </Typography>
                    <Typography variant="body2">
                      Kanpur- 208016, Uttar Pradesh, India
                    </Typography>
                  </div>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PublicIcon />
                  <a
                    href="https://spo.iitk.ac.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography variant="body2">spo.iitk.ac.in</Typography>
                  </a>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MailIcon />
                  <a
                    href="mailto:spo@iitk.ac.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography variant="body2">spo@iitk.ac.in</Typography>
                  </a>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CallIcon />
                  <a href="tel:+91 5122594433">
                    <Typography variant="body2">
                      +91 512 259 44 33/34
                    </Typography>
                  </a>
                </Stack>
                <h4>
                  &copy; Student Placement Office | IIT Kanpur. All Rights
                  Reserved
                </h4>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </div>
      <div className={footerStyles.footerMobile}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Important Links</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <a
                href="https://spo.iitk.ac.in/"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">
                  Student Placement Office
                </Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/departmental-brochure"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Department Brochure</Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/companies#ipolicy"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Intern Policy (Company)</Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/docs/2021-22/Internship-Policy-2021-22.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Intern Policy (Student)</Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/assets/companies_links/IITK_Recruitment_Guide_2022-23.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Recruitment Guide</Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/companies#steps"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Recruitment Itinerarry</Typography>
              </a>
              <a
                href="https://spo.iitk.ac.in/contact"
                target="_blank"
                rel="noreferrer"
              >
                <Typography variant="body2">Contact Us</Typography>
              </a>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Contact Us</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <HomeIcon />
                <div>
                  <Typography variant="body2">
                    Student Placement Office
                  </Typography>
                  <Typography variant="body2">
                    109, Outreach Building, IIT Kanpur
                  </Typography>
                  <Typography variant="body2">
                    Kanpur- 208016, Uttar Pradesh, India
                  </Typography>
                </div>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PublicIcon />
                <a
                  href="https://spo.iitk.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">spo.iitk.ac.in</Typography>
                </a>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <MailIcon />
                <a
                  href="mailto:spo@iitk.ac.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography variant="body2">spo@iitk.ac.in</Typography>
                </a>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CallIcon />
                <a href="tel:+91 5122594433">
                  <Typography variant="body2">+91 512 259 44 33/34</Typography>
                </a>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <h6 style={{ margin: 0, padding: 10, fontSize: "0.8rem" }}>
          &copy; Student Placement Office | IIT Kanpur. All Rights Reserved
        </h6>
      </div>
    </div>
  );
}

export default Footer;
