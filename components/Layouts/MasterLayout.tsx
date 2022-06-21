import styled from "@emotion/styled";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  ListItemAvatar,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import theme from "@components/theme/theme";
import dashboardstyles from "@styles/Dashboard.module.css";
import useStore from "@store/store";

import { fields } from "./LayoutWrapper";

const AccountStyle = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  color: "black",
  borderRadius: "1em",
  padding: "15px 15px",
}));

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: theme.palette.primary.dark,
};

type Anchor = "top" | "left" | "bottom" | "right";

function MasterLayout({
  children,
  items,
}: {
  children: JSX.Element;
  // eslint-disable-next-line react/require-default-props
  items?: fields;
}) {
  const { asPath } = useRouter();
  const match = (path: string) => path === asPath;
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorNotifEl, setAnchorNotifEl] = React.useState<null | HTMLElement>(
    null
  );
  const { setToken } = useStore();
  const open = Boolean(anchorEl);
  const notifOpen = Boolean(anchorNotifEl);
  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotifEl(event.currentTarget);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuCLose = () => {
    setAnchorEl(null);
  };
  const handleNotificationClose = () => {
    setAnchorNotifEl(null);
  };
  const list = (anchor: Anchor) => (
    <Box
      className={dashboardstyles.drawer}
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
        backgroundColor: theme.palette.primary.dark,
        height: "100vh",
        overflowY: "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      padding="10px"
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            src="/images/logo/spoLogo.png"
            alt="logo"
            width={60}
            height={60}
          />
        </Stack>
        <div style={{ height: 10 }} />
        {items?.isUser ? (
          <AccountStyle>
            <Avatar src="" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <h3 style={{ margin: 5 }}>{items.userInfo.name}</h3>
              <h4 style={{ margin: 5, fontWeight: 400 }}>
                {items.userInfo.id}
              </h4>
            </Box>
          </AccountStyle>
        ) : (
          <div />
        )}

        <List sx={style} component="nav" aria-label="mailbox folders">
          {items?.userData.map((item) => (
            <Link href={`${items.route}${item.id}`} passHref key={item.id}>
              <ListItem
                sx={{ borderRadius: 5 }}
                button
                selected={!!match(`${items.route}${item.id}`)}
              >
                <ListItemAvatar
                  sx={{
                    color: match(`${items.route}${item.id}`)
                      ? theme.palette.secondary.contrastText
                      : "white",
                  }}
                >
                  {item.avatar}
                </ListItemAvatar>
                <ListItemText>
                  <h4
                    style={{
                      margin: 5,
                      color: match(`${items.route}${item.id}`)
                        ? theme.palette.secondary.contrastText
                        : "white",
                    }}
                  >
                    {item.name}
                  </h4>
                </ListItemText>
              </ListItem>
            </Link>
          ))}
          {items?.moveBack ? (
            <Link href={`${items.moveTo}`} passHref>
              <ListItem sx={{ borderRadius: 5 }} button>
                <ListItemAvatar sx={{ color: "white" }}>
                  <LogoutIcon />
                </ListItemAvatar>
                <ListItemText>
                  <h4 style={{ margin: 5, color: "white" }}>
                    Back to Dashboard
                  </h4>
                </ListItemText>
              </ListItem>
            </Link>
          ) : (
            <div />
          )}
          <a
            href="https://spo.iitk.ac.in/about_us.html"
            target="_blank"
            rel="noreferrer"
          >
            <ListItem sx={{ borderRadius: 5 }} button>
              <ListItemAvatar sx={{ color: "white" }}>
                <CallIcon />
              </ListItemAvatar>
              <ListItemText>
                <h4 style={{ margin: 5, color: "white" }}>Contact SPO</h4>
              </ListItemText>
            </ListItem>
          </a>
          <Link href="/login" passHref key="logout">
            <ListItem
              sx={{ borderRadius: 5 }}
              button
              onClick={() => setToken("")}
            >
              <ListItemAvatar sx={{ color: "white" }}>
                <LogoutIcon />
              </ListItemAvatar>
              <ListItemText>
                <h4 style={{ margin: 5, color: "white" }}>Logout</h4>
              </ListItemText>
            </ListItem>
          </Link>
        </List>
      </Stack>
    </Box>
  );

  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        spacing={0}
      >
        <Grid item xs={12} xl={2} sx={{ overflow: "hidden" }}>
          <div
            className={dashboardstyles.container}
            style={{
              position: "fixed",
              height: "100vh",
              padding: 20,
              backgroundColor: theme.palette.primary.dark,
              overflowY: "auto",
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Image
                  src="/images/logo/spoLogo.png"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </Stack>
              <div style={{ height: 20 }} />
              {items?.isUser ? (
                <AccountStyle>
                  <Avatar src="" alt="photoURL" />
                  <Box sx={{ ml: 2 }}>
                    <h3 style={{ margin: 5 }}>{items.userInfo.name}</h3>
                    <h4 style={{ margin: 5, fontWeight: 400 }}>
                      {items.userInfo.id}
                    </h4>
                  </Box>
                </AccountStyle>
              ) : (
                <div />
              )}
              <List sx={style} component="nav" aria-label="mailbox folders">
                {items?.userData.map((item) => (
                  <Link
                    href={`${items.route}${item.id}`}
                    passHref
                    key={item.id}
                  >
                    <ListItem
                      sx={{ borderRadius: 5 }}
                      button
                      selected={!!match(`${items.route}${item.id}`)}
                    >
                      <ListItemAvatar
                        sx={{
                          color: match(`${items.route}${item.id}`)
                            ? theme.palette.secondary.contrastText
                            : "white",
                        }}
                      >
                        {item.avatar}
                      </ListItemAvatar>
                      <ListItemText>
                        <h4
                          style={{
                            margin: 5,
                            color: match(`${items.route}${item.id}`)
                              ? theme.palette.secondary.contrastText
                              : "white",
                          }}
                        >
                          {item.name}
                        </h4>
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
                {items?.moveBack ? (
                  <Link href={`${items.moveTo}`} passHref>
                    <ListItem sx={{ borderRadius: 5 }} button>
                      <ListItemAvatar sx={{ color: "white" }}>
                        <LogoutIcon />
                      </ListItemAvatar>
                      <ListItemText>
                        <h4 style={{ margin: 5, color: "white" }}>
                          Back to Dashboard
                        </h4>
                      </ListItemText>
                    </ListItem>
                  </Link>
                ) : (
                  <div />
                )}
                <a
                  href="https://spo.iitk.ac.in/about_us.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem sx={{ borderRadius: 5 }} button>
                    <ListItemAvatar sx={{ color: "white" }}>
                      <CallIcon />
                    </ListItemAvatar>
                    <ListItemText>
                      <h4 style={{ margin: 5, color: "white" }}>Contact SPO</h4>
                    </ListItemText>
                  </ListItem>
                </a>
                <Link href="/login" passHref key="logout">
                  <ListItem
                    sx={{ borderRadius: 5 }}
                    button
                    onClick={() => setToken("")}
                  >
                    <ListItemAvatar sx={{ color: "white" }}>
                      <LogoutIcon />
                    </ListItemAvatar>
                    <ListItemText>
                      <h4 style={{ margin: 5, color: "white" }}>Logout</h4>
                    </ListItemText>
                  </ListItem>
                </Link>
              </List>
            </Stack>
          </div>
        </Grid>

        <Grid item xs={12} xl={10}>
          <Stack spacing={3}>
            <div
              className={dashboardstyles.mobileNav}
              style={{ marginTop: 30, padding: "0px 15px" }}
            >
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                justifyContent={{ xl: "right", xs: "space-between" }}
              >
                <IconButton
                  onClick={toggleDrawer("left", true)}
                  sx={{ display: { xs: "block", xl: "none" } }}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Stack direction="row" spacing={3}>
                  <IconButton onClick={handleNotifClick}>
                    <NotificationImportantIcon fontSize="large" />
                  </IconButton>
                  <IconButton onClick={handleClick}>
                    <Avatar src="" alt="photoURL" />
                  </IconButton>
                </Stack>
              </Stack>
              <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </div>
            {children}
          </Stack>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuCLose}
        onClick={handleProfileMenuCLose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 100,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link href="/student/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={() => setToken("")}>
          <Link href="/login">Logout</Link>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorNotifEl}
        id="account-notif"
        open={notifOpen}
        onClose={handleNotificationClose}
        onClick={handleNotificationClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 300,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>No notifications to show!</MenuItem>
      </Menu>
    </div>
  );
}

export default MasterLayout;
