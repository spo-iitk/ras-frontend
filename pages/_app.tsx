import React, { useEffect } from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "@mantine/notifications";
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";

import theme from "@components/theme/theme";
import LayoutWrapper from "@components/Layouts/LayoutWrapper";
import useStore from "@store/store";

function MyApp({ Component, pageProps }: AppProps) {
  const { role } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (router.pathname.startsWith("/student") && role !== 1) {
        router.push("/401");
      } else if (router.pathname.startsWith("/company") && role !== 2) {
        router.push("/401");
      } else if (router.pathname.startsWith("/admin") && role < 100) {
        router.push("/401");
      } else if (role === 0) {
        router.push("/");
      }
    }
  }, [role, router, router.isReady]);

  return (
    <NotificationsProvider position="top-right" zIndex={2077}>
      <ThemeProvider theme={theme}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
