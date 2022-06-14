import {
  Stack,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import countData, { APPCount, RCCount } from "@callbacks/admin/rc/count";
import { useRouter } from "next/router";

const Notices = [
  { id: 1, Name: "Company Name: Test Details", data: "4238" },
  { id: 2, Name: "Company Name: Shortlisting For Interview", data: "4238" },
  { id: 3, Name: "Company Name: Test Details", data: "4238" },
  { id: 4, Name: "Company Name: Test Details", data: "4238" },
];
const RecCompany = [
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 2, Name: "Company Name: Uploaded", data: "4238" },
];
const EventSchd = [
  { id: 1, Name: "Company Name: Test", data: "4238" },
  { id: 2, Name: "Company Name: Interview", data: "4238" },
  { id: 2, Name: "Company Name: GD", data: "4238" },
  { id: 2, Name: "Company Name: PPT", data: "4238" },
];
const EventNotSchd = [
  { id: 1, Name: "Company Name: PPT", data: "4238" },
  { id: 2, Name: "Company Name: Test", data: "4238" },
  { id: 1, Name: "Company Name: PPT", data: "4238" },
  { id: 2, Name: "Company Name: Test", data: "4238" },
];
function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [rcdata, setData] = React.useState<RCCount>({
    registered_student: 0,
    registered_company: 0,
  });
  const [appdata, setApp] = React.useState<APPCount>({ roles: 0, ppo_pio: 0 });

  useEffect(() => {
    const fetch = async () => {
      const token = sessionStorage.getItem("token") || "";
      const comapny_res = await countData.getRC(token, rid).catch((err) => {
        console.log(err);
        return { registered_student: 0, registered_company: 0 } as RCCount;
      });
      const app_res = await countData
        .getApplications(token, rid)
        .catch((err) => {
          console.log(err);
          return { roles: 0, ppo_pio: 0 } as APPCount;
        });
      setData(comapny_res);
      setApp(app_res);
    };
    fetch();
  }, [rid]);

  return (
    <div className={styles.container}>
      <Meta title="Admin Dashboard" />
      <Stack>
        <h1>Internship 2022-23 Phase</h1>

        <Grid container justifyContent="space-evenly" spacing={2}>
          <Grid item xs={6} md={3} sx={{ padding: 0 }}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Registered
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {rcdata.registered_company}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Placed
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {appdata.ppo_pio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Company
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {rcdata.registered_company}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  No of Roles
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {appdata.roles}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Notices</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {Notices.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Recent Company Added</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {RecCompany.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Notices</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {EventSchd.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Recent Company Added</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {EventNotSchd.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
