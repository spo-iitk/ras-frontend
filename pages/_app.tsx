import React from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "@components/Layouts/LayoutWrapper";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider position="top-right" zIndex={2077}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </NotificationsProvider>
  );
}

export default MyApp;
