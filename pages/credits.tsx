import Meta from "@components/Meta";
import { Avatar, Stack } from "@mui/material";
import React from "react";

function Credits() {
  return (
    <div style={{ minHeight: "80vh" }}>
      <Meta title="Credits -  Recruitment Automation System" />
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <div>
          <h1 style={{ margin: "50px 0px" }}>Credits</h1>
        </div>
        <div style={{ margin: "0px auto" }}>
          <Stack
            spacing={4}
            justifyContent="center"
            alignItems="center"
            direction={{ xs: "column", sm: "row" }}
          >
            <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
              <Stack
                spacing={4}
                alignItems="center"
                justifyContent="center"
                width={150}
              >
                <div>
                  <Avatar sx={{ height: 100, width: 100 }} />
                </div>
                <h3>Harshit Raj</h3>
              </Stack>
              <Stack
                spacing={4}
                alignItems="center"
                justifyContent="center"
                width={150}
              >
                <div>
                  <Avatar sx={{ height: 100, width: 100 }} />
                </div>
                <h3>Abhishek Shree</h3>
              </Stack>
            </Stack>
            <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
              <Stack
                spacing={4}
                alignItems="center"
                justifyContent="center"
                width={150}
              >
                <div>
                  <Avatar sx={{ height: 100, width: 100 }} />
                </div>
                <h3>Somya Gupta</h3>
              </Stack>
              <Stack
                spacing={4}
                alignItems="center"
                justifyContent="center"
                width={150}
              >
                <div>
                  <Avatar sx={{ height: 100, width: 100 }} />
                </div>
                <h3>Manas Gupta</h3>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Stack>
      <hr style={{ width: "80vw", margin: "50px auto" }} />
    </div>
  );
}
Credits.layout = "Navigation";
export default Credits;
