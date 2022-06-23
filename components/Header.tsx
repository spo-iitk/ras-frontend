import Image from "next/image";
import React from "react";
import { IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import headerstyles from "../styles/Header.module.css";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: "15px 40px 15px 40px" }}>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            src="/images/logo/spoLogo.png"
            alt="logo"
            width={60}
            height={60}
          />
          <Stack direction="column">
            <h2 className={headerstyles.title} style={{ margin: 0 }}>
              Recruitment Automation System
            </h2>
            <h5 className={headerstyles.title} style={{ margin: 0 }}>
              Indian Institute of Technology, Kanpur
            </h5>
          </Stack>
        </Stack>
        <div className={headerstyles.sideNav}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Link href="/login">Sign in</Link>
            <Link href="/signup">Sign Up</Link>
            <a
              href="https://spo.iitk.ac.in/contact"
              target="_blank"
              rel="noreferrer"
            >
              Contact Us
            </a>
            <Link href="/credits">Credits</Link>
          </Stack>
        </div>
        <div className={headerstyles.sideMenu}>
          <Tooltip title="Options">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Link href="/login">Sign in</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/signup">Sign Up</Link>
            </MenuItem>
            <MenuItem>
              <a
                href="https://spo.iitk.ac.in/contact"
                target="_blank"
                rel="noreferrer"
              >
                Contact Us
              </a>
            </MenuItem>
            <MenuItem>
              <Link href="/credits">Credits</Link>
            </MenuItem>
          </Menu>
        </div>
      </Stack>
    </div>
  );
}

export default Header;
