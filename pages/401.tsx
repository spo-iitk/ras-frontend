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

function Custom401() {
  return (
    <div>
      <Meta title="Unauthorized" />
      <Stack
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "10px 30px", marginTop: 4 }}
      >
        <h1> Unauthorized!</h1>
        <Typography variant="h5" sx={{ color: "#757575" }}>
          Sorry, you're not authorized to view the page. Perhaps you&apos;ve
          mistyped the URL? Be sure to check your spelling. or you may not have
          logged in.
        </Typography>
        <Image src="/images/401.png" width={600} height={550} alt="error 404" />
        <CustomButton variant="contained" color="primary" href="/">
          Go To Home
        </CustomButton>
      </Stack>
    </div>
  );
}

Custom401.layout = "Navigation";
export default Custom401;
