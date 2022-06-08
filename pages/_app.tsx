import { Router } from "next/router";
import React, { useState } from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "@components/Layouts/LayoutWrapper";
import Loader from "@components/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  return (
    <>
      {loading && (
        <LayoutWrapper>
          <Loader />
        </LayoutWrapper>
      )}

      {!loading && (
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      )}
    </>
  );
}

export default MyApp;
