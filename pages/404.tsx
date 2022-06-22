import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import Meta from "@components/Meta";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  borderRadius: 10,
  padding: "0.5rem 1rem",

  fontWeight: "bold",
  width: 200,
  fontSize: 18,
}));

function Custom404() {
  return (
    <div>
      <Meta title="Page Not Found" />
      <Stack
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "10px 30px", marginTop: 4 }}
      >
        <h1> Sorry, page not found!</h1>
        <Typography variant="h5" sx={{ color: "#757575" }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
          you&apos;ve mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Image src="/images/404.png" width={600} height={550} alt="error 404" />
        <CustomButton variant="contained" color="primary" href="/">
          Go To Home
        </CustomButton>
      </Stack>
    </div>
  );
}

Custom404.layout = "Navigation";
export default Custom404;
