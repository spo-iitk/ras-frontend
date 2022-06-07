import React, { useState } from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "@components/Layouts/LayoutWrapper";
import { Router, useRouter } from "next/router";
import loaderStyles from "../styles/Loader.module.css";
import Loader from "@components/Loader";


function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url)=>{
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url)=>{
    setLoading(false);
  });
  return (
    <>
    {loading && <Loader/>}
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
    </>
  );
}

export default MyApp;
