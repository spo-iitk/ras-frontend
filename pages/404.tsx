import { Button, Stack, Typography, ButtonProps } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import Meta from "@components/Meta";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  borderRadius: 10,
  padding: "0.5rem 1rem",
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[500],
  },
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
        <Typography variant="subtitle1" sx={{ color: "#757575" }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
          you&apos;ve mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Image src="/images/404.png" width={250} height={300} alt="error 404" />
        <CustomButton variant="contained" color="primary" href="/">
          Go To Home
        </CustomButton>
      </Stack>
    </div>
  );
}

Custom404.layout = "none";
export default Custom404;
