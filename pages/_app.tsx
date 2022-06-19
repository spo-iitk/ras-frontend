import React from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "@mantine/notifications";
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";

import theme from "@components/theme/theme";
import LayoutWrapper from "@components/Layouts/LayoutWrapper";
import useStore from "@store/store";

import Custom404 from "./401";

function MyApp({ Component, pageProps }: AppProps) {
  const { role } = useStore();
  const router = useRouter();

  let prohibited = false;

  if (router.pathname.startsWith("/student") && role !== 1) {
    prohibited = true;
  } else if (router.pathname.startsWith("/company") && role !== 2) {
    prohibited = true;
  } else if (router.pathname.startsWith("/admin") && role < 100) {
    prohibited = true;
  }

  const AllowedComponent = prohibited ? Custom404 : Component;

  return (
    <NotificationsProvider position="top-right" zIndex={2077}>
      <ThemeProvider theme={theme}>
        <LayoutWrapper>
          <AllowedComponent {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
