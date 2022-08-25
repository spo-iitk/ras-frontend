import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

import Meta from "@components/Meta";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: 10,
  padding: "0.5rem 1rem",
  fontWeight: "bold",
  fontSize: 18,
  display: "flex",
  flex: 1,
  width: 250,
}));

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

function Custom404() {
  return (
    <div>
      <Meta title="Under Maintenance | Recruitment Automation System" />
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "5px 5px" }}
      >
        <h1 style={{ textAlign: "center", fontSize: 50 }}>Under Maintenance</h1>
        <Typography variant="h5" sx={{ color: "#757575" }}>
          We apologize for the inconvenience, but we're performing some
          maintenance.
        </Typography>
        <Typography variant="h5" sx={{ color: "#757575" }}>
          You can still contact us at{" "}
          <a href="mailto:spo@iitk.ac.in">spo@iitk.ac.in</a>. We'll be back up
          soon!
        </Typography>
        <Image src="/images/502.png" height={400} alt="Under Maintenance" />
        <CustomButton
          variant="contained"
          color="primary"
          href="https://placement.iitk.ac.in/"
        >
          Alternate portal &rarr;
        </CustomButton>{" "}
        <CustomButton href="https://spo.iitk.ac.in/">
          SPO Website &rarr;
        </CustomButton>
      </Stack>
    </div>
  );
}

Custom404.layout = "Navigation";
export default Custom404;
